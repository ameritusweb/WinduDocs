const findLastTextNode = (element: Element): Text | null => {
    // Iterate through all child nodes of the element in reverse order
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
        const node = element.childNodes[i];

        // If the node is a text node, return it
        if (node.nodeType === Node.TEXT_NODE) {
            return node as Text;
        }

        // If the node is an element, search its children recursively
        if (node.nodeType === Node.ELEMENT_NODE) {
            const result = findLastTextNode(node as Element);
            if (result) {
                return result;
            }
        }
    }

    // No text node found in this branch of the DOM
    return null;
}

export default findLastTextNode;