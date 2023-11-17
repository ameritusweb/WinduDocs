const findFirstTextNode = (element: Element): Text | null => {
    // Iterate through all child nodes of the element
    for (const node of element.childNodes) {
        // If the node is a text node, return it
        if (node.nodeType === Node.TEXT_NODE) {
            return node as Text;
        }

        // If the node is an element, search its children recursively
        if (node.nodeType === Node.ELEMENT_NODE) {
            const result = findFirstTextNode(node as Element);
            if (result) {
                return result;
            }
        }
    }

    // No text node found in this branch of the DOM
    return null;
}

export default findFirstTextNode;