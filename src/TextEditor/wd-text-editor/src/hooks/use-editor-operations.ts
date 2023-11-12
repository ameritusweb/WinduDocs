import { RefObject } from "react";
import { useStack } from "./use-stack";

export const useEditorOperations = (contentEditableRef: RefObject<HTMLDivElement>) => {

    const {
        captureState
      } = useStack(contentEditableRef);

    const determineState = (): string =>
    {
        const selection = window.getSelection();
        if (selection)
        {
        const range = selection.getRangeAt(0);
        const container = range.startContainer;
        let element: Node | null = container;
        if (container.nodeName === '#text')
        {
            element = element.parentElement;
        }
        else if (container === contentEditableRef.current)
        {
            element = contentEditableRef.current.firstElementChild;
        }

        if (element) {
            if (element.nodeName === 'P')
            {
            return 'p';
            }
            else if (element.nodeName === 'STRONG')
            {
            return 'strong';
            }
            else if (element.nodeName === 'EM')
            {
            return 'em';
            }
            else if (element.nodeName === 'H1')
            {
            return 'h1';
            }
            else if (element.nodeName === 'H2')
            {
            return 'h2';
            }
            else if (element.nodeName === 'H3')
            {
            return 'h3';
            }
            else if (element.nodeName === 'H4')
            {
            return 'h4';
            }
            else if (element.nodeName === 'H5')
            {
            return 'h5';
            }
            else if (element.nodeName === 'H6')
            {
            return 'h6';
            }
        }
        
        }

        return '';
    }

    const focusOnNode = (editor: HTMLDivElement, node: Node, key: string, offset?: number) => {
        const range = new Range();
            if (offset)
            {
                range.setStart(node, offset + 1);
                range.setEnd(node, offset + 1);
            }
            else
            {
                    range.setStartAfter(node);
                    range.setEndAfter(node);
            }

            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);

            captureState(node, key);

            editor.focus();
    }

    const splitAndInsertNode = (textNode: Text, h1Node: Node, splitIndex: number) => {
        // Ensure that the textNode is actually a text node
        if (textNode.nodeType !== Node.TEXT_NODE) {
            return;
        }

        // Extract text and split based on index
        const textContent = textNode.textContent;
        if (!textContent)
        {
        return;
        }
        const beforeText = textContent.substring(0, splitIndex);
        const afterText = textContent.substring(splitIndex);

        // Get parent node for insertion
        const parentNode = textNode.parentNode;
        if (!parentNode) {
            return;
        }

        // Create a document fragment
        const fragment = document.createDocumentFragment();

        // Add new nodes to the fragment
        if (beforeText) {
            fragment.appendChild(document.createTextNode(beforeText));
        }

        fragment.appendChild(h1Node);

        if (afterText) {
            fragment.appendChild(document.createTextNode(afterText));
        }

        // Replace the original text node with the fragment
        parentNode.replaceChild(fragment, textNode);
    }

    const validateParent = (state: string, parentState: string) => {
    if (state === 'h1') {
        if (parentState === 'p')
        {
        return false;
        }
    }
    else if (state === 'strong')
    {
        if (parentState === 'em')
        {
        return false;
        }
    }
    else if (state === 'em')
    {
        if (parentState === 'strong')
        {
        return false;
        }
    }
    return true;
    }

    return {
        determineState,
        focusOnNode,
        splitAndInsertNode,
        validateParent
      };
}