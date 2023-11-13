// content.js
window.addEventListener("message", (event) => {
    if (event.source === window && event.data && (event.data.mutations || event.data.stacks)) {
        if (chrome.runtime.id) {
            chrome.runtime.sendMessage(event.data);
        }
    }
});

function detectReload() {
    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
          .getEntriesByType('navigation')
          .map((nav) => nav.type)
          .includes('reload')
      );
    
    if (pageAccessedByReload)
    {
        chrome.runtime.sendMessage({ 'pageLoaded': true });
    }
}

detectReload();

function createNodeHierarchy(node) {
    if (!node) {
        return null;
    }

    // Function to find the index of a node relative to its parent
    function findChildIndex(node) {
        let index = 0;
        while ((node = node.previousSibling) != null) {
            index++;
        }
        return index;
    }

    // Recursive function to build the hierarchy
    function buildHierarchy(node) {
        if (!node.parentNode || node.parentNode.isContentEditable) {
            return {
                childIndex: findChildIndex(node),
                nodeName: node.nodeName,
                textContent: node.nodeType === Node.TEXT_NODE ? node.textContent : null,
                child: null
            };
        }

        const childInfo = {
            childIndex: findChildIndex(node),
            nodeName: node.nodeName,
            textContent: node.nodeType === Node.TEXT_NODE ? node.textContent : null
        };

        // Recurse to parent node
        const parentInfo = buildHierarchy(node.parentNode);
        parentInfo.child = childInfo;

        return parentInfo;
    }

    return buildHierarchy(node);
}

document.addEventListener('contextmenu', function(event) {
    const range = window.getSelection().getRangeAt(0);
    if (range.startContainer.nodeName === '#text') {
        const hier = createNodeHierarchy(range.startContainer);
        chrome.storage.local.set({ "nodeInfo": JSON.stringify(hier) });
    }
}, true);