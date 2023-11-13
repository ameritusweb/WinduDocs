import { RefObject } from "react";
import StackData from "./stack-data";

export interface ASTNode {
    nodeName: string;
    attributes: { [key: string]: string };
    children: ASTNode[];
    childIndex?: number;
    prevTextContent?: string | null;
    textContent?: string | null;
    mode: string;
    hasChanged: boolean;
    hasDescendantChanged: boolean;
    depth: number;
}

export const useStack = (contentEditableRef: RefObject<HTMLDivElement>) => {

    const stackData = StackData;

    const init = (div: HTMLDivElement) =>
    {
        stackData.stacks = Array.from(div.childNodes || []).map(() => []);
        stackData.stackHeight = 0;
    }

    const preState = (content: string) => {
        stackData.preState = content;
    }

    const lastCharacter = (character: string) => {
        stackData.lastCharacter = character;
    }

    const createSubtreeAST = (changedNode: Node | Text) => {
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
                mode: 'undo',
                depth: currentDepth++
            };
    
            if (currentNode.nodeType !== Node.TEXT_NODE) {
                // Handle attributes for element nodes
                for (const attr of (currentNode as Element).attributes) {
                    currentAST.attributes[attr.name] = attr.value;
                }
            }
            else if (currentAST.hasChanged) {
                currentAST.prevTextContent = stackData.preState;
                stackData.lastChangedAST = currentAST;
            }
    
            ast = currentAST;

            // Stop if we've reached the root of the editor
            if (parent === contentEditableRef.current) {
                ast.childIndex = Array.from(contentEditableRef.current.childNodes).findIndex((n) => n === currentNode);
                break;
            }

            currentNode = parent;
        }
    
        return ast;
    }

    const isMergeable = (character: string) => {
        if (character === 'Backspace')
        {
            return true;
        }

        if (character === ' ' && stackData.lastCharacter !== '')
        {
            return false;
        }
        
        if (character === '\n')
        {
            return false;
        }

        return true;
    }
    
    const captureState = (changedNode: Node | Text, character: string) => {
        const stateStacks = stackData.stacks;
        const stackHeight = stackData.stackHeight;
        if (stackData.lastNode === changedNode && stackData.lastChangedAST !== null && isMergeable(character))
        {
            stackData.lastChangedAST.textContent = changedNode.textContent;
        }
        else
        {
            const newAST = createSubtreeAST(changedNode as Node | Text);
            const nodeIndex = newAST?.childIndex || 0;
            const updatedStacks = [...stateStacks];
            const newStack = updatedStacks[nodeIndex].slice(0, stackHeight + 1);
            newStack.push(newAST!);
            updatedStacks[nodeIndex] = newStack;
            
            stackData.stacks = updatedStacks;
            stackData.stackHeight = stackHeight + 1;
            if (stackData.stackHeight > stackData.maxStackHeight)
            {
                stackData.maxStackHeight = stackData.stackHeight;
            }
        }
        if (changedNode.nodeName === '#text')
        {
            stackData.lastNode = changedNode as Text;
            stackData.lastCharacter = character;
        }

        const message = Object.assign({}, stackData);
        message.lastNode = null;
        window.postMessage(message, "*");
    };

    const undo = () => {
        const stackHeight = stackData.stackHeight;
        const stacks = stackData.stacks;
        if (contentEditableRef.current) {
            if (stackHeight > 0 && contentEditableRef.current.childNodes.length === stacks.length) {
                const newHeight = stackHeight - 1;
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
        const maxStackHeight = stackData.maxStackHeight;
        // Check if there's a next state to go to
        if (contentEditableRef.current) {
            if (stackHeight < maxStackHeight && contentEditableRef.current.childNodes.length === stacks.length) {

                stacks.forEach((stack, index) => {
                    if (stack.length > stackHeight) {
                        const ast = stack[stackHeight];
                        if (ast) {
                            applyAST(ast, contentEditableRef.current!.childNodes[index]);
                        }
                    }
                });

                const newHeight = stackHeight + 1;
                stackData.stackHeight = newHeight;
            }
        }
    };

    const applyAST = (astNode: ASTNode, domNode: Node | Text) => {
        // Handle text nodes
        if (astNode.nodeName === '#text') {
            if (astNode.mode === 'undo')
            {
                (domNode as Text).textContent = astNode.prevTextContent || '';
                astNode.mode = 'redo';
            }
            else
            {
                (domNode as Text).textContent = astNode.textContent || '';
                astNode.mode = 'undo';
            }
            return;
        }
    
        // Update attributes for element nodes
        if (astNode.attributes && domNode instanceof Element) {
            for (const [attrName, attrValue] of Object.entries(astNode.attributes)) {
                domNode.setAttribute(attrName, attrValue);
            }
    
            // Remove any attributes that are no longer present
            Array.from(domNode.attributes).forEach(attr => {
                if (!Object.prototype.hasOwnProperty.call(astNode.attributes, attr.name)) {
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
        preState,
        lastCharacter,
        captureState,
        undo,
        redo
    };
}