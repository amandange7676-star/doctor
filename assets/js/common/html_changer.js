/* =========================================================
   CONFIG
========================================================= */
const ALLOWED = new Set([
  "H1","H2","H3","H4","H5","H6",
  "P","DIV","SPAN","A",
  "UL","LI","LABEL","B"
]);

const KNOWN_STABLE_ANCHORS = [
  "#page-content",".pageWrapper","#main","main","#content","#root"
];
const VOLATILE_RE = /(active|current|open|close|show|hide|hidden|visible|slick|swiper|lazy|clone|tmp|draggable|loading|loaded|mount|hydr|portal)/i;
const DEBUG = true;

/* =========================================================
   HELPERS
========================================================= */
function cleanText(t){ return (t||"").replace(/\s+/g," ").trim(); }

function cssEscapeSafe(ident=""){
  if (window.CSS && CSS.escape) return CSS.escape(ident);
  return String(ident).replace(/([^\w-])/g,"\\$1");
}

function getStableId(el){
  return (el.id && !VOLATILE_RE.test(el.id)) ? el.id : "";
}

function getStableClasses(el){
  return Array.from(el.classList||[]).filter(c=>!VOLATILE_RE.test(c));
}

function jaccard(aArr,bArr){
  const A=new Set((aArr||[]).filter(Boolean));
  const B=new Set((bArr||[]).filter(Boolean));
  if(!A.size && !B.size) return 0;
  let inter=0; for(const v of A) if(B.has(v)) inter++;
  return inter/(A.size+B.size-inter);
}

function levenshtein(a="",b=""){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j]=(a[i-1]===b[j-1])?dp[i-1][j-1]:Math.min(dp[i-1][j-1]+1,dp[i][j-1]+1,dp[i-1][j]+1);
    }
  }
  return dp[m][n];
}

function similarity(a,b){
  if(!a||!b) return 0;
  const A=String(a),B=String(b);
  return 1 - (levenshtein(A,B) / Math.max(A.length,B.length));
}

function ancestorSignature(el, root){
  const sig=[]; let node=el.parentElement; let guard=0;
  while(node && node!==root && node.tagName && node.tagName!=="HTML" && guard++<8){
    sig.push({tag:node.tagName, classes:getStableClasses(node), id:getStableId(node)});
    node=node.parentElement;
  }
  return sig;
}

function ancestorOverlapScore(a,b){
  const len=Math.min(a.length,b.length);
  if(!len) return 0;
  let total=0;
  for(let i=0;i<len;i++){
    const idScore = (a[i].id && b[i].id) ? (a[i].id===b[i].id?1:0) : 0;
    const clsScore=jaccard(a[i].classes,b[i].classes);
    total += Math.max(idScore, clsScore);
  }
  return total/len;
}

function nthPath(fromEl, root){
  if(!fromEl || !root) return "";
  const parts=[]; let node=fromEl; let guard=0;
  while(node && node!==root && node.nodeType===1 && guard++<15){
    const tag=node.tagName.toLowerCase();
    let idx=1, sib=node;
    while((sib=sib.previousElementSibling) && sib.tagName===node.tagName) idx++;
    parts.push(`${tag}:nth-of-type(${idx})`);
    node=node.parentElement;
  }
  return parts.reverse().join(" > ");
}

function findStableAnchorSelector(el){
  let node = el;
  while(node && node!==document.body){
    const id = getStableId(node);
    if (id) return `#${cssEscapeSafe(id)}`;
    node = node.parentElement;
  }
  for(const sel of KNOWN_STABLE_ANCHORS){
    const a = el.closest(sel);
    if(a) return sel;
  }
  return "body";
}

function getDynamicSourceFile(el){
  let node=el;
  while(node && node!==document.body){
    if(node.dataset && node.dataset.src){
      return node.dataset.src;
    }
    node=node.parentElement;
  }
  return null;
}

/* =========================================================
   LOAD ORIGINAL HTML
========================================================= */
let originalHTML=null;
let modifiedHTML=null;
const includeCache = new Map();

fetch(window.location.href,{cache:"no-store"})
 .then(r=>r.text())
 .then(html=>{ 
   originalHTML=html; 
   DEBUG&&console.log(" Original HTML loaded."); 
 })
 .catch(err=>console.error(" Error loading original HTML:",err));

/* =========================================================
   EDIT MODE + CHANGE CAPTURE
========================================================= */
let changeLog=[]; 
let latestByKey=new Map();
const ELEMENT_ORIG = new WeakMap();
const ELEMENT_LATEST = new WeakMap();
const ELEMENT_UID = new WeakMap();
let ELEMENT_UID_COUNTER = 1;
const pendingTimers = new WeakMap();

function getElementUid(el){
  if(ELEMENT_UID.has(el)) return ELEMENT_UID.get(el);
  const uid='el_'+(ELEMENT_UID_COUNTER++);
  ELEMENT_UID.set(el, uid);
  return uid;
}

function resolveEditableElementFromTextNode(node){
  let el=node.parentElement;
  while(el){
    if(ALLOWED.has(el.tagName)) return el;
    el=el.parentElement;
  }
  return null;
}

function enableTextEditing(){
  const sel = Array.from(ALLOWED).map(t=>t.toLowerCase()).join(",");
  document.querySelectorAll(sel).forEach(el=>{
    const t=cleanText(el.textContent);
    if(t && !ELEMENT_ORIG.has(el)) ELEMENT_ORIG.set(el,t);
    if(!ELEMENT_LATEST.has(el)) ELEMENT_LATEST.set(el, ELEMENT_ORIG.get(el) || "");
    el.contentEditable="true";
    el.style.outline="1px dashed #0088ff";

    // Add input listener to capture typing, paste, delete all
    el.addEventListener("input",()=>scheduleChange(el));
  });
  if(!window.MO){
    window.MO=new MutationObserver(records=>{
      records.forEach(r=>{
        if(r.type==="characterData"){
          const el=resolveEditableElementFromTextNode(r.target);
          if(el) scheduleChange(el);
        }
      });
    });
    window.MO.observe(document.body,{characterData:true,characterDataOldValue:true,subtree:true});
  }
  alert("Editing enabled. Start typing or pasting to edit text.");
}

function scheduleChange(el){
  const prevTimer = pendingTimers.get(el);
  if(prevTimer) clearTimeout(prevTimer);
  const timer = setTimeout(()=>recordChange(el),300);
  pendingTimers.set(el, timer);
}

function recordChange(el){
  const newText = cleanText(el.textContent || "");
  const oldText = ELEMENT_LATEST.get(el) || ELEMENT_ORIG.get(el) || "";
  if(newText===oldText) { pendingTimers.delete(el); return; }

  const sourceFile = getDynamicSourceFile(el) || window.location.pathname.split('/').pop();
  const anchorSel = findStableAnchorSelector(el);
  const classSig  = getStableClasses(el);
  const id        = getStableId(el);
  const root      = document.querySelector(anchorSel) || document.body;
  const ancSig    = ancestorSignature(el, root);
  const nth       = nthPath(el, root);
  const tag       = el.tagName;
  const key       = getElementUid(el);

  if(latestByKey.has(key)){
    const idx = latestByKey.get(key);
    changeLog[idx].newText = newText;
    changeLog[idx].ts = Date.now();
  } else {
    const entry = {
      uid: key,
      sourceFile, anchorSel, tag, oldText, newText, classSig, id, ancSig, nth,
      ts: Date.now()
    };
    latestByKey.set(key, changeLog.push(entry)-1);
  }

  ELEMENT_LATEST.set(el,newText);
  pendingTimers.delete(el);

  DEBUG && console.log("✏️ Coalesced change recorded:", changeLog[changeLog.length-1]);
}

/* =========================================================
   APPLY TEXT UPDATE
========================================================= */
function applyTextUpdate(target,newText){
  const tn=Array.from(target.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);
  if(tn) tn.nodeValue=newText;
  else target.textContent=newText;
}

/* =========================================================
   UPDATE ORIGINAL FILES
========================================================= */
async function updateOriginalHTMLWithTextChanges(){
  if(!changeLog.length){ alert("No text changes detected."); return; }

  const filesToUpdate = new Map();
  for(const ch of changeLog){
    if(!filesToUpdate.has(ch.sourceFile)) filesToUpdate.set(ch.sourceFile, []);
    filesToUpdate.get(ch.sourceFile).push(ch);
  }

  for(const [file, changes] of filesToUpdate.entries()){
    DEBUG && console.log("Processing file:", file);
    let htmlText = includeCache.has(file) 
      ? includeCache.get(file) 
      : await fetch(file).then(r=>r.text()).catch(()=>originalHTML);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const root = doc.body || doc;

    let updated=0;
    for(const ch of changes){
      const { tag, oldText, newText } = ch;
      const cands = Array.from(root.getElementsByTagName(tag)).filter(e => cleanText(e.textContent)===oldText);
      const target = cands[0];
      if(target){
        applyTextUpdate(target,newText);
        updated++;
      }
    }

    const newHTML = "<!DOCTYPE html>\n"+doc.documentElement.outerHTML;
    includeCache.set(file,newHTML);
    DEBUG && console.log(`Updated ${updated} items in ${file}`);
  }

  modifiedHTML = includeCache;
  alert("✅ All changes applied locally. You can now download or push to GitHub.");
}

/* =========================================================
   DOWNLOAD FILES
========================================================= */
function downloadFile(filename, text) {
  const blob = new Blob([text], {type: "text/html"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function downloadAllUpdatedFiles() {
  if (!modifiedHTML || !(modifiedHTML instanceof Map)) {
    alert("No updated files to download.");
    return;
  }
  modifiedHTML.forEach((html, file) => {
    downloadFile(file, html);
  });
  alert("✅ All updated files downloaded successfully.");
}

/* =========================================================
   PUSH TO GITHUB
========================================================= */
async function saveAndPushChanges() {
  if (!modifiedHTML || !(modifiedHTML instanceof Map)) {
    alert('No modified files detected.');
    return;
  }

  const OWNER = localStorage.getItem('owner');
  const REPO = localStorage.getItem('repo_name');
  const BRANCH = "main";
  const token = localStorage.getItem('feature_key');
  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  for(const [filePath, html] of modifiedHTML.entries()){
    try {
      const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
      const fileData = await fetch(getUrl, { headers }).then(r=>r.json());
      if(!fileData.sha) throw new Error("SHA not found for "+filePath);

      const payload = {
        message: `Update ${filePath} via browser editor`,
        content: btoa(unescape(encodeURIComponent(html))),
        branch: BRANCH,
        sha: fileData.sha
      };

      const response = await fetch(getUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload)
      });

      if(response.ok){
        console.log(`✅ ${filePath} pushed to GitHub`);
      } else {
        console.error(`❌ Failed to push ${filePath}`, await response.json());
      }
    } catch(err){
      console.error("GitHub push error:", err);
    }
  }
  alert("✅ All modified files pushed to GitHub.");
}

/* =========================================================
   UI BUTTONS
========================================================= */
window.enableTextEditing=enableTextEditing;
window.saveAndPushChanges=saveAndPushChanges;
window.updateOriginalHTMLWithTextChanges=updateOriginalHTMLWithTextChanges;
window.downloadAllUpdatedFiles=downloadAllUpdatedFiles;

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("featureEnabled")==="load buttons") createButtons();
});

function createButtons(){
  const buttonContainer=document.createElement('div');
  buttonContainer.id='buttonContainer';
  Object.assign(buttonContainer.style,{
    display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'15px', marginTop:'20px', marginBottom:'30px'
  });

  const enableEditingBtn = createButton('Enable Text Editing','enableEditingBtn',enableTextEditing);
  const updateHTMLBtn = createButton('Update HTML with Changes','updateHTMLBtn',updateOriginalHTMLWithTextChanges);
  const downloadBtn = createButton('Download Updated Files','downloadBtn',downloadAllUpdatedFiles);
  const saveChangesBtn = createButton('Save and Push Changes','saveChangesBtn',saveAndPushChanges);

  [enableEditingBtn,updateHTMLBtn,downloadBtn,saveChangesBtn].forEach(b=>buttonContainer.appendChild(b));
  document.body.appendChild(buttonContainer);
}

function createButton(text,id,handler){
  const btn=document.createElement('button');
  btn.textContent=text; btn.id=id;
  btn.addEventListener('click',handler);
  Object.assign(btn.style,{
    padding:'12px 24px', fontSize:'16px', cursor:'pointer', border:'1px solid #ccc',
    borderRadius:'4px', backgroundColor:'#4CAF50', color:'white', transition:'background-color 0.3s ease'
  });
  btn.addEventListener('mouseover',()=>btn.style.backgroundColor='#45a049');
  btn.addEventListener('mouseout',()=>btn.style.backgroundColor='#4CAF50');
  return btn;
}
