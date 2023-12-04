  export const isAtEnd = (contentEditableRef: React.RefObject<HTMLDivElement>, selection: Selection): boolean => {
    const range = selection.getRangeAt(0);

    
    const content = contentEditableRef.current!.textContent;
    const length = content?.length;
    
    
    return range.startOffset === length;
  }
  