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

  const postBackspace = (div: HTMLDivElement, nodeRef: Node, offset: number) => {
    
    const nodes = div.childNodes;
    const node = nodes[1];
    if (node && node.firstChild && node.firstChild.nodeName === 'BR')
    {
        const parent = node.firstChild.parentElement;
        const newNode = document.createTextNode('');
        parent?.replaceChild(newNode, node.firstChild);
        focusOnNode(div, newNode);
    }
  }

  const postEnter = (div: HTMLDivElement) => {
    
    const selection = window.getSelection();
    if (!selection)
    {
        return;
    }

    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    if (node && node.firstChild && node.firstChild.nodeName === 'BR')
    {
        const parent = node;
        const grandparent = node.parentElement;
        const newNode = document.createTextNode('');
        const firstChild = node.firstChild;
        // parent?.replaceChild(newNode, node.firstChild);
        grandparent?.insertBefore(firstChild, parent!);
        parent?.appendChild(newNode);
        const prev = firstChild.previousSibling as Element;
        if (prev.outerHTML === '<div><br></div>')
        {
            prev.parentElement?.insertBefore(prev.firstChild!, prev);
        }
        focusOnNode(div, newNode);
    }
  }

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
        if (contentEditableRef.current.childNodes.length <= 2)
        {
            if (contentEditableRef.current.lastElementChild 
                && 
                contentEditableRef.current.lastElementChild.firstChild
                &&
                contentEditableRef.current.lastElementChild.firstChild.textContent?.length === 0)
                {
                    event.preventDefault();
                    //contentEditableRef.current.lastElementChild.firstChild.textContent = '';
                    contentEditableRef.current.focus();
                }
                else if (contentEditableRef.current.lastElementChild
                    &&
                    !contentEditableRef.current.lastElementChild.firstChild)
                    {
                        event.preventDefault();

                        contentEditableRef.current.focus();
                    }
        }
        const selection = window.getSelection();
        if (selection)
        {
            const range = selection.getRangeAt(0);
            const container = range.startContainer;
            const offset = range.startOffset;
            setTimeout(postBackspace.bind(this, contentEditableRef.current, container, offset), 1);
        }
        return;
    }

    if (event.key === 'Enter') {
        setTimeout(postEnter.bind(this, contentEditableRef.current), 1);
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

  function focusOnNode(editor: HTMLDivElement, text: Text) {
    const range = new Range();
                range.setStartAfter(text);
                range.setEndAfter(text);

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
            
            if (container.nodeName === 'DIV')
            {
                const h1 = document.createElement('h1');
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                editor.appendChild(h1);
                focusOnNode(editor, text);
            }
            else if (Array.from(editor.childNodes).slice(1).length > 0)
            {
                const node = container as Element | Text;
                if (node.nodeValue)
                {
                    const length = node.nodeValue.length;
                    const html = node.nodeValue.slice(0, start) + 
                                    key + 
                                    (start === length ? '' : node.nodeValue.slice(start));
                    node.nodeValue = html;
                    focusOnNode(editor, node as Text);
                }
                else
                {
                    //const node = editor.childNodes[start === 0 ? 0 : start - 1];
                    const text = node.childNodes[start === 0 ? 0 : start - 1] as Text;
                    text.textContent = text.textContent + key;
                    focusOnNode(editor, text);
                }
            }
            else
            {
                const h1 = document.createElement('h1');
                const text = document.createTextNode(`${key}`);
                h1.appendChild(text);
                editor.appendChild(h1);
                focusOnNode(editor, text);
                
            }
          }
    }
  }

  const onInput = (event: React.FormEvent<HTMLDivElement>) => {
    // Capturing innerHTML to include structural HTML like <div> and <br>
    // const html = (event.currentTarget as HTMLDivElement).innerHTML;

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