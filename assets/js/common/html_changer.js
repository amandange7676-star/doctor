
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
   FIND STABLE ANCHOR SELECTOR
========================================================= */
function findStableAnchorSelector(el){
  let node=el;
  while(node && node!==document.body){
    const id = getStableId(node);
    if (id) return `#${cssEscapeSafe(id)}`;
    node=node.parentElement;
  }
  for(const sel of KNOWN_STABLE_ANCHORS){
    const a=el.closest(sel);
    if(a) return sel;
  }
  return "body";
}

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

/* =========================================================
   NEW: Detect dynamic include source (header/footer)
========================================================= */
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
const includeCache = new Map(); // store header/footer original content

// load main page
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
let MO=null;
const changeLog=[];
const latestByKey=new Map();
const ELEMENT_ORIG = new WeakMap();

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
    el.contentEditable="true";
    el.style.outline="1px dashed #0088ff";
  });
  if(!MO){
    MO=new MutationObserver(onMutations);
    MO.observe(document.body,{characterData:true,characterDataOldValue:true,subtree:true});
  }
  alert("Editing enabled. Start typing to edit text.");
}

function onMutations(records){
  for(const rec of records){
    if(rec.type!=="characterData") continue;
    const node=rec.target;
    const el=resolveEditableElementFromTextNode(node);
    if(!el) continue;

    const newText=cleanText(node.nodeValue);
    const oldText=cleanText(rec.oldValue || ELEMENT_ORIG.get(el) || "");
    if(!newText || !oldText || newText===oldText) continue;

    const sourceFile = getDynamicSourceFile(el) || window.location.pathname.split('/').pop();
    const anchorSel = findStableAnchorSelector(el);
    const classSig  = getStableClasses(el);
    const id        = getStableId(el);
    const root      = document.querySelector(anchorSel) || document.body;
    const ancSig    = ancestorSignature(el, root);
    const nth       = nthPath(el, root);
    const tag       = el.tagName;

    const key = `${sourceFile}|${anchorSel}|${tag}|${oldText}`;
    if(latestByKey.has(key)){
      const idx = latestByKey.get(key);
      changeLog[idx].newText = newText;
      changeLog[idx].ts = Date.now();
    }else{
      const entry = {
        sourceFile, anchorSel, tag, oldText, newText, classSig, id, ancSig, nth,
        ts: Date.now()
      };
      latestByKey.set(key, changeLog.push(entry)-1);
    }
    DEBUG&&console.log("✏️ Change captured:", changeLog[changeLog.length-1]);
  }
}

/* =========================================================
   APPLY CHANGES BACK TO FILES
========================================================= */
async function updateOriginalHTMLWithTextChanges(){
  if(!changeLog.length){ alert("No text changes detected."); return; }

  const filesToUpdate = new Map();
  // group changes by file
  for(const ch of changeLog){
    if(!filesToUpdate.has(ch.sourceFile)) filesToUpdate.set(ch.sourceFile, []);
    filesToUpdate.get(ch.sourceFile).push(ch);
  }

  for(const [file, changes] of filesToUpdate.entries()){
    DEBUG&&console.log("Processing file:", file);
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
    DEBUG&&console.log(`Updated ${updated} items in ${file}`);
  }

  alert("All changes applied locally. You can now push to GitHub.");
  modifiedHTML = includeCache; // store updated files map
}

/* =========================================================
   SAVE CHANGES TO GITHUB 
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
  alert("All modified files pushed to GitHub.");
}

window.enableTextEditing=enableTextEditing;
window.saveAndPushChanges=saveAndPushChanges;
window.updateOriginalHTMLWithTextChanges=updateOriginalHTMLWithTextChanges;


document.addEventListener('DOMContentLoaded', function () {
    const feature = localStorage.getItem("featureEnabled");
     console.log('feature enabled :-------',feature)
        if (feature === "load buttons") {
          createButtons();
        } else {
          console.log("Feature is disabled");
        }
});

// Function to dynamically create and append the buttons
function createButtons() {
    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer'; // Add an ID for styling

    // Add CSS styles to the container
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center'; // Center the buttons horizontally
    buttonContainer.style.alignItems = 'center'; // Vertically center the buttons
    buttonContainer.style.flexWrap = 'wrap'; // Ensure buttons wrap if necessary
    buttonContainer.style.gap = '15px'; // Adds more space between the buttons
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.marginBottom = '30px'; // Add some space below

    // Create the buttons
    const enableEditingBtn = createButton('Enable Text Editing', 'enableEditingBtn', enableTextEditing);
    const saveChangesBtn = createButton('Save and Push Changes', 'saveChangesBtn', saveAndPushChanges);
    const updateHTMLBtn = createButton('Update HTML with Changes', 'updateHTMLBtn', updateOriginalHTMLWithTextChanges);

    // Append the buttons to the container
    buttonContainer.appendChild(enableEditingBtn);
    buttonContainer.appendChild(saveChangesBtn);
    buttonContainer.appendChild(updateHTMLBtn);

    // Append the button container to the body
    document.body.appendChild(buttonContainer);
}

// Helper function to create buttons
function createButton(text, id, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    button.addEventListener('click', clickHandler);

    // Style the button
    button.style.padding = '12px 24px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '4px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.transition = 'background-color 0.3s ease';

    // Add hover and focus styles
    button.addEventListener('mouseover', function () {
        button.style.backgroundColor = '#45a049';
    });

    button.addEventListener('mouseout', function () {
        button.style.backgroundColor = '#4CAF50';
    });

    button.addEventListener('focus', function () {
        button.style.boxShadow = '0 0 5px rgba(0, 128, 0, 0.6)';
        button.style.outline = 'none';
    });

    button.addEventListener('blur', function () {
        button.style.boxShadow = 'none';
    });

    return button;
}
