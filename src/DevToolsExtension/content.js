// content.js
window.addEventListener("message", (event) => {
    if (event.source === window && event.data && (event.data.mutations || event.data.stacks)) {
        chrome.runtime.sendMessage(event.data);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Send a message to the background script when the page is fully loaded
    chrome.runtime.sendMessage({"pageLoaded": true});
});

document.addEventListener('contextmenu', function(event) {
    const nodeInfo = {
        nodeName: event.target.nodeName,
        textContent: event.target.textContent
        // Add more properties as needed
    };
    chrome.storage.local.set({ "nodeInfo": JSON.stringify(nodeInfo) });
}, true);