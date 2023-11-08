  export const isAtEnd = (contentEditableRef: React.RefObject<HTMLDivElement>, selection: Selection): boolean => {
    const range = selection.getRangeAt(0);

    // Get content length
    const content = contentEditableRef.current!.textContent;
    const length = content?.length;
    
    // Check if cursor at end
    return range.startOffset === length;
  }
  