const findClosestAncestor = (element: Element, targetParentId: string) => {

    if (element.parentElement && element.parentElement.id === targetParentId)
    {
        return element;
    }

    // Check if the current element is valid and not the root element.
    while (element && element.id !== targetParentId && element.parentNode) {
        // Move up to the parent node.
        element = element.parentNode as Element;

        // Check if the parent of the current element has the targetParentId.
        if (element.parentNode && (element.parentNode as Element).id === targetParentId) {
            return element;
        }
    }
    // Return null if the target parent ID is not found in the ancestor hierarchy.
    return undefined;
}

export default findClosestAncestor;