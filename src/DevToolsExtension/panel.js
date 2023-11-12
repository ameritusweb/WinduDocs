// Function to create a tree node for the tree view
function createTreeNode(domNode) {
    let treeLi = document.createElement('li');
    treeLi.className = "relative pl-6";

    let treeSpan = document.createElement('span');
    treeSpan.className = "relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black";

    if (domNode.nodeType === Node.ELEMENT_NODE) {
        treeSpan.textContent = `<${domNode.nodeName.toLowerCase()}>`;
    } else if (domNode.nodeType === Node.TEXT_NODE) {
        let textContent = domNode.textContent
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t')
            .replace(/\r/g, '\\r')
            .trim();

        if (textContent === '') {
            // Highlighting empty text nodes
            treeSpan.textContent = '<text>EMPTY TEXT NODE</text>';
            treeSpan.style.color = 'red'; // or any other style to make it stand out
        } else {
            treeSpan.textContent = `<text>${textContent}</text>`;
        }
    }

    treeLi.appendChild(treeSpan);
    return treeLi;
}

// Function to recursively build the tree
function buildTree(domNode, parentTreeNode) {
    let treeNode = createTreeNode(domNode);
    parentTreeNode.appendChild(treeNode);

    if (domNode.nodeType === Node.ELEMENT_NODE && domNode.childNodes.length > 0) {
        let childUl = document.createElement('ul');
        childUl.className = "list-none m-0 p-0";
        treeNode.appendChild(childUl);

        domNode.childNodes.forEach(childDomNode => {
            buildTree(childDomNode, childUl);
        });
    }
}

function updateTreeView() {
    // Execute script in the context of the inspected window
    chrome.devtools.inspectedWindow.eval(
        "document.querySelector('div[contenteditable=\"true\"]').outerHTML;",
        function(result, isException) {
            if (isException || !result) {
                console.error('Error accessing contentEditable div:', isException);
                return;
            }

            // Parse the result into a new DOM element
            const parser = new DOMParser();
            const doc = parser.parseFromString(result, 'text/html');
            const contentEditableDiv = doc.body.firstChild;

            // Now update your extension's DOM
            const root = document.querySelector('.tree-container > ul');
            root.innerHTML = '';

            if (contentEditableDiv) {
                buildTree(contentEditableDiv, root);
            }
        }
    );
}

function injectMutationObserverScript() {
    const script = `
        (function() {
            const targetNode = document.querySelector('div[contenteditable="true"]');

            if (targetNode) {
                const observerOptions = {
                    childList: true,
                    subtree: true,
                    characterData: true
                };

                const observer = new MutationObserver(function(mutationsList, observer) {
                    const eventData = { mutations: JSON.stringify(mutationsList) }; // Simplified, you may need to serialize this appropriately
                    const data = eventData;
                    // Use postMessage to send data to the content script
                    window.postMessage(data, "*");
                });

                observer.observe(targetNode, observerOptions);
            }
        })();
    `;

    chrome.devtools.inspectedWindow.eval(script, function(result, isException) {
        if (isException) console.error('Injection failed:', isException);
    });
}


let updateTimeout;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.mutations) {
        // Clear any previous timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        // Update the tree view with a delay
        updateTimeout = setTimeout(() => {
            updateTreeView(); // Pass any necessary data to this function
        }, 150);
    }
});

// Function to toggle the display of child nodes (for expand/collapse)
function toggleNode(node) {
    let childUl = node.querySelector('ul');
    if (childUl) {
        childUl.style.display = childUl.style.display === 'none' ? '' : 'none';
    }
}

// Add event listener for expanding/collapsing nodes
document.addEventListener('DOMContentLoaded', () => {
    const treeView = document.querySelector('.tree-container');

    treeView.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            toggleNode(event.target.parentNode);
        }
    });
});

// Initial call to build the tree and start observing
updateTreeView();
injectMutationObserverScript();