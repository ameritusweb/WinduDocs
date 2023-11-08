import { RefObject, useState } from 'react';
import { isAtEnd } from '../utils/editor-utilities';

// Custom hook for managing text operations
export const useTextOperations = (contentEditableRef: RefObject<HTMLDivElement>) => {
  const [code, setCode] = useState<string>('');

  const createFragment = (html: string) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
        // Skip empty text nodes
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
      range.deleteContents(); // Delete any selected text
  
      // Insert the HTML fragment
      const fragment = createFragment(text);
      range.insertNode(fragment.frag!);

      // Preserve the selection
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
      // Delete selected text
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
            console.log(node);
            const prev = node.previousSibling;
            const removePrev = node.nodeValue?.includes('\u200B');
            contentEditableRef.current.removeChild(node);
            isRemoved = true;
            if (removePrev)
            {
                if (prev)
                {
                    console.log(prev);
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
                console.log(prev);
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
          console.log(range.startContainer);
          contentEditableRef.current!.removeChild(range.startContainer);
          if (prev)
          {
            console.log(prev);
            contentEditableRef.current!.removeChild(prev);
          }
        }
        else
        {
            console.log(range.startContainer);
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
      // Insert placeholder for new line which will be replaced in the overlay
    insertTextAtCursor('\n');
    insertTextAtCursor('\u200B'); // Include a zero-width space after the <br> to ensure it gets rendered
  };

  const handleTab = () => {
    insertTextAtCursor('    '); // Insert four spaces for a tab
  };

  const handlePaste = (text: string) => {

        // Split text into an array of characters
        const chars = text.split('');

        // Create a document fragment to build DOM
        const docFrag = document.createDocumentFragment();
    
        // Create a text node for each character
        for(const char of chars) {
          const node = document.createTextNode(char);
          docFrag.appendChild(node);
        }
    
        // Create text nodes for new lines 
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

      // Get the text that would have been cut
      const text = range.toString(); 

      // Set clipboard data
      event.clipboardData.setData('text/plain', text);

      // Delete selected content
      range.deleteContents();

      cleanupStart(contentEditableRef);
    }
  };

  const handleDefault = (event: React.KeyboardEvent<HTMLDivElement>) => {
    insertTextAtCursor(event.key, true);
  }

  const findEmptyTextNodes = (div: HTMLDivElement): Node[] | undefined => {
    // Get the div element by its ID
    if (!div) {
      console.error('Div not found');
      return;
    }
  
    // Create a TreeWalker to traverse text nodes only
    const walker = document.createTreeWalker(
      div,
      NodeFilter.SHOW_TEXT, // filter to only consider text nodes
      {
        acceptNode: (node: Node & Text) => {
          // Custom filter function to only accept nodes that are empty or have a length of zero
          return node.length === 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
  
    // Use an array to collect the empty text nodes
    const emptyTextNodes: Node[] = [];
    
    // Traverse the TreeWalker
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
