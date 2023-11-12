// content.js
window.addEventListener("message", (event) => {
    if (event.source === window && event.data && event.data.mutations) {
        chrome.runtime.sendMessage(event.data);
    }
});