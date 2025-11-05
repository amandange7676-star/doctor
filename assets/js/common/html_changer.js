/* =========================================================
   CONFIG
========================================================= */
const ALLOWED = new Set([
  "H1","H2","H3","H4","H5","H6",
  "P","DIV","SPAN","A",
  "UL","LI","LABEL","B"
]);

const KNOWN_STABLE_ANCHORS = ["#page-content",".pageWrapper","#main","main","#content","#root"];
const VOLATILE_RE = /(active|current|open|close|show|hide|hidden|visible|slick|swiper|lazy|clone|tmp|draggable|loading|loaded|mount|hydr|portal)/i;
const DEBUG = true;

/* =========================================================
   HELPER FUNCTIONS
========================================================= */
function cleanText(t){ return (t||"").replace(/\s+/g," ").trim(); }
function cssEscapeSafe(ident=""){ return (window.CSS && CSS.escape) ? CSS.escape(ident) : String(ident).replace(/([^\w-])/g,"\\$1"); }
function getStableId(el){ return (el.id && !VOLATILE_RE.test(el.id)) ? el.id : ""; }
function getStableClasses(el){ return Array.from(el.classList||[]).filter(c=>!VOLATILE_RE.test(c)); }

function ancestorSignature(el, root){
  const sig=[]; let node=el.parentElement, guard=0;
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
  const parts=[]; let node=fromEl, guard=0;
  while(node && node!==root && node.nodeType===1 && guard++<15){
    const tag=node.tagName.toLowerCase();
    let idx=1, sib=node;
    while((sib=sib.previousElementSibling) && sib.tagName===node.tagName) idx++;
    parts.push(`${tag}:nth-of-type(${idx})`);
    node=node.parentElement;
  }
  return parts.reverse().join(" > ");
}

function jaccard(aArr,bArr){
  const A=new Set((aArr||[]).filter(Boolean)), B=new Set((bArr||[]).filter(Boolean));
  if(!A.size && !B.size) return 0;
  let inter=0; for(const v of A) if(B.has(v)) inter++;
  return inter/(A.size+B.size-inter);
}

/* =========================================================
   STABLE ANCHOR / DYNAMIC SOURCE
========================================================= */
function findStableAnchorSelector(el){
  let node=el;
  while(node && node!==document.body){
    const id=getStableId(node);
    if(id) return `#${cssEscapeSafe(id)}`;
    node=node.parentElement;
  }
  for(const sel of KNOWN_STABLE_ANCHORS){
    const a=el.closest(sel);
    if(a) return sel;
  }
  return "body";
}

function getDynamicSourceFile(el){
  let node=el;
  while(node && node!==document.body){
    if(node.dataset && node.dataset.src) return node.dataset.src;
    node=node.parentElement;
  }
  return null;
}

/* =========================================================
   EDITING & CHANGE CAPTURE
========================================================= */
let changeLog=[], latestByKey=new Map(), ELEMENT_ORIG=new WeakMap(), ELEMENT_LATEST=new WeakMap();
const includeCache = new Map(); // header/footer caches

function enableTextEditing(){
  const sel = Array.from(ALLOWED).map(t=>t.toLowerCase()).join(",");
  document.querySelectorAll(sel).forEach(el=>{
    const t = cleanText(el.textContent);
    if(t && !ELEMENT_ORIG.has(el)) ELEMENT_ORIG.set(el, t);
    ELEMENT_LATEST.set(el,t);
    el.contentEditable="true";
    el.style.outline="1px dashed #0088ff";
    el.addEventListener('input', ()=>recordElementChange(el));
    el.addEventListener('blur', ()=>recordElementChange(el,true));
  });
  alert("Editing enabled. Start typing or pasting to edit text.");
}

function recordElementChange(el, force=false){
  const newText = cleanText(el.textContent);
  const oldText = ELEMENT_LATEST.get(el) || ELEMENT_ORIG.get(el) || "";
  if(!force && newText===oldText) return;

  const sourceFile = getDynamicSourceFile(el) || window.location.pathname.split('/').pop();
  const anchorSel = findStableAnchorSelector(el);
  const classSig = getStableClasses(el);
  const id = getStableId(el);
  const root = document.querySelector(anchorSel) || document.body;
  const ancSig = ancestorSignature(el, root);
  const nth = nthPath(el, root);
  const tag = el.tagName;

  const uid = `${sourceFile}|${anchorSel}|${tag}|${oldText}`;
  if(latestByKey.has(uid)){
    const idx = latestByKey.get(uid);
    changeLog[idx].newText = newText;
    changeLog[idx].ts = Date.now();
  } else {
    const entry = { uid, sourceFile, anchorSel, tag, oldText, newText, classSig, id, ancSig, nth, ts: Date.now() };
    latestByKey.set(uid, changeLog.push(entry)-1);
  }
  ELEMENT_LATEST.set(el, newText);
  DEBUG && console.log("✏️ Change captured:", changeLog[changeLog.length-1]);
}

/* =========================================================
   APPLY CHANGES TO FILES
========================================================= */
async function updateOriginalHTMLWithTextChanges(){
  if(!changeLog.length){ alert("No text changes detected."); return; }

  const filesToUpdate = new Map();
  for(const ch of changeLog){
    if(!filesToUpdate.has(ch.sourceFile)) filesToUpdate.set(ch.sourceFile, []);
    filesToUpdate.get(ch.sourceFile).push(ch);
  }

  for(const [file, changes] of filesToUpdate.entries()){
    let htmlText = includeCache.has(file) 
      ? includeCache.get(file) 
      : await fetch(file).then(r=>r.text()).catch(()=>null);
    if(!htmlText) continue;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText,"text/html");
    const root = doc.body || doc;

    let updated=0;
    for(const ch of changes){
      const { tag, oldText, newText } = ch;
      const cands = Array.from(root.getElementsByTagName(tag)).filter(e=>cleanText(e.textContent)===oldText);
      const target = cands[0];
      if(target){
        target.textContent = newText;
        updated++;
      }
    }

    const newHTML = "<!DOCTYPE html>\n"+doc.documentElement.outerHTML;
    includeCache.set(file,newHTML);
    DEBUG && console.log(`Updated ${updated} items in ${file}`);
  }

  modifiedHTML = includeCache;
  alert("All changes applied locally. You can now push to GitHub.");
}

/* =========================================================
   PUSH TO GITHUB
========================================================= */
async function saveAndPushChanges(){
  if(!modifiedHTML || !(modifiedHTML instanceof Map)){
    alert("No modified files detected."); return;
  }

  const OWNER = localStorage.getItem('owner');
  const REPO = localStorage.getItem('repo_name');
  const BRANCH = "main";
  const token = localStorage.getItem('feature_key');
  const headers = { "Authorization": `token ${token}`, "Accept": "application/vnd.github.v3+json","Content-Type":"application/json" };

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
      const response = await fetch(getUrl,{method:"PUT",headers,body:JSON.stringify(payload)});
      if(response.ok) console.log(`✅ ${filePath} pushed to GitHub`);
      else console.error(`❌ Failed to push ${filePath}`, await response.json());
    } catch(err){ console.error("GitHub push error:",err); }
  }
  alert("All modified files pushed to GitHub.");
}

/* =========================================================
   BUTTONS
========================================================= */
function createButton(text,id,clickHandler){
  const button=document.createElement('button');
  button.textContent=text; button.id=id; button.addEventListener('click',clickHandler);
  button.style.padding='12px 24px'; button.style.fontSize='16px'; button.style.cursor='pointer';
  button.style.border='1px solid #ccc'; button.style.borderRadius='4px'; button.style.backgroundColor='#4CAF50';
  button.style.color='white'; button.style.transition='background-color 0.3s ease';
  button.addEventListener('mouseover',()=>button.style.backgroundColor='#45a049');
  button.addEventListener('mouseout',()=>button.style.backgroundColor='#4CAF50');
  button.addEventListener('focus',()=>{button.style.boxShadow='0 0 5px rgba(0,128,0,0.6)'; button.style.outline='none';});
  button.addEventListener('blur',()=>button.style.boxShadow='none');
  return button;
}

function createButtons(){
  const container=document.createElement('div'); container.id='buttonContainer';
  container.style.display='flex'; container.style.justifyContent='center'; container.style.alignItems='center';
  container.style.flexWrap='wrap'; container.style.gap='15px'; container.style.marginTop='20px'; container.style.marginBottom='30px';
  container.appendChild(createButton('Enable Text Editing','enableEditingBtn',enableTextEditing));
  container.appendChild(createButton('Update HTML with Changes','updateHTMLBtn',updateOriginalHTMLWithTextChanges));
  container.appendChild(createButton('Save and Push Changes','saveChangesBtn',saveAndPushChanges));
  document.body.appendChild(container);
}

/* =========================================================
   INIT
========================================================= */
window.enableTextEditing=enableTextEditing;
window.updateOriginalHTMLWithTextChanges=updateOriginalHTMLWithTextChanges;
window.saveAndPushChanges=saveAndPushChanges;

document.addEventListener('DOMContentLoaded',function(){
  if(localStorage.getItem("featureEnabled")==="load buttons") createButtons();
});
