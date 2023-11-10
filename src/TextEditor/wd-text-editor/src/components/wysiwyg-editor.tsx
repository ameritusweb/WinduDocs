/* eslint-disable @typescript-eslint/no-unused-vars */
declare const Prism: typeof import('prismjs');
import React, { useRef, useState, useEffect } from 'react';
import { useTextOperations } from '../hooks/use-text-operations';
import './wysiwyg-editor.css';

interface CurrentState {
    state: string;
}

export const WysiwygEditor: React.FC = () => {
  const [states, setStates] = useState<CurrentState[]>([]);
  const [state, setState] = useState<string>('h1');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const {
    handleDefault
  } = useTextOperations(contentEditableRef);

  // ... rest of the component code

  useEffect(() => {
    if (contentEditableRef.current)
    {
        contentEditableRef.current.innerHTML = '<div></div>';
    }
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

    if (event.key === 'Backspace') {
        const selection = window.getSelection();
        if (selection)
        {
            const range = selection.getRangeAt(0);
            let container = range.startContainer;
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
        }
        return;
    }

    if (event.key.length === 1) {
        event.preventDefault();

        if (state === 'h1')
        {
            makeH1(contentEditableRef.current, event.key);
        }
    }

  };

  function focusOnNode(editor: HTMLDivElement, node: Node, offset?: number) {
    const range = new Range();
        if (offset)
        {
            range.setStart(node, offset + 1);
            range.setEnd(node, offset + 1);
        }
        else
        {
                range.setStartAfter(node);
                range.setEndAfter(node);
        }

                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);

                editor.focus();
  }

  function makeH1(editor: HTMLDivElement, key: string) {
    const selection = window.getSelection();
    if (selection && selection.toString() && selection.type === 'Range') {
        const range = selection.getRangeAt(0);
        const h1 = document.createElement('h1');
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
                const h1 = document.createElement('h1');
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                startNode.parentNode?.replaceChild(h1, startNode);
                focusOnNode(editor, text);
            }
            else if (container.nodeName === 'DIV' && startNode.nodeName !== '#text')
            {
                const h1 = document.createElement('h1');
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                startNode.appendChild(h1);
                focusOnNode(editor, text);
            }
            else
            {
                const h1 = document.createElement('h1');
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                if (container.nodeName === 'H1')
                {
                    const text = container.childNodes[start === 0 ? 0 : start - 1] as Text;
                    text.textContent = text.textContent + key;
                    focusOnNode(editor, text);
                    
                }
                else if (container.nodeName === '#text')
                {
                    if (container.textContent)
                        container.textContent = container.textContent.substring(0, start) + key + container.textContent.substring(start);
                    else
                        container.textContent = container.textContent + key;
                    focusOnNode(editor, container as Text, start);
                    
                }
            }
          }
    }
  }

  const onInput = (event: React.FormEvent<HTMLDivElement>) => {

  };
  
  return (
    <div className='relative w-full' style={{ padding: '10px', minHeight: '30px'}}>
      <div
        contentEditable
        ref={contentEditableRef}
        className="bg-white absolute top-0 left-0 w-full min-h-[100px] overflow-auto outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_5rem] cursor-text text-left text-base"
        onInput={onInput}
        onKeyDown={onKeyDown}
        id="contentEditable"
        style={{
          color: 'rgba(100, 100, 100, 1)',
          fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
        }}
      ></div>
    </div>
  );
};