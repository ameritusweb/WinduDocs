// content.js
window.addEventListener("message", (event) => {
    if (event.source === window && event.data && (event.data.mutations || event.data.stacks)) {
        chrome.runtime.sendMessage(event.data);
    }
});