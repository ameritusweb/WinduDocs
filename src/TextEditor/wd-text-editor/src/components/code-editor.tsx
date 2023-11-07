declare var Prism: typeof import('prismjs');
import React, { useState, useRef, useEffect } from 'react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);

  // This useEffect is for applying syntax highlighting.
  useEffect(() => {
    if (overlayRef.current && contentEditableRef.current) {
      const codeWithLineBreaks = code
        .replace(/<br class="new-line-placeholder">/g, '\n'); // Replace placeholder with newline character
  
      // Set innerHTML of overlay to code with line breaks
      overlayRef.current.innerHTML = codeWithLineBreaks;
  
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
      const el = document.createElement("div");
      el.innerHTML = html;
      let frag = document.createDocumentFragment(), node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
  
      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
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
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      insertTextAtCursor('    '); // Insert four spaces for a tab
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // Insert placeholder for new line which will be replaced in the overlay
      insertTextAtCursor('<br class="new-line-placeholder">\u200B'); // Include a zero-width space after the <br> to ensure it gets rendered
      // Manually trigger the update to the code state
      setCode(contentEditableRef.current?.innerHTML || '');
    }
  };
  

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      // Manually trigger the update to the code state
      setCode(contentEditableRef.current?.innerHTML || '');
    }
  };
  
  
  return (
    <div style={{ position: 'relative', border: '1px solid #ccc', padding: '10px', minHeight: '100px', width: '100%' }}>
      <div
        contentEditable
        ref={contentEditableRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
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
          whiteSpace: 'pre-wrap',
          padding: '1.1rem 2rem 1rem 2.3rem',
          textAlign: 'left',
          fontSize: '1em',
          fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
        }}
      ></div>
      <pre style={{ pointerEvents: 'none', color: 'black', position: 'relative', opacity: 0.5 }}>
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