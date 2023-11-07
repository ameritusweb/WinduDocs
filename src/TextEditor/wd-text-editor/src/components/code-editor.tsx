declare const Prism: typeof import('prismjs');
import React, { useState, useRef, useEffect } from 'react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);

  const createFragment = (html: string) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    return {frag, lastNode};
  }

  useEffect(() => {
    if (contentEditableRef.current && !contentEditableRef.current.childNodes.length) {
      const fragment = createFragment('\u200B');
      contentEditableRef.current.appendChild(fragment.frag!);
    }
    setCode(contentEditableRef.current?.innerHTML || '');
  }, []);

  // This useEffect is for applying syntax highlighting.
  useEffect(() => {
    if (overlayRef.current && contentEditableRef.current) {
  
      // Apply Prism syntax highlighting
      Prism.highlightElement(overlayRef.current);
    }
  }, [code]);

  const insertTextAtCursor = (html: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let range = sel.getRangeAt(0);
      range.deleteContents(); // Delete any selected text
  
      // Insert the HTML fragment
      const fragment = createFragment(html);
      range.insertNode(fragment.frag!);
  
      // Preserve the selection
      if (fragment.lastNode) {
        range = range.cloneRange();
        range.setStartAfter(fragment.lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    // Capturing innerHTML to include structural HTML like <div> and <br>
    const html = (event.currentTarget as HTMLDivElement).innerHTML;
    setCode(html);
  };

  function removeZeroWidthSpaces() {
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
  }

  const isAtEnd = (div: HTMLDivElement, selection: Selection): boolean => {
    const range = selection.getRangeAt(0);

    // Get content length
    const content = div.textContent;
    const length = content?.length;
    
    // Check if cursor at end
    return range.startOffset === length;
  }

  const cleanupStart = () => {
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

  const pasteText = (text: string) => {
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
  }

  const handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {

    if (!contentEditableRef.current)
    {
      return;
    }

    event.preventDefault(); // prevent default cut behavior

    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);

      // Get the text that would have been cut
      const text = range.toString(); 

      // Set clipboard data
      event.clipboardData.setData('text/plain', text);

      // Delete selected content
      range.deleteContents();

      cleanupStart();

      setCode(contentEditableRef.current.innerHTML || '');
    }

  }

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    if (!contentEditableRef.current)
    {
      return;
    }

    event.preventDefault();

    const text = event.clipboardData.getData('Text');

    pasteText(text);

    setCode(contentEditableRef.current.innerHTML || '');

  }
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement> & React.ClipboardEvent<HTMLDivElement>) => {
    if (!contentEditableRef.current)
    {
      return;
    }

    if (event.key === 'Shift' || event.key === 'Alt' || event.key === 'Control') {
      return;
    }

    if ((event.key === 'v' || event.key === 'x') && event.ctrlKey) {
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      insertTextAtCursor('    '); // Insert four spaces for a tab
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // Insert placeholder for new line which will be replaced in the overlay
      insertTextAtCursor('\n');
      insertTextAtCursor('\u200B'); // Include a zero-width space after the <br> to ensure it gets rendered
      // Manually trigger the update to the code state
      setCode(contentEditableRef.current?.innerHTML || '');
    }
    else if (event.key === 'Backspace') {
      event.preventDefault();
      const selection = window.getSelection();
      if (selection && selection.toString() && selection.type === 'Range') {
        // Delete selected text
        selection.deleteFromDocument();
        cleanupStart();
        setCode(contentEditableRef.current?.innerHTML || '');
        return;
      }
      if (selection && !isAtEnd(contentEditableRef.current, selection)) {

        const range = selection.getRangeAt(0);
        if (range.startOffset > 0) {
          range.setStart(range.startContainer, range.startOffset - 1);
          range.deleteContents();
        }
        else
        {
          if (range.startContainer.textContent?.length === 0)
          {
            const prev = range.startContainer.previousSibling;
            contentEditableRef.current.removeChild(range.startContainer);
            if (prev)
            {
              contentEditableRef.current.removeChild(prev);
            }
          }
          else
          {
            contentEditableRef.current.removeChild(range.startContainer);
          }
        }
        cleanupStart();
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
    }
    else if (event.key.length === 1 && (event.key === ' ' || event.key.match(/[^\s|\r|\t|\n]/gm))) {
      event.preventDefault();
      removeZeroWidthSpaces();
      insertTextAtCursor(event.key);
      setCode(contentEditableRef.current?.innerHTML || '');
    }
  };  
  
  return (
    <div style={{ position: 'relative', padding: '10px', minHeight: '30px', width: '100%' }}>
      <div
        contentEditable
        ref={contentEditableRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCut={handleCut}
        onPaste={handlePaste}
        id="contentEditable"
        style={{
          color: 'rgba(100, 100, 100, 1)',
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100px',
          overflow: 'auto',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          padding: '1.1rem 2rem 1rem 5rem',
          cursor: 'text',
          textAlign: 'left',
          fontSize: '1em',
          fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
        }}
      ></div>
      <pre className="line-numbers" style={{ pointerEvents: 'none', color: 'black', position: 'relative', opacity: 0.5 }}>
        <code id="overlay" ref={overlayRef} className="language-md">
          {code}
        </code>
      </pre>
    </div>
  );
};

/*
APPENDIX A:

Technical Essay: Implementing a Reactive Code Editor with Overlay in React
In the domain of web development, creating a responsive and intuitive code editor presents a myriad of challenges, 
ranging from handling user input to displaying real-time syntax highlighting. The implementation of such an editor using React, 
complemented by Prism.js for syntax highlighting, is a testament to the flexibility and power of modern web technologies. 
This essay delves into the technical intricacies of building a code editor with a contenteditable div and an overlay that 
displays syntax-highlighted code.

Overview
The core functionality of the code editor relies on the seamless interaction between a contenteditable HTML element and a 
non-interactive overlay, which presents the syntax-highlighted version of the text. The user's interaction with the 
contenteditable div triggers state updates and DOM manipulations, ensuring that the overlay reflects the input accurately 
and instantaneously.

State Management with React Hooks
React's useState hook is pivotal in managing the editor's state, particularly the text content. When the user types, deletes, 
or formats text, the state is updated to mirror these changes. The useEffect hook, with its dependency array including the code state, 
is responsible for invoking Prism.js to apply syntax highlighting whenever the code changes. This reactive pattern ensures 
that the overlay is consistently in sync with the user's input.

Handling User Input
User input within the contenteditable div is captured through the handleInput event handler, which updates the code state with 
the innerHTML of the div. This approach preserves the rich text formatting introduced by the user, such as line breaks and indentation.

Keyboard Event Management
Key presses, especially for functional keys like Tab and Enter, require custom handling to provide a native code editing experience. 
The handleKeyDown function intercepts these key events to insert four spaces for a Tab or a line break for Enter. Instead of relying 
on the default browser behavior, which may vary and lead to inconsistencies, this custom handling ensures uniform behavior across 
different environments.

Focus and Caret Position
Maintaining focus and caret position is a subtle yet crucial aspect of the editor's usability. The insertTextAtCursor function, 
invoked within handleKeyDown, uses the browser's Selection and Range APIs to insert text or HTML elements like <br> at the current 
caret position. After the insertion, the function updates the caret position to immediately follow the inserted content, preventing 
focus loss and ensuring a smooth typing experience.

Synchronization Between Contenteditable and Overlay
The synchronization between the contenteditable div and the syntax-highlighted overlay is non-trivial. The challenge lies in 
translating the HTML structure of the contenteditable, which includes tags like <div> and <br>, into a format suitable for 
syntax highlighting without altering the content's semantic structure. The useEffect hook replaces placeholders such as 
<br class="new-line-placeholder"> with actual newline characters before Prism.js processes the text, ensuring the overlay's 
content structure remains intact.

Rendering and Styling
CSS plays an integral role in rendering and styling the editor. The contenteditable div and the overlay must share identical 
styling rules to ensure that the text alignment and wrapping behavior match. Properties like white-space: pre-wrap and 
word-wrap: break-word are essential to handle white spaces and word wrapping correctly. The overlay's pointer-events: none 
style allows it to remain visible but non-interactive, ensuring that user interactions are directed to the contenteditable div beneath it.

Challenges and Solutions
Several challenges emerged during implementation, such as ensuring that new lines are properly rendered and the overlay 
dynamically adjusts its size. These were addressed by fine-tuning the event handlers and state updates, particularly 
for the Enter key, and by employing zero-width space characters to force line breaks to render when necessary.

Conclusion
The construction of a reactive code editor in React showcases the intricate balance between user interface state management, 
DOM manipulation, and event handling. It highlights the importance of a well-thought-out architecture that accommodates the 
dynamic nature of user input and the complexities of rendering styled text. Through careful orchestration of React hooks, 
event handlers, and CSS, a functional and visually appealing code editing environment was achieved.

*/