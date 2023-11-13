/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import './wysiwyg-editor.css';
import { useEditorOperations } from '../hooks/use-editor-operations';
import { useEditorContext } from '../hooks/use-editor-context';
import { useStack } from '../hooks/use-stack';

export const WysiwygEditor: React.FC = () => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const inputContainer = useRef<Node | Text | null>(null);
  const keyPress = useRef<string | null>(null);
  
  const {
    state
  } = useEditorContext();

  const {
    determineState,
    focusOnNode,
    cedAncestorSelector,
    splitAndInsertNode,
    validateParent
  } = useEditorOperations(contentEditableRef);

  const {
    init,
    preState,
    captureState,
    undo,
    redo
  } = useStack(contentEditableRef);

  useEffect(() => {
    if (contentEditableRef.current)
    {
      
        contentEditableRef.current.innerHTML = `<h1 id="sample-markdown">Sample Markdown</h1><h2 id="conventional">Conventional</h2><h3 id="ovational">Ovational</h3><h4 id="boldly-explorational">Boldly Explorational</h4><h5 id="crew-of-the-enterprise">Crew of the Enterprise</h5><h6 id="its-continuing-mission">It's continuing mission</h6>
<p>This is a paragraph with both <strong><em>bold and italic</em></strong> text.</p>
<p>This is an inline code example: <code>let x = 5;</code></p>
<ol><li><p>First Level Item 1</p><ol><li><p>Second Level Item 1</p><ol><li><p>Third Level Item 1</p></li><li><p>Third Level Item 2</p></li></ol></li><li><p>Second Level Item 2</p></li></ol></li><li><p>First Level Item 2</p><ol><li><p>Second Level Item 3</p><ol><li><p>Third Level Item 3</p></li><li><p>Third Level Item 4</p></li></ol></li><li><p>Second Level Item 4</p></li></ol></li><li><p>First Level Item 3</p></li></ol>
<ul><li><p>First level ordered item</p><ul><li><p>First level unordered item</p></li><li><p>Another first level unordered item</p></li></ul></li><li><p>Second level ordered item</p></li></ul>

<p>This is a paragraph with <strong>bold</strong> text and <em>italic</em> text.</p>
<h2 id="table">Table</h2>
<table><thead><tr><th><p>Header 1</p></th><th><p>Header 2</p></th></tr></thead><tbody><tr><td><p>Row 1 <strong>test</strong></p></td><td><p>Data 1 <em>test</em></p></td></tr><tr><td><p>Row 2</p></td><td><p>Data 2</p></td></tr></tbody></table>

<h2 id="blockquote">Blockquote</h2><blockquote><p>t
This is a blockquote.</p><p>It can span
multiple lines.</p></blockquote>

<h2 id="links">Links</h2>
<p>This is a <a href="https://openai.com">link to OpenAI</a>.</p>
<h2 id="javascript-code-block">JavaScript Code Block</h2>
<hr />
<pre><code>console.log('Hello, world!');
console.log('This is line 2!');
</code></pre>
`;

init(contentEditableRef.current);

    }
  }, []);

  const onInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!contentEditableRef.current)
    {
      return;
    }

    if (keyPress.current === 'Backspace') {
        let container = inputContainer.current as Node;
        if (container.hasChildNodes() && container.childNodes.length === 1)
        {
            container = container.firstChild as Node;
        }

        captureState(container, keyPress.current);
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!contentEditableRef.current)
    {
      return;
    }

    keyPress.current = event.key;

    if (event.key === 'Shift' || event.key === 'Alt' || event.key === 'Control') {
      return;
    }

    if ((event.key === 'v' || event.key === 'x' || event.key === 'z' || event.key === 'y') && event.ctrlKey) {

      if (event.key === 'z')
      {
        undo();
        event.preventDefault();
      }
      else if (event.key === 'y')
      {
        redo();
        event.preventDefault();
      }

      return;
    }

    const selection = window.getSelection();
      if (selection)
      {
          const range = selection.getRangeAt(0);
          const container = range.startContainer;
          inputContainer.current = container;
      }

      if (event.key === 'Enter') {

        event.preventDefault();
        
        let container = inputContainer.current as Node;
        
        if (container.hasChildNodes() && container.childNodes.length === 1)
        {
            container = container.firstChild as Node;
        }

        const ol = cedAncestorSelector(container, 'ol > li', 3);

      }
      

    if (event.key === 'Backspace') {

      let container = inputContainer.current as Node;
        
        if (container.hasChildNodes() && container.childNodes.length === 1)
        {
            container = container.firstChild as Node;
        }

        const grandparent = container.parentNode?.parentNode;
        if (grandparent && (grandparent.textContent || '').length === 1)
        {
            container.parentElement?.remove();
            const br = document.createElement('br');
            grandparent?.parentElement?.insertBefore(br, grandparent);
            event.preventDefault();
            
            return;
        }

        const prev = container.previousSibling;
        if (container.nodeName === 'DIV' && !container.hasChildNodes() && prev && prev.nodeName === 'BR')
        {
            if (contentEditableRef.current.childNodes.length > 2)
            {
                (container as Element).remove();
                (prev as Element).remove();
            }   
            event.preventDefault();
            
            return;
        }

        if (container.nodeName === '#text')
        {
          preState(container.textContent || '');
        }
        
        return;
    }

    if (event.key.length === 1) {
        event.preventDefault();

        let autoState: string | null = null;
        if (state === 'unselected')
        {
          autoState = determineState();
        }

        makeContent(contentEditableRef.current, event.key, autoState || state);
    }

  };

  function makeContent(editor: HTMLDivElement, key: string, state: string) {
    const selection = window.getSelection();
    if (selection && selection.toString() && selection.type === 'Range') {
        const range = selection.getRangeAt(0);
        const h1 = document.createElement(state);
        h1.innerHTML = key;
        range.deleteContents();
        range.insertNode(h1);
    } else if (selection) {
        if(selection.rangeCount === 1) {

            // No selection, insert H1 at cursor position
            const range = selection.getRangeAt(0);
            const start = range.startOffset;
            const container = range.startContainer;
            let startNode: Node | null = null;
            if (container.childNodes.length === 0)
            {
                startNode = container;
            }
            else if (container.childNodes.length <= start)
            {
                startNode = container.childNodes[start - 1];
            }
            else if (container.childNodes[start].nodeName === 'BR' && container.childNodes[start].nextSibling)
            {
                startNode = container.childNodes[start].nextSibling;
            }
            else
            {
                startNode = container.childNodes[start]; 
            }

            if (!startNode)
            {
                return;
            }

            if (startNode.nodeName === 'BR')
            {
                const h1 = document.createElement(state);
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                startNode.parentNode?.parentNode?.replaceChild(h1, startNode.parentNode);
                preState('');
                focusOnNode(editor, text, key);
            }
            else if (container.nodeName === 'DIV' && startNode.nodeName !== '#text')
            {
                const h1 = document.createElement(state);
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                startNode.appendChild(h1);
                preState('');
                focusOnNode(editor, text, key);
            }
            else
            {
                if (container.nodeName === state.toUpperCase())
                {
                    const text = container.childNodes[start === 0 ? 0 : start - 1] as Text;
                    preState('' + text.textContent);
                    text.textContent = text.textContent + key;
                    focusOnNode(editor, text, key);
                    
                }
                else if (container.nodeName === '#text')
                {
                    if (container.parentElement?.nodeName === state.toUpperCase() || state === '#text')
                    {
                      preState('' + container.textContent);
                      if (container.textContent)
                          container.textContent = container.textContent.substring(0, start) + key + container.textContent.substring(start);
                      else
                          container.textContent = container.textContent + key;

                      focusOnNode(editor, container as Text, key, start);
                    }
                    else if (container.parentElement?.nodeName && !validateParent(state.toUpperCase(), container.parentElement?.nodeName))
                    {
                      // TODO: Show tooltip for invalid action.
                    }
                    else
                    {
                      const h1 = document.createElement(state);
                      const text = document.createTextNode(`${key}`);
                      h1.appendChild(text);
                      preState('');
                      splitAndInsertNode(container as Text, h1, start);
                      focusOnNode(editor, text, key, start);
                    }
                }
            }
          }
    }
  }
  
  return (
    <div className='relative w-full' style={{ padding: '10px', minHeight: '30px'}}>
      <div
        contentEditable
        ref={contentEditableRef}
        className="bg-white absolute top-0 left-0 w-full min-h-[100px] overflow-auto outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_5rem] cursor-text text-left text-base"
        onKeyDown={onKeyDown}
        onInput={onInput}
        id="contentEditable"
        style={{
          color: 'rgba(100, 100, 100, 1)',
          fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
        }}
      ></div>
    </div>
  );
};