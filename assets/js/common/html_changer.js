

















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

/*
Purpose: Calculates Jaccard similarity between two sets (0–1).
Used to compare classes of two elements.
Example: ["wrap","title"] vs ["wrap","subtitle"] → similarity = 0.33.
*/ 

function jaccard(aArr,bArr){
  const A=new Set((aArr||[]).filter(Boolean));
  const B=new Set((bArr||[]).filter(Boolean));
  if(!A.size && !B.size) return 0;
  let inter=0; for(const v of A) if(B.has(v)) inter++;
  return inter/(A.size+B.size-inter);
}

/*
Purpose: Standard Levenshtein algorithm → measures text difference.
similarity(a,b) returns 0–1 (1 = exact same text).
Used when exact oldText not found → fuzzy matching.
*/ 

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

/*
Purpose: Captures the chain of ancestors above an element until the root.
Returns array like:
[
  {tag:"DIV", classes:["wrap-caption"], id:""},
  {tag:"DIV", classes:["container"], id:""}
]

Used to compare structure between original and edited DOM.
*/
function ancestorSignature(el, root){
  const sig=[]; let node=el.parentElement; let guard=0;
  while(node && node!==root && node.tagName && node.tagName!=="HTML" && guard++<8){
    sig.push({tag:node.tagName, classes:getStableClasses(node), id:getStableId(node)});
    node=node.parentElement;
  }
  return sig; // nearest first
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
/*
Purpose: Creates a :nth-of-type() path from root to element.
Example: div:nth-of-type(2) > h2:nth-of-type(1).
Used to uniquely identify positions of elements.
*/ 
function nthPath(fromEl, root){
  if(!fromEl || !root) return "";
  const parts=[];
  let node=fromEl; let guard=0;
  while(node && node!==root && node.nodeType===1 && guard++<15){
    const tag=node.tagName.toLowerCase();
    let idx=1, sib=node;
    while((sib=sib.previousElementSibling) && sib.tagName===node.tagName) idx++;
    parts.push(`${tag}:nth-of-type(${idx})`);
    node=node.parentElement;
  }
  return parts.reverse().join(" > ");
}

/* Stable anchor (prefer nearest ID; else known anchors; else body)
Purpose: Chooses the nearest stable container (#id or known wrapper).
Example: if editing inside a slideshow, anchor may be #page-content.
Ensures changes are grouped in context.
*/
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

/* =========================================================
   LOAD ORIGINAL HTML
========================================================= */
let originalHTML=null;
let modifiedHTML=null;
fetch(window.location.href,{cache:"no-store"})
 .then(r=>r.text())
 .then(html=>{ originalHTML=html; DEBUG&&console.log("✅ Original HTML loaded."); })
 .catch(err=>console.error("❌ Error loading original HTML:",err));

/* =========================================================
   EDIT MODE + CHANGE CAPTURE (MutationObserver)
========================================================= */
/*
MO: The MutationObserver instance.
changeLog: Stores all captured changes (our dictionary).
latestByKey: Prevents duplicate entries if the same text is edited multiple times.
ELEMENT_ORIG: Maps each element → its original text before editing.
*/ 
let MO=null;
const changeLog=[];
const latestByKey=new Map();
const ELEMENT_ORIG = new WeakMap();

// 🔹 ensure we bubble to nearest ALLOWED leaf (fix for <a>, <span>, etc.)
function resolveEditableElementFromTextNode(node){
  let el=node.parentElement;
  while(el){
    if(ALLOWED.has(el.tagName)) return el;
    el=el.parentElement;
  }
  return null;
}

function enableTextEditing(){

  if (localStorage.getItem('featureEnabled') === 'false') {
    console.log("Feature is disabled. Editing is not allowed.");
    return false;
  }

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

    const anchorSel = findStableAnchorSelector(el);
    const classSig  = getStableClasses(el);
    const id        = getStableId(el);
    const root      = document.querySelector(anchorSel) || document.body;
    const ancSig    = ancestorSignature(el, root);
    const nth       = nthPath(el, root);
    const tag       = el.tagName;

    const key = `${anchorSel}|${tag}|${oldText}`;
    if(latestByKey.has(key)){
      const idx = latestByKey.get(key);
      changeLog[idx].newText = newText;
      changeLog[idx].ts = Date.now();
    }else{
      const entry = {
        anchorSel, tag, oldText, newText, classSig, id, ancSig, nth,
        parentChain: ancestorSignature(el, document.body).map(s=>`${s.tag}.${(s.classes||[]).join(".")}`),
        ts: Date.now()
      };
      latestByKey.set(key, changeLog.push(entry)-1);
    }
    if(DEBUG){
      console.log("✏️ Change captured:", changeLog[changeLog.length-1]);
    }
  }
}

/* =========================================================
   APPLY CHANGES BACK TO ORIGINAL HTML
========================================================= */
function updateOriginalHTMLWithTextChanges(){

  if (localStorage.getItem('featureEnabled') === 'false') {
    console.log("Feature is disabled");
    return false;
  }

  if(!originalHTML){ alert("Original HTML not ready yet."); return; }
  if(!changeLog.length){ alert("No text changes detected."); return; }

  const parser=new DOMParser();
  const originalDoc=parser.parseFromString(originalHTML,"text/html");



  // Temporarily remove the buttonContainer element from the document

    const buttonContainer = originalDoc.querySelector('#buttonContainer');
    if (buttonContainer) {
      buttonContainer.remove(); // Remove the buttonContainer from the DOM tree
    }




  let updated=0, ambiguous=0, fuzzy=0, misses=0;

  for(const ch of changeLog){
    const {anchorSel, tag, oldText, newText, classSig, id, ancSig, nth} = ch;
    const root = originalDoc.querySelector(anchorSel) || originalDoc.body;

    let cands = Array.from(root.getElementsByTagName(tag))
      .filter(el => cleanText(el.textContent) === oldText);

    let target=null;
    if(cands.length===1){
      target=cands[0];
    }else if(cands.length>1){
      target=pickBestCandidate(cands, classSig, id, ancSig, nth, root);
      ambiguous++;
    }else{
      const all = Array.from(root.getElementsByTagName(tag));
      target=pickBestByFuzzy(all, oldText, classSig, id, ancSig, nth, root);
      if(target) fuzzy++;
    }

    if(target){
      applyTextUpdate(target,newText);
      updated++;
    }else{
      misses++;
    }
  }

  DEBUG && console.log("=== ✅ Sync Complete ===");
  DEBUG && console.log(`Updated: ${updated}, Ambiguous: ${ambiguous}, Fuzzy: ${fuzzy}, Misses: ${misses}`);
  DEBUG && console.log("=== Change Log Dictionary ===", changeLog);



  // Re-add the buttonContainer if it was removed
  if (buttonContainer) {
    originalDoc.body.appendChild(buttonContainer);
  }

  const cleanedOuterHTML="<!DOCTYPE html>\n"+originalDoc.documentElement.outerHTML;
  console.log("=== Final Updated HTML ==="); console.log(cleanedOuterHTML);
  modifiedHTML = "<!DOCTYPE html>\n"+originalDoc.documentElement.outerHTML;
  // try{
  //   const blob=new Blob([cleanedOuterHTML],{type:"text/html"});
  //   const a=document.createElement("a");
  //   a.href=URL.createObjectURL(blob);
  //   a.download=(document.title||"updated")+".html";
  //   document.body.appendChild(a); a.click(); URL.revokeObjectURL(a.href); a.remove();
  // }catch(e){ console.warn("Download failed; copy from console.",e); }
}

/* Scoring helpers

pickBestCandidate: chooses the best candidate among multiple exact-text matches.
pickBestByFuzzy: chooses best match if old text not found exactly.
scoreCandidate: combines ID, class similarity, ancestor overlap, nth-path closeness.
compareNth: compares nth paths for structural position.

*/

function pickBestCandidate(cands,classSig,id,ancSig,nth,root){
  let best=null,bestScore=-1;
  for(const el of cands){
    const score=scoreCandidate(el,classSig,id,ancSig,nth,root,0);
    if(score>bestScore){best=el;bestScore=score;}
  }
  return best;
}
function pickBestByFuzzy(cands,oldText,classSig,id,ancSig,nth,root){
  let best=null,bestScore=0;
  for(const el of cands){
    const textScore=similarity(oldText,cleanText(el.textContent));
    const ctxScore=scoreCandidate(el,classSig,id,ancSig,nth,root,1);
    const score=(0.65*textScore)+(0.35*ctxScore);
    if(score>bestScore){best=el;bestScore=score;}
  }
  return (bestScore>=0.45)?best:null;
}
function scoreCandidate(el,classSig,id,ancSig,nth,root,mode){
  const idScore=id&&el.id?(id===el.id?1:0):0;
  const clsScore=jaccard(classSig,getStableClasses(el));
  const ancScore=ancestorOverlapScore(ancSig,ancestorSignature(el,root));
  const nthScore=compareNth(nth,nthPath(el,root));
  return (0.15*idScore)+(0.45*clsScore)+(0.30*ancScore)+(0.10*nthScore);
}
function compareNth(a,b){
  if(!a||!b) return 0;
  const A=a.split(" > "),B=b.split(" > ");
  const len=Math.min(A.length,B.length);
  let match=0;
  for(let i=0;i<len;i++){ if(A[i]===B[i]) match++; else break; }
  return match/Math.max(A.length,B.length);
}
function applyTextUpdate(target,newText){
  const tn=Array.from(target.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);
  if(tn) tn.nodeValue=newText;
  else target.textContent=newText;
}


/* =========================================================
   SAVE CHANGES TO GITHUB 
========================================================= */
async function saveAndPushChanges() {
  if (localStorage.getItem('featureEnabled') === 'load buttons') {
    console.log("Feature is enabled. Editing is allowed.");
  }
else{
   alert('editing not allowed');
   return false;
}

  if (!modifiedHTML) {
    alert('Changes not detected, please save the changes.');
    return;
  }

  const pathParts = window.location.pathname.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const url = window.location.href;


  const base64Content = btoa(unescape(encodeURIComponent(modifiedHTML)));
  const OWNER = localStorage.getItem('owner');  // Your GitHub username
  const REPO = localStorage.getItem('repo_name');  // Your GitHub repository
  const BRANCH = "main";  // The branch you want to push changes to
  const FILE_PATH = fileName;  // Path to the file you're updating
  const token = localStorage.getItem('feature_key')
  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  try {
    // Step 1: Get current file SHA (needed for update)
    const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
    const fileData = await fetch(getUrl, { headers }).then(res => res.json());

    // Check if fileData contains 'sha' to prevent errors
    if (!fileData.sha) {
      throw new Error("SHA not found for the file. Please check the file path and repository.");
    }

    const sha = fileData.sha;

    // Step 2: Update file
    const putUrl = getUrl;
    const payload = {
      message: "Update editable.html via browser",
      content: base64Content,
      branch: BRANCH,
      sha: sha
    };

    const response = await fetch(putUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      alert("File successfully pushed to GitHub.");
      console.log("GitHub response:", result);
    } else {
      alert("Failed to push. See console for details.");
      console.error("GitHub error:", result);
    }
  } catch (error) {
    console.error("GitHub upload failed:", error);
    alert("Error pushing to GitHub.");
  }

  // Reset the modifiedHTML after operation is done
  modifiedHTML = null;
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
