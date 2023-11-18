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
    const blockElements: Set<string> = new Set(['DIV', 'P', 'LI', 'OL', 'UL', 'BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE']);
    return blockElements.has(element.tagName);
}

const isStartOfLine = (node: Text) => {
    // Checks if the given node is the start of a new line
    // This logic can be expanded based on specific criteria
    return !node.previousSibling || isBlockLevelElement(node.previousSibling as Element);
}

const findRootChild = (element: Node): Element => {

    while (element.parentElement?.id !== 'richTextEditor')
    {
        element = element.parentElement as Node;
    }

    return element as Element;

}

const findTextNodeBeforeNewLine = (element: Element | Text, stopId: string): Text | null => {
    let lastTextNode: Text | null = null;

    function* traverse(node: Node | null): Generator<Text | null> {
        while (node && (node as Element).id !== stopId) {
            if (node.nodeType === Node.TEXT_NODE) {
                const textNode = node as Text;
                if (textNode.nodeValue === '\n') {
                    if (lastTextNode) 
                        yield lastTextNode;
                    else
                        yield null;
                    return; // Stop after finding the newline
                }
                lastTextNode = textNode; // Keep updating the last text node
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                yield* traverse(node.firstChild);
            }

            if (node.nextSibling && (node.nextSibling.parentNode as Element).id !== stopId)
            {
                node = node.nextSibling;
            }
            else
            {
                node = ((node.parentNode?.parentNode as Element).id !== stopId ? node.parentNode?.nextSibling : null) as Node;
            }
        }
    }

    for (const textNode of traverse(element)) {
        return textNode; // Returns the tracked text node before the newline
    }
    return null;
}


const findTextNodeAfterNewLine = (element: Element | Text, stopId: string) => {
    let foundNewLine = false;

    function* traverse(node: Element | Text | null): any {
        while (node && (node as Element).id !== stopId) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue === '\n') {
                    foundNewLine = true;
                } else if (foundNewLine) {
                    yield node;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                yield* traverse(node.firstChild as Element);
            }

            // Move to the next sibling or ascend the tree
            if (node.nextSibling) {
                node = node.nextSibling as Element;
            } else {
                // Ascend and find the next sibling
                do {
                    node = node.parentNode as Element;
                    if (node && node.parentNode && (node.parentNode as Element).id === stopId) {
                        return; // Stop the search if we reach the stopId
                    }
                } while (node && !node.nextSibling);

                node = node ? node.nextSibling as Element : null;
            }
        }
    }

    for (let textNode of traverse(element)) {
        return textNode;
    }
    return null;
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

    if (!current.previousSibling && current.parentElement && current.parentElement.parentElement && current.parentElement.parentElement.id === 'richTextEditor')
    {
        return current;
    }

    // Check if the text node is the first child or preceded by a block-level element
    /*
    if (isStartOfLine(current)) {
        return current;
    }
    */

    // Starting with the input text node, move to its parent node
    while (current.parentNode) {
        let parent = current.parentNode;

        // Check previous siblings of the current node or its parent
        let sibling = current.previousSibling || parent.previousSibling;
        let closestTextNode = null;

        while (sibling) {
            if (isBlockLevelElement(sibling as Element)) {
                if (sibling.parentElement && sibling.parentElement.id === 'richTextEditor')
                {
                    return textNode;
                }
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

const findLineInElementOrDescendants = (
    element: Node, 
    isLine: any
): Node | null => {
    if (element.nodeType === Node.ELEMENT_NODE && isLine(element as Element)) {
        return element;
    } else if (element.nodeType === Node.TEXT_NODE && element.textContent?.includes('\n')) {
        if (element.nextSibling && element.textContent.length === 1)
        {
            return element.nextSibling;
        }
        return element;
    }

    if (element.hasChildNodes()) {
        for (let child of element.childNodes) {
            const lineElement = findLineInElementOrDescendants(child, isLine);
            if (lineElement) return lineElement;
        }
    }

    return null;
};

// Generic utility for finding a line based on sibling traversal
const findSiblingLine = (startElement: Node, getSibling: SiblingFinder, isLine: (element: Element) => boolean): Node | null => {
    let currentElement: Node | null = startElement;

    while (currentElement) {
        let siblingElement: Node | null = getSibling(currentElement);

        while (!siblingElement && currentElement.parentElement && currentElement.parentElement.id !== 'richTextEditor') {
            currentElement = currentElement.parentElement;
            siblingElement = getSibling(currentElement);
        }

        if (!siblingElement) return null;

        const lineElement = findLineInElementOrDescendants(siblingElement, isLine);
        if (lineElement)
        {
            return lineElement;
        } 
        currentElement = siblingElement;
    }

    return null;
}

// Function to find the next visible line
const findNextVisibleLine = (currentElement: Node): Node | null => {
    return findSiblingLine(currentElement, elem => elem.nextSibling, isBlockLevelElement);
}

// Function to find the previous visible line
const findPreviousVisibleLine = (currentElement: Node): Node | null => {
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

        let atEnd = currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent && currentNode.textContent.length > 1 && range.startOffset === (currentNode.textContent || '').length;

        if (atEnd) {
            editorData.cursorPosition = 'end';
        } else if (currentNode.textContent && currentNode.textContent.length > 1) {
            editorData.cursorPosition = 'beginning';
        } else {
            atEnd = editorData.cursorPosition === 'end';
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
            if (atEnd)
            {
                if ((currentNode as Element).className != 'blank-line' && currentNode.textContent?.includes('\n'))
                {
                    const beforeNewLine = findTextNodeBeforeNewLine(range.startContainer as Text, 'richTextEditor') as Text | null;
                    if (!beforeNewLine || beforeNewLine === range.startContainer)
                    {
                        sibling = findTextNodeAfterNewLine(range.startContainer as Text, 'richTextEditor') as Text | null;
                        if (sibling === null)
                            sibling = findNextVisibleLine(range.startContainer) as Element;
                    }
                    else
                    {
                        sibling = beforeNewLine;
                    }
                    const aa = 1;
                }
                else
                {
                    sibling = findNextVisibleLine(currentNode) as Element;
                    const beforeNewLine = findTextNodeBeforeNewLine(sibling, 'richTextEditor') as Text | null;
                    if (beforeNewLine)
                        sibling = beforeNewLine;
                }
            } else {
                sibling = findTextNodeAfterNewLine(range.startContainer as Text, 'richTextEditor') as Text | null;
                if (sibling === null) {
                    sibling = findNextVisibleLine(currentNode) as Element;
                }
            }
        }

        if (sibling) {
            // Place the cursor at the start or end of the sibling's text node
            range = document.createRange();
            if (editorData.cursorPosition === 'end') {
                // If cursor is at the end, move it to the end of the sibling's last text node
                let targetNode = sibling;
                while (targetNode.lastChild && !isBlockLevelElement(targetNode.lastChild as Element)) {
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