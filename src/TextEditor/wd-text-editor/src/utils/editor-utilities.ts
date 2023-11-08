export const removeZeroWidthSpaces = (contentEditableRef: React.RefObject<HTMLDivElement>) => {
    if (contentEditableRef.current && contentEditableRef.current.childNodes && contentEditableRef.current.childNodes.length > 0)
    {
      const node = contentEditableRef.current.childNodes[contentEditableRef.current.childNodes.length - 1];
      if (node.nodeValue === '' && !node.nodeValue?.includes('\u200B')) {
        contentEditableRef.current.removeChild(node);
      }
    }

    if (contentEditableRef.current && contentEditableRef.current.childNodes && contentEditableRef.current.childNodes.length > 0)
      {
        const node = contentEditableRef.current.childNodes[contentEditableRef.current.childNodes.length - 1];
        if (node.nodeValue?.includes('\u200B')) {
          contentEditableRef.current.removeChild(node);
        }
      }
  };
  
  export const isAtEnd = (contentEditableRef: React.RefObject<HTMLDivElement>, selection: Selection): boolean => {
    const range = selection.getRangeAt(0);

    // Get content length
    const content = contentEditableRef.current!.textContent;
    const length = content?.length;
    
    // Check if cursor at end
    return range.startOffset === length;
  }
  