import { EditorDataType } from "../../hooks/editor-data";
import { findFirstTextNode } from "../node-operations";

// Define the type for a function that returns the next or previous sibling
type SiblingFinder = (element: Node) => Node | null;

const findLastTextNode = (node: Text): Text | null  => {
    if (node.nodeType === Node.TEXT_NODE) {
        return node;
    }
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
        let child = node.childNodes[i];
        let textNode = findLastTextNode(child as Text);
        if (textNode) {
            return textNode;
        }
    }
    return null;
}

// Utility to check if an element is a block-level element
const isBlockLevelElement = (element: Element): boolean => {
    const blockElements: Set<string> = new Set(['DIV', 'P', 'LI', 'UL', 'OL', 'BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE']);
    return blockElements.has(element.tagName);
}

const isStartOfLine = (node: Text) => {
    // Checks if the given node is the start of a new line
    // This logic can be expanded based on specific criteria
    return !node.previousSibling || isBlockLevelElement(node.previousSibling as Element);
}

const findDeepestLastTextNode = (node: Element | Text): Text | null => {
    // Find the deepest last text node within a given node's subtree
    if (node.nodeType === Node.TEXT_NODE && node instanceof Text) {
        return node;
    }

    for (let i = node.childNodes.length - 1; i >= 0; i--) {
        let child = node.childNodes[i];
        let textNode = findDeepestLastTextNode(child as Element | Text);
        if (textNode) {
            return textNode;
        }
    }

    return null;
}

const findClosestTextNodeAtLineStart = (textNode: Text): Text => {
    let current = textNode;

    // Check if the text node is the first child or preceded by a block-level element
    if (isStartOfLine(current)) {
        return current;
    }

    // Starting with the input text node, move to its parent node
    while (current.parentNode) {
        let parent = current.parentNode;

        // Check previous siblings of the current node or its parent
        let sibling = current.previousSibling || parent.previousSibling;
        let closestTextNode = null;

        while (sibling) {
            if (isBlockLevelElement(sibling as Element)) {
                // If a block-level sibling is encountered, stop the search
                break;
            }

            // Search for the deepest text node in this sibling's subtree
            let candidateTextNode = findDeepestLastTextNode(sibling as Element);
            if (candidateTextNode) {
                closestTextNode = candidateTextNode;
            }

            sibling = sibling.previousSibling;
        }

        if (closestTextNode) {
            return closestTextNode;
        }

        // Move up to the parent node and repeat
        current = parent as any;
    }

    // If no preceding text node is found, return the original text node
    return textNode;
}

// Utility to check if an element is inside a table
const isInsideTable = (element: Node | null): boolean => {
    while (element && (element as Element).id !== 'richTextEditor') {
        if (element.nodeType === Node.ELEMENT_NODE && (element as Element).tagName === 'TABLE') {
            return true;
        }
        element = (element as Element).parentElement;
    }
    return false;
}

// Generic utility for finding a sibling row in a table
const findTableSiblingRow = (element: Element, direction: 'next' | 'previous'): Element | null => {
    let currentRow: HTMLTableRowElement | null = element.closest('tr');
    if (currentRow) {
        let siblingRow = direction === 'next' ? currentRow.nextElementSibling : currentRow.previousElementSibling;
        
        // If trying to navigate beyond the first or last row, move outside the table
        if (!siblingRow) {
            let table = currentRow.closest('table');
            return direction === 'next' ? (table?.nextElementSibling || null) : (table?.previousElementSibling || null);
        }
        return siblingRow;
    }
    return null;
}

// Generic utility for finding a line based on sibling traversal
const findSiblingLine = (startElement: Node, getSibling: SiblingFinder, isLine: (element: Element) => boolean): Node | null => {
    let currentElement: Node | null = startElement;

    while (currentElement) {
        let siblingElement: Node | null = getSibling(currentElement);

        // Traverse up through parents to find the next relevant sibling
        while (!siblingElement && currentElement.parentElement) {
            currentElement = currentElement.parentElement;
            siblingElement = getSibling(currentElement);
        }

        if (!siblingElement) return null;

        if (siblingElement.nodeType === Node.ELEMENT_NODE && isLine(siblingElement as Element)) {
            return siblingElement;
        } else if (siblingElement.nodeType === Node.TEXT_NODE && siblingElement.textContent?.includes('\n')) {
            return siblingElement;
        }

        currentElement = siblingElement;
    }

    return null;
}

// Function to find the next visible line
const findNextVisibleLine = (currentElement: Node): Node | null => {
    if (isInsideTable(currentElement)) {
        return findTableSiblingRow(currentElement as Element, 'next');
    }
    return findSiblingLine(currentElement, elem => elem.nextSibling, isBlockLevelElement);
}

// Function to find the previous visible line
const findPreviousVisibleLine = (currentElement: Node): Node | null => {
    if (isInsideTable(currentElement)) {
        return findTableSiblingRow(currentElement as Element, 'previous');
    }
    return findSiblingLine(currentElement, elem => elem.previousSibling, isBlockLevelElement);
}


const handleArrowKeyPress = (key: string, editorData: EditorDataType) => {

    const selection = window.getSelection();
    if (!selection)
    {
        return;
    }

        if (!selection.rangeCount) return;

        let range = selection.getRangeAt(0);
        let currentNode: Node | null = range.startContainer;

        const atEnd = currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent && currentNode.textContent.length > 1 && range.startOffset === (currentNode.textContent || '').length;

        if (atEnd) {
            editorData.cursorPosition = 'end';
        } else if (currentNode.textContent && currentNode.textContent.length > 1) {
            editorData.cursorPosition = 'beginning';
        }

       if (currentNode.nodeType === Node.TEXT_NODE) {
            currentNode = currentNode.parentElement;
       }

        if (!currentNode) return;

        // Find the previous or next sibling element
        let sibling: Element | Text | null = null;
        if (key === 'ArrowUp')
        {
            sibling = findPreviousVisibleLine(currentNode) as Element;
        } else
        {
            sibling = findNextVisibleLine(currentNode) as Element;
        }

        if (sibling) {
            // Place the cursor at the start or end of the sibling's text node
            range = document.createRange();
            if (editorData.cursorPosition === 'end') {
                // If cursor is at the end, move it to the end of the sibling's last text node
                let targetNode = sibling;
                while (targetNode.lastChild) {
                    targetNode = targetNode.lastChild as Element;
                }
                const textNode = findFirstTextNode(targetNode as Element);
                if (textNode) 
                {
                    range.setStart(textNode, textNode.textContent?.length || 0);
                    range.setEnd(textNode, textNode.textContent?.length || 0);
                }
                //range.selectNodeContents(targetNode);
                //range.collapse(false); // Collapse to the end
            } else {
                // Default behavior
                let targetNode = null;
                if (key === 'ArrowUp')
                {
                    targetNode = sibling;
                    while (targetNode.lastChild) {
                        targetNode = targetNode.lastChild as Element;
                    }
                    if (targetNode instanceof Text)
                    {
                        targetNode = findClosestTextNodeAtLineStart(targetNode);
                    }
                }
                const textNode = findFirstTextNode((targetNode || sibling) as Element);
                if (textNode)
                {
                    range.setStart(textNode, 0);
                    range.setEnd(textNode, 0);
                }
                //range.selectNodeContents(sibling);
                //range.collapse(true); // Collapse to the start
            }
            selection.removeAllRanges();
            selection.addRange(range);
        }

}

export default handleArrowKeyPress;