/* =========================================================
   CONFIG
========================================================= */
const KNOWN_STABLE_ANCHORS = [
  "#page-content", ".pageWrapper", "#main", "main", "#content", "#root"
];
const VOLATILE_RE = /(active|current|open|close|show|hide|hidden|visible|slick|swiper|lazy|clone|tmp|draggable|loading|loaded|mount|hydr|portal)/i;
const DEBUG = true;

/* =========================================================
   HELPERS
========================================================= */
function cleanText(t) {
  if (!t) return "";
  return t
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\s+/g, " ")
    .trim();
}
function cssEscapeSafe(ident = "") {
  if (window.CSS && CSS.escape) return CSS.escape(ident);
  return String(ident).replace(/([^\w-])/g, "\\$1");
}
function getStableId(el) {
  return (el.id && !VOLATILE_RE.test(el.id)) ? el.id : "";
}
function getStableClasses(el) {
  return Array.from(el.classList || []).filter(c => !VOLATILE_RE.test(c));
}
function ancestorSignature(el, root) {
  const sig = [];
  let node = el.parentElement; let guard = 0;
  while (node && node !== root && node.tagName && node.tagName !== "HTML" && guard++ < 8) {
    sig.push({ tag: node.tagName, classes: getStableClasses(node), id: getStableId(node) });
    node = node.parentElement;
  }
  return sig;
}
function nthPath(fromEl, root) {
  if (!fromEl || !root) return "";
  const parts = [];
  let node = fromEl; let guard = 0;
  while (node && node !== root && node.nodeType === 1 && guard++ < 15) {
    const tag = node.tagName.toLowerCase();
    let idx = 1, sib = node;
    while ((sib = sib.previousElementSibling) && sib.tagName === node.tagName) idx++;
    parts.push(`${tag}:nth-of-type(${idx})`);
    node = node.parentElement;
  }
  return parts.reverse().join(" > ");
}
function findStableAnchorSelector(el) {
  let node = el;
  while (node && node !== document.body) {
    const id = getStableId(node);
    if (id) return `#${cssEscapeSafe(id)}`;
    node = node.parentElement;
  }
  for (const sel of KNOWN_STABLE_ANCHORS) {
    const a = el.closest(sel);
    if (a) return sel;
  }
  return "body";
}
function getDynamicSourceFile(el) {
  let node = el;
  while (node && node !== document.body) {
    if (node.dataset && node.dataset.src) {
      return node.dataset.src;
    }
    node = node.parentElement;
  }
  return window.location.pathname.split('/').pop() || "index.html";
}

/* =========================================================
   LOAD ORIGINAL HTML
========================================================= */
let originalHTML = null;
let modifiedHTML = null;
const includeCache = new Map();

fetch(window.location.href, { cache: "no-store" })
  .then(r => r.text())
  .then(html => {
    originalHTML = html;
    DEBUG && console.log(" Original HTML loaded.");
  })
  .catch(err => console.error(" Error loading original HTML:", err));

/* =========================================================
   EDIT MODE + CHANGE CAPTURE
========================================================= */
let changeLog = [];
let latestByKey = new Map();
const ELEMENT_ORIG = new WeakMap();
const ELEMENT_LATEST = new WeakMap();
const ELEMENT_UID = new WeakMap();
let ELEMENT_UID_COUNTER = 1;
const pendingTimers = new WeakMap();

function getElementUid(el) {
  if (ELEMENT_UID.has(el)) return ELEMENT_UID.get(el);
  const uid = 'el_' + (ELEMENT_UID_COUNTER++);
  ELEMENT_UID.set(el, uid);
  return uid;
}

function enableTextEditing() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: node => {
      const text = cleanText(node.textContent);
      if (!text) return NodeFilter.FILTER_REJECT;
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "noscript", "svg", "title", "meta", "link"].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (getComputedStyle(parent).display === "none" || parent.offsetParent === null) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node;
  while ((node = walker.nextNode())) {
    const span = document.createElement("span");
    span.dataset.editable = "true";
    span.contentEditable = "true";
    span.style.outline = "1px dashed #339AF0";
    span.style.outlineOffset = "2px";
    span.style.cursor = "text";
    span.textContent = node.textContent;

    ELEMENT_ORIG.set(span, cleanText(node.textContent));
    ELEMENT_LATEST.set(span, cleanText(node.textContent));
    node.parentNode.replaceChild(span, node);

    span.addEventListener("input", () => scheduleChange(span));
  }

  alert("✅ Editing enabled for all visible text elements (header, footer, links, etc.)");
}

function scheduleChange(el) {
  const prevTimer = pendingTimers.get(el);
  if (prevTimer) clearTimeout(prevTimer);
  const timer = setTimeout(() => recordChange(el), 300);
  pendingTimers.set(el, timer);
}

function recordChange(el) {
  const newText = cleanText(el.textContent);
  const oldText = ELEMENT_LATEST.get(el) || ELEMENT_ORIG.get(el) || "";
  if (newText === oldText) { pendingTimers.delete(el); return; }

  const sourceFile = getDynamicSourceFile(el);
  const anchorSel = findStableAnchorSelector(el);
  const classSig = getStableClasses(el);
  const id = getStableId(el);
  const root = document.querySelector(anchorSel) || document.body;
  const ancSig = ancestorSignature(el, root);
  const nth = nthPath(el, root);
  const tag = el.parentElement ? el.parentElement.tagName : "SPAN";
  const key = getElementUid(el);

  if (latestByKey.has(key)) {
    const idx = latestByKey.get(key);
    changeLog[idx].newText = newText;
    changeLog[idx].ts = Date.now();
  } else {
    const entry = {
      uid: key, sourceFile, anchorSel, tag, oldText, newText,
      classSig, id, ancSig, nth, ts: Date.now()
    };
    latestByKey.set(key, changeLog.push(entry) - 1);
  }

  ELEMENT_LATEST.set(el, newText);
  pendingTimers.delete(el);
  DEBUG && console.log("✏️ Change recorded:", changeLog[changeLog.length - 1]);
}

/* =========================================================
   APPLY TEXT UPDATE
========================================================= */
function applyTextUpdate(target, newText) {
  target.innerHTML = newText.replace(/\n/g, "<br>");
}

/* =========================================================
   UPDATE ORIGINAL FILES
========================================================= */
async function updateOriginalHTMLWithTextChanges() {
  if (!changeLog.length) { alert("No text changes detected."); return; }

  const filesToUpdate = new Map();
  for (const ch of changeLog) {
    if (!filesToUpdate.has(ch.sourceFile)) filesToUpdate.set(ch.sourceFile, []);
    filesToUpdate.get(ch.sourceFile).push(ch);
  }

  for (const [file, changes] of filesToUpdate.entries()) {
    DEBUG && console.log("Processing file:", file);
    let htmlText = includeCache.has(file)
      ? includeCache.get(file)
      : await fetch(file).then(r => r.text()).catch(() => originalHTML);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const root = doc.body || doc;

    let updated = 0;
    for (const ch of changes) {
      let target = null;

      if (ch.id) target = root.querySelector(`#${cssEscapeSafe(ch.id)}`);
      if (!target && ch.classSig && ch.classSig.length) {
        const clsSel = ch.classSig.map(c => '.' + cssEscapeSafe(c)).join('');
        const cands = root.querySelectorAll(`${ch.tag}${clsSel}`);
        target = Array.from(cands).find(e => cleanText(e.innerText) === ch.oldText);
      }
      if (!target && ch.nth) {
        const sel = `${ch.anchorSel} ${ch.nth}`;
        target = root.querySelector(sel);
      }
      if (!target) {
        const cands = Array.from(root.getElementsByTagName(ch.tag));
        target = cands.find(e => cleanText(e.innerText) === ch.oldText);
      }

      if (target) {
        applyTextUpdate(target, ch.newText);
        updated++;
      }
    }

    const newHTML = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
    includeCache.set(file, newHTML);
    DEBUG && console.log(`✅ Updated ${updated} items in ${file}`);
  }

  modifiedHTML = includeCache;
  alert("✅ All changes applied locally. You can now download or push to GitHub.");
}

/* =========================================================
   DOWNLOAD FILES
========================================================= */
function downloadFile(filename, text) {
  const blob = new Blob([text], { type: "text/html" });
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
    alert("No modified files detected.");
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

  for (const [filePath, html] of modifiedHTML.entries()) {
    try {
      const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
      const fileData = await fetch(getUrl, { headers }).then(r => r.json());
      if (!fileData.sha) throw new Error("SHA not found for " + filePath);

      const payload = {
        message: `Update ${filePath} via browser editor`,
        content: btoa(unescape(encodeURIComponent(html))),
        branch: BRANCH,
        sha: fileData.sha
      };

      const response = await fetch(getUrl, {
        method: "PUT", headers, body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`✅ ${filePath} pushed to GitHub`);
      } else {
        console.error(`❌ Failed to push ${filePath}`, await response.json());
      }
    } catch (err) {
      console.error("GitHub push error:", err);
    }
  }
  alert("✅ All modified files pushed to GitHub.");
}

/* =========================================================
   UI BUTTONS
========================================================= */
window.enableTextEditing = enableTextEditing;
window.saveAndPushChanges = saveAndPushChanges;
window.updateOriginalHTMLWithTextChanges = updateOriginalHTMLWithTextChanges;
window.downloadAllUpdatedFiles = downloadAllUpdatedFiles;

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("featureEnabled") === "load buttons") createButtons();
});

function createButtons() {
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';
  Object.assign(buttonContainer.style, {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flexWrap: 'wrap', gap: '15px', marginTop: '20px', marginBottom: '30px'
  });

  const enableEditingBtn = createButton('Enable Text Editing', 'enableEditingBtn', enableTextEditing);
  const updateHTMLBtn = createButton('Update HTML with Changes', 'updateHTMLBtn', updateOriginalHTMLWithTextChanges);
  const downloadBtn = createButton('Download Updated Files', 'downloadBtn', downloadAllUpdatedFiles);
  const saveChangesBtn = createButton('Save and Push Changes', 'saveChangesBtn', saveAndPushChanges);

  [enableEditingBtn, updateHTMLBtn, downloadBtn, saveChangesBtn].forEach(b => buttonContainer.appendChild(b));
  document.body.appendChild(buttonContainer);
}

function createButton(text, id, handler) {
  const btn = document.createElement('button');
  btn.textContent = text; btn.id = id;
  btn.addEventListener('click', handler);
  Object.assign(btn.style, {
    padding: '12px 24px', fontSize: '16px', cursor: 'pointer',
    border: '1px solid #ccc', borderRadius: '4px',
    backgroundColor: '#4CAF50', color: 'white',
    transition: 'background-color 0.3s ease'
  });
  btn.addEventListener('mouseover', () => btn.style.backgroundColor = '#45a049');
  btn.addEventListener('mouseout', () => btn.style.backgroundColor = '#4CAF50');
  return btn;
}
