declare var Prism: typeof import('prismjs');
import React, { useState, useRef, useEffect } from 'react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      Prism.highlightElement(overlayRef.current);
    }
  }, [code]); // Re-run highlighting when code changes

  useEffect(() => {
    if (contentEditableRef.current && overlayRef.current) {
      // Copy the contentEditable text to the overlay
      overlayRef.current.textContent = contentEditableRef.current.textContent;
      // Apply syntax highlighting
      Prism.highlightElement(overlayRef.current);
    }
  }, [code]); // Dependency on the 'code' state ensures this runs after updates

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const text = (event.target as HTMLDivElement).innerText;
    setCode(text);
  };

  const insertTextAtCursor = (text: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents(); // Delete any selected text
  
      // Create a new text node and insert it
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
  
      // Create a new range to set the caret position
      const newRange = document.createRange();
      newRange.setStartAfter(textNode);
      newRange.setEndAfter(textNode);
  
      // Remove the old range and use the new range
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const tabCharacter = '    '; // Four spaces to represent a tab
      insertTextAtCursor(tabCharacter);
      // Trigger re-render to update the overlay with the new content
      setCode(contentEditableRef.current?.innerText || '');
    }
  };
  

  return (
    <div style={{ position: 'relative', border: '1px solid #ccc', padding: '10px', minHeight: '100px', width: '100%' }}>
      <div
        contentEditable
        ref={contentEditableRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
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