chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addSignature",
    title: "Add Signature",
    contexts: ["editable"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addSignature") {
    chrome.storage.sync.get("signatureText", (data) => {
      const text = data.signatureText || "Your Signature";
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: insertSignature,
        args: [text]
      });
    });
  }
});

function insertSignature(text) {
  const active = document.activeElement;
  if (active && (active.tagName === "TEXTAREA" || active.tagName === "INPUT" || active.isContentEditable)) {
    const start = active.selectionStart;
    const end = active.selectionEnd;
    const original = active.value || active.innerText;
    const updated = original.substring(0, start) + text + original.substring(end);
    if (active.value !== undefined) {
      active.value = updated;
      active.selectionStart = active.selectionEnd = start + text.length;
    } else {
      active.innerText = updated;
    }
  }
}
