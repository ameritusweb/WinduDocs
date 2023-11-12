import { RefObject } from "react";
import StackData from "./stack-data";

export interface ASTNode {
    nodeName: string;
    attributes: { [key: string]: string };
    children: ASTNode[];
    textContent?: string | null;
    hasChanged: boolean;
    hasDescendantChanged: boolean;
    depth: number;
}

export const useStack = (contentEditableRef: RefObject<HTMLDivElement>) => {

    const stackData = StackData;

    function init(div: HTMLDivElement)
    {
        stackData.stacks = Array.from(div.childNodes || []).map(() => []);
        stackData.stackHeight = -1;
    }

    function createAST(domNode: Node | Text, changedNode: Node | Text, depth = 0, parentHasChanged = false): ASTNode {
        const hasChanged = domNode === changedNode;
        let hasDescendantChanged = hasChanged || parentHasChanged;

        // Handle text nodes
        if (domNode.nodeType === Node.TEXT_NODE) {
            return {
                nodeName: '#text',
                attributes: {},
                children: [],
                textContent: domNode.textContent || '',
                hasChanged: domNode === changedNode,
                hasDescendantChanged: false,
                depth
            };
        }
    
        // Handle element nodes
        const element = domNode;
        const astNode: ASTNode = {
            nodeName: element.nodeName,
            attributes: {},
            children: [],
            textContent: null,
            hasChanged,
            hasDescendantChanged,
            depth
        };
    
        // Add attributes
        for (const attr of (element as Element).attributes) {
            astNode.attributes[attr.name] = attr.value;
        }
    
       // Recursively create AST for children
        element.childNodes.forEach(childNode => {
            const childAST = createAST(childNode, changedNode, depth + 1, hasDescendantChanged);
            astNode.children.push(childAST);
            if (childAST.hasDescendantChanged) {
                hasDescendantChanged = true;
            }
        });

        astNode.hasDescendantChanged = hasDescendantChanged;
        return astNode;
    }

    const findNodeIndex = (node: Node | Text) => {
        while (node.parentElement !== contentEditableRef.current)
        {
            node = node.parentElement as Node;
        }
        return Array.from(contentEditableRef.current?.childNodes || []).findIndex((n) => n === node);
    }

    function createSubtreeAST(changedNode: Node | Text) {
        let currentNode = changedNode;
        let ast = null;
        let currentDepth = 0;

        while (currentNode) {
            const parent = currentNode.parentNode as Node | Text;
    
            // Create AST for the current node
            const currentAST: ASTNode = {
                nodeName: currentNode.nodeName,
                attributes: {},
                children: ast ? [ast] : [], // Add previously created AST as a child
                textContent: currentNode.nodeType === Node.TEXT_NODE ? currentNode.textContent : null,
                hasChanged: currentNode === changedNode,
                hasDescendantChanged: currentNode !== changedNode,
                depth: currentDepth++
            };
    
            if (currentNode.nodeType !== Node.TEXT_NODE) {
                // Handle attributes for element nodes
                for (const attr of (currentNode as Element).attributes) {
                    currentAST.attributes[attr.name] = attr.value;
                }
            }
    
            ast = currentAST;
            currentNode = parent;
    
            // Stop if we've reached the root of the editor
            if (currentNode === contentEditableRef.current) {
                break;
            }
        }
    
        return ast;
    }    
    
    const captureState = (changedNode: Node | Text) => {
        const stateStacks = stackData.stacks;
        const stackHeight = stackData.stackHeight;
        const nodeIndex = findNodeIndex(changedNode);
        if (nodeIndex >= 0 && nodeIndex < stateStacks.length) {
            const editorRootNode = contentEditableRef.current; // Obtain the root node of the editor
            const newAST = createAST(editorRootNode?.childNodes[nodeIndex] as Node | Text, changedNode);

            let updatedStacks = [...stateStacks];
            let newStack = updatedStacks[nodeIndex].slice(0, stackHeight + 1);
            newStack.push(newAST);
            updatedStacks[nodeIndex] = newStack;
            
            stackData.stacks = updatedStacks;
            stackData.stackHeight = stackHeight + 1;
        }
    };

    const undo = () => {
        const stackHeight = stackData.stackHeight;
        const stacks = stackData.stacks;
        if (contentEditableRef.current) {
            if (stackHeight > 0 && contentEditableRef.current.childNodes.length === stacks.length) {
                let newHeight = stackHeight - 1;
                stackData.stackHeight = newHeight;

                stacks.forEach((stack, index) => {
                    if (stack.length > newHeight) {
                        const ast = stack[newHeight];
                        if (ast)
                            applyAST(ast, contentEditableRef.current!.childNodes[index]);
                    }
                });
            }
        }
    };

    const redo = () => {
        const stackHeight = stackData.stackHeight;
        const stacks = stackData.stacks;
        // Check if there's a next state to go to
        if (contentEditableRef.current) {
            if (stackHeight < stacks[0].length - 1 && contentEditableRef.current.childNodes.length === stacks.length) {
                let newHeight = stackHeight + 1;
                stackData.stackHeight = newHeight;

                stacks.forEach((stack, index) => {
                    if (stack.length > newHeight) {
                        const ast = stack[newHeight];
                        if (ast) {
                            applyAST(ast, contentEditableRef.current!.childNodes[index]);
                        }
                    }
                });
            }
        }
    };

    const applyAST = (astNode: ASTNode, domNode: Node | Text) => {
        // Handle text nodes
        if (astNode.nodeName === '#text') {
            (domNode as Text).textContent = astNode.textContent || '';
            return;
        }
    
        // Update attributes for element nodes
        if (astNode.attributes && domNode instanceof Element) {
            for (const [attrName, attrValue] of Object.entries(astNode.attributes)) {
                domNode.setAttribute(attrName, attrValue);
            }
    
            // Remove any attributes that are no longer present
            Array.from(domNode.attributes).forEach(attr => {
                if (!astNode.attributes.hasOwnProperty(attr.name)) {
                    domNode.removeAttribute(attr.name);
                }
            });
        }

        if (!astNode.hasDescendantChanged)
        {
            return;
        }
    
        // Use a document fragment for efficient updates if all children are leaf nodes
        if (astNode.hasChanged && astNode.depth === 1) {
            const fragment = document.createDocumentFragment();
            astNode.children.forEach(childAST => {
                const childDOM = createDOMNodeFromAST(childAST);
                fragment.appendChild(childDOM);
            });
            (domNode as Element).innerHTML = '';
            domNode.appendChild(fragment);
        } else {
            // Standard children update logic
            astNode.children.forEach((childAST, index) => {
                if (domNode.childNodes[index]) {
                    applyAST(childAST, domNode.childNodes[index]);
                } else {
                    // If the child doesn't exist in the DOM, create it
                    const newChild = createDOMNodeFromAST(childAST);
                    domNode.appendChild(newChild);
                }
            });
    
            // Remove any extra DOM nodes
            while (domNode.childNodes.length > astNode.children.length) {
                if (domNode.lastChild)
                    domNode.removeChild(domNode.lastChild);
            }
        }
    };
    
    const createDOMNodeFromAST = (astNode: ASTNode) => {
        if (astNode.nodeName === '#text') {
            return document.createTextNode(astNode.textContent || '');
        }
    
        const element = document.createElement(astNode.nodeName);
        for (const [name, value] of Object.entries(astNode.attributes)) {
            element.setAttribute(name, value);
        }
    
        astNode.children.forEach(childAST => {
            element.appendChild(createDOMNodeFromAST(childAST));
        });
    
        return element;
    };
    
    return {
        init,
        captureState,
        undo,
        redo
    };

}