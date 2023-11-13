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
            const root = document.querySelector('#EditableDiv .tree-container > ul');
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
let stacksTimeout;

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
    } else if (message.stacks) {
        // Clear any previous timeout
        if (stacksTimeout) {
            clearTimeout(stacksTimeout);
        }

        stacksTimeout = setTimeout(() => {
            buildUndoRedoTreeView(message.stacks);
        }, 150);
    } else if (message.pageLoaded) {
        updateTreeView();
        resetUndoRedoTreeView();
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
    const treeView = document.querySelector('#EditableDiv .tree-container');

    treeView.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            toggleNode(event.target.parentNode);
        }
    });

    const undoRedoView = document.querySelector('#UndoRedo .tree-container');

    undoRedoView.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            toggleNode(event.target.parentNode);
        }
    });


     // Attach event listeners
  document.getElementById("openEditableDiv").addEventListener("click", function(event) {
    openTab(event, 'EditableDiv');
  });
  document.getElementById("openUndoRedo").addEventListener("click", function(event) {
    openTab(event, 'UndoRedo');
  });

  // Open the default tab
  document.getElementById("openEditableDiv").click();

  //let queryOptions = { active: true, lastFocusedWindow: true };
  /*chrome.tabs.query(queryOptions).then((t) => {

    chrome.scripting.executeScript({
        target: {tabId: t[0].id},
        files: ['content.js']
      });

  });*/

  chrome.storage.local.get(["activeTabId"]).then((res) => {
    chrome.scripting.executeScript({
        target: {tabId: res.activeTabId},
        files: ['content.js']
      });
  }).catch((err) => {
    console.warn(err);
  });

  chrome.contextMenus.create({
    id: "inspectNode",
    title: "Inspect Node",
    contexts: ["editable"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "inspectNode") {
        chrome.storage.local.get(["nodeInfo"]).then((res) => {
            scrollIntoView(res.nodeInfo);
          }).catch((err) => {
            console.warn(err);
          });
    }
});

});

function scrollIntoView(nodeInfo) {
    // TODO: Scroll into view
}

function createASTTreeNode(astNode) {
    let treeLi = document.createElement('li');
    treeLi.className = "relative pl-6";

    let treeSpan = document.createElement('span');
    treeSpan.className = "relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black";
    treeSpan.textContent = `${astNode.nodeName} (Mode: ${astNode.mode}, Changed: ${astNode.hasChanged})`;
    if (astNode.prevTextContent)
    {
        treeSpan.textContent += `\nPrevious Text Content: ${astNode.prevTextContent}`;
    }
    if (astNode.textContent)
    {
        treeSpan.textContent += `\nText Content: ${astNode.textContent}`;
    }

    treeLi.appendChild(treeSpan);

    if (astNode.children && astNode.children.length > 0) {
        let childUl = document.createElement('ul');
        childUl.className = "list-none m-0 p-0";
        treeLi.appendChild(childUl);

        astNode.children.forEach(childNode => {
            childUl.appendChild(createASTTreeNode(childNode));
        });
    }

    return treeLi;
}

function resetUndoRedoTreeView() {
    const root = document.querySelector('#UndoRedo .tree-container > ul');
    root.innerHTML = '';
}

function buildUndoRedoTreeView(undoRedoData) {
    const root = document.querySelector('#UndoRedo .tree-container > ul');
    root.innerHTML = '';

    undoRedoData.forEach((stack, index) => {
        let stackLi = document.createElement('li');
        stackLi.className = "relative pl-6";

        let stackSpan = document.createElement('span');
        stackSpan.className = "relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black";
        stackSpan.textContent = `Stack ${index + 1}`;
        stackLi.appendChild(stackSpan);

        let astUl = document.createElement('ul');
        astUl.className = "list-none m-0 p-0";
        stackLi.appendChild(astUl);

        stack.forEach(astNode => {
            astUl.appendChild(createASTTreeNode(astNode));
        });

        root.appendChild(stackLi);
    });
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "inline";
    evt.currentTarget.className += " active";
  }
  
// Initial call to build the tree and start observing
updateTreeView();
injectMutationObserverScript();