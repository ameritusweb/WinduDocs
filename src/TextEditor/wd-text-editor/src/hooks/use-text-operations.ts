import { RefObject, useState } from 'react';
import { isAtEnd } from '../utils/editor-utilities';


export const useTextOperations = (contentEditableRef: RefObject<HTMLDivElement>) => {
  const [code, setCode] = useState<string>('');

  const createFragment = (html: string) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
        
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.length === 0) {
        el.removeChild(node);
        continue;
      }
      lastNode = frag.appendChild(node);
    }
    return {frag, lastNode};
  }

  const insertTextAtCursor = (text: string, removeZeroWidthSpace?: boolean) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let range = sel.getRangeAt(0);
      range.deleteContents(); 
  
      
      const fragment = createFragment(text);
      range.insertNode(fragment.frag!);

      
      if (fragment.lastNode) {

        if (removeZeroWidthSpace && fragment.lastNode.previousSibling && fragment.lastNode.previousSibling.nodeValue?.includes('\u200B'))
        {
            if (contentEditableRef.current)
                contentEditableRef.current?.removeChild(fragment.lastNode.previousSibling);
        }

        range = range.cloneRange();
        range.setStartAfter(fragment.lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const cleanupStart = (contentEditableRef: React.RefObject<HTMLDivElement>) => {
    if (contentEditableRef.current)
        {
          while (contentEditableRef.current.childNodes.length > 0 && contentEditableRef.current.lastChild && (!contentEditableRef.current.lastChild.textContent || contentEditableRef.current.lastChild.textContent.length === 0 || contentEditableRef.current.lastChild.nodeValue?.includes('\u200B')))
          {
            contentEditableRef.current.removeChild(contentEditableRef.current.lastChild);
          }
          if (contentEditableRef.current.childNodes.length === 0)
          {
            insertTextAtCursor('\u200B');
          }
        }
  }

  const handleBackspace = () => {
    const selection = window.getSelection();
    if (selection && selection.toString() && selection.type === 'Range') {
      
      selection.deleteFromDocument();
      cleanupStart(contentEditableRef);
      setCode(contentEditableRef.current?.innerHTML || '');
      return;
    }
    if (selection && !isAtEnd(contentEditableRef, selection)) {

      const range = selection.getRangeAt(0);
      let isRemoved = false;
      if (range.startContainer === contentEditableRef.current)
      {
        const node = contentEditableRef.current.childNodes[range.startOffset - 1];
        if (node && node instanceof Node)
        {
            const prev = node.previousSibling;
            const removePrev = node.nodeValue?.includes('\u200B');
            contentEditableRef.current.removeChild(node);
            isRemoved = true;
            if (removePrev)
            {
                if (prev)
                {
                    contentEditableRef.current!.removeChild(prev);
                }
            }
        }
        else
        {
            console.warn('not a Node');
            console.warn(node);
        }
      }
      else if (range.startOffset > 0) {
        range.setStart(range.startContainer, range.startOffset - 1);
        const content = '' + (range.startContainer.nodeValue || '');
        if (typeof content === 'string' && (content.length === 0 || content.includes('\u200B')))
        {
            const prev = range.startContainer.previousSibling;
            contentEditableRef.current!.removeChild(range.startContainer);
            if (prev)
            {
                contentEditableRef.current!.removeChild(prev);
            }
        }
        else
        {
            contentEditableRef.current!.removeChild(range.startContainer);
        }
        isRemoved = true;
      }
      else
      {
        if (range.startContainer.textContent?.length === 0)
        {
          const prev = range.startContainer.previousSibling;
          contentEditableRef.current!.removeChild(range.startContainer);
          if (prev)
          {
            contentEditableRef.current!.removeChild(prev);
          }
        }
        else
        {
          contentEditableRef.current!.removeChild(range.startContainer);
        }
        isRemoved = true;
      }

      if (!isRemoved)
      {
        console.warn('was not removed');
        console.warn(range);
        console.warn(selection);
      }

      cleanupStart(contentEditableRef);
      setCode(contentEditableRef.current?.innerHTML || '');

      return;
    }
    if (contentEditableRef.current)
    {
      while (contentEditableRef.current.childNodes.length > 1 && contentEditableRef.current.lastChild && (!contentEditableRef.current.lastChild.textContent || contentEditableRef.current.lastChild.textContent.length === 0 || contentEditableRef.current.lastChild.nodeValue?.includes('\u200B')))
      {
        contentEditableRef.current.removeChild(contentEditableRef.current.lastChild);
      }

      if (contentEditableRef.current.childNodes.length === 1)
      {
        contentEditableRef.current.removeChild(contentEditableRef.current.lastChild!);
        insertTextAtCursor('\u200B');
        setCode(contentEditableRef.current?.innerHTML || '');
        return;
      }

      if (contentEditableRef.current.lastChild && contentEditableRef.current.childNodes.length > 1) {
          contentEditableRef.current.removeChild(contentEditableRef.current.lastChild);
      }

      if (contentEditableRef.current.lastChild && contentEditableRef.current.lastChild?.nodeValue === '\n') {
        insertTextAtCursor('\u200B');
      }

      setCode(contentEditableRef.current?.innerHTML || '');
    }
  };

  const handleEnter = () => {
      
    insertTextAtCursor('\n');
    insertTextAtCursor('\u200B'); 
  };

  const handleTab = () => {
    insertTextAtCursor('    '); 
  };

  const handlePaste = (text: string) => {

        
        const chars = text.split('');

        
        const docFrag = document.createDocumentFragment();
    
        
        for(const char of chars) {
          const node = document.createTextNode(char);
          docFrag.appendChild(node);
        }
    
        
        const lines = text.split('\n');
        lines.forEach(line => {
          if (line) {
            docFrag.appendChild(document.createTextNode('\n'));  
          }
        });
    
        contentEditableRef.current!.appendChild(docFrag);

  };

  const handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {

    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);

      
      const text = range.toString(); 

      
      event.clipboardData.setData('text/plain', text);

      
      range.deleteContents();

      cleanupStart(contentEditableRef);
    }
  };

  const handleDefault = (event: React.KeyboardEvent<HTMLDivElement>) => {
    insertTextAtCursor(event.key, true);
  }

  const findEmptyTextNodes = (div: HTMLDivElement): Node[] | undefined => {
    
    if (!div) {
      console.error('Div not found');
      return;
    }
  
    
    const walker = document.createTreeWalker(
      div,
      NodeFilter.SHOW_TEXT, 
      {
        acceptNode: (node: Node & Text) => {
          
          return node.length === 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
  
    
    const emptyTextNodes: Node[] = [];
    
    
    let node: Node | null;
    while (node = walker.nextNode()) {
      emptyTextNodes.push(node);
    }
  
    return emptyTextNodes;
  };

  const removeEmptyTextNodes = () => {
    if (contentEditableRef.current) {
        const nodes = findEmptyTextNodes(contentEditableRef.current);
        if (nodes && nodes.length > 0)
        {
            while (nodes.length)
            {
                const node = nodes.pop();
                if (node)
                {
                    contentEditableRef.current.removeChild(node);
                }
            }
        }
    }
  }

  return {
    code,
    setCode,
    findEmptyTextNodes,
    removeEmptyTextNodes,
    createFragment,
    insertTextAtCursor,
    handleBackspace,
    handleEnter,
    handleTab,
    handleDefault,
    handlePaste,
    handleCut
  };
};
