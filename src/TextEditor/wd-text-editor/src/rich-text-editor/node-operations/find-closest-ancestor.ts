const findClosestAncestor = (element: Element, targetParentId: string) => {

    if (element.parentElement && element.parentElement.id === targetParentId)
    {
        return element;
    }

    
    while (element && element.id !== targetParentId && element.parentNode) {
        
        element = element.parentNode as Element;

        
        if (element.parentNode && (element.parentNode as Element).id === targetParentId) {
            return element;
        }
    }
    
    return undefined;
}

export default findClosestAncestor;