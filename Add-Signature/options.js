document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("signatureText", (data) => {
    document.getElementById("signatureText").value = data.signatureText || "";
  });

  document.getElementById("save").addEventListener("click", () => {
    const text = document.getElementById("signatureText").value;
    chrome.storage.sync.set({ signatureText: text }, () => {
      const status = document.getElementById("status");
      status.textContent = "Signature saved!";
      setTimeout(() => status.textContent = "", 2000);
    });
  });
});
