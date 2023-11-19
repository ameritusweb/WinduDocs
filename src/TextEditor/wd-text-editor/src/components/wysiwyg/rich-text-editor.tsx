import React, { useEffect, useRef, useState } from "react";
import { AstNode, IHistoryManager, ITextBlock } from "./interface";
import Paragraph from "./paragraph";
import Heading from "./heading";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import Table from "./table";
import QuoteBlock from "./quote-block";
import HorizontalRule from "./horizontal-rule";
import CodeBlock from "./code-block";
import AlertBlock from "./alert-block";
import ast from './test-data.json';
import './rich-text-editor.css';
import { BlankLine } from "./blank-line";
import { useMarkdownGenerator } from "../../hooks/use-markdown-generator";
import { HistoryManager } from "../../rich-text-editor/undo-redo-ot";
import { deepCopyAstNode, findFirstTextNode, findLastTextNode, generateKey } from "../../rich-text-editor/node-operations";
import { handleArrowKeyPress } from "../../rich-text-editor/handlers";
import editorData from "../../hooks/editor-data";
import processAst from "../../rich-text-editor/node-operations/process-ast";

const RichTextEditor = () => {

    const astRef = useRef<AstNode>(ast);
    const processedAstRef = useRef<ITextBlock[][]>([]);
    const { convertToMarkdown } = useMarkdownGenerator();
    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(ast.Children);
    const historyManager: IHistoryManager = HistoryManager;
    const editorRef = useRef<HTMLDivElement | null>(null);

    const updateContent = (nodes: AstNode[], guids: string) => {
        setHigherLevelAst(nodes);
        astRef.current.Children = nodes;
    }

    useEffect(() => {
        const asyncProcessAst = async () => { 
            processedAstRef.current = await processAst(astRef.current);
        }

        asyncProcessAst();

    }, [higherLevelAst]);

    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
          // Check for the specific mutation type, if necessary
          if (mutationsList.length > 0) {
            const lastMutation = mutationsList[mutationsList.length - 1];
            if (lastMutation.removedNodes && lastMutation.removedNodes.length > 0)
            {
                const prev = lastMutation.previousSibling;
                if (prev)
                {
                    const lastTextNode = findLastTextNode(prev as Element);
                    if (lastTextNode) {
                        const selection = window.getSelection();
                        const range = new Range();
                        if (lastTextNode.textContent) {
                            range.setStart(lastTextNode, lastTextNode.textContent?.length);
                            range.setEnd(lastTextNode, lastTextNode.textContent?.length);
                            if (selection && range) {
                                selection.removeAllRanges();
                                selection.addRange(range);
                            }
                        }
                    }
                }
            }
            else if (lastMutation.addedNodes && lastMutation.addedNodes.length > 0)
            {
                const addedNode = lastMutation.addedNodes[0];
                if (addedNode && addedNode instanceof Text)
                {
                    const selection = window.getSelection();
                    const range = new Range();
                    range.setStart(addedNode, addedNode.textContent?.length || 1);
                    range.setEnd(addedNode, addedNode.textContent?.length || 1);
                    if (selection && range) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
                else if (addedNode && addedNode instanceof Element)
                {
                    if (addedNode.className === 'blank-line')
                    {
                        const selection = window.getSelection();
                        const range = new Range();
                        range.setStart(addedNode, 1);
                        range.setEnd(addedNode, 1);
                        if (selection && range) {
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    } else if (addedNode.getAttribute('Version') === 'New'
                                ||
                               (addedNode.firstElementChild && addedNode.firstElementChild?.getAttribute('Version') === 'New')) {
                        const selection = window.getSelection();
                        const range = new Range();
                        const firstTextNode = findFirstTextNode(addedNode);
                        if (firstTextNode && firstTextNode.textContent && firstTextNode.textContent?.length === 1)
                        {
                            range.setStart(firstTextNode, 1);
                            range.setEnd(firstTextNode, 1);
                            if (selection && range) {
                                selection.removeAllRanges();
                                selection.addRange(range);
                            }
                        }
                    }
                }
            }
          }
        });
    
        if (editorRef.current) {
          observer.observe(editorRef.current, { childList: true, subtree: true });
        }
    
        return () => observer.disconnect();
      }, [/* dependencies */]);

    const renderNode = (node: AstNode, higherLevelContent: AstNode[]) => {
        switch (node.NodeName) {
            case 'ParagraphBlock':
                return <Paragraph<HTMLParagraphElement> key={node.Guid + (node.Version || '0')} id={node.Guid} version={node.Version || 'V0'} content={node.Children} higherLevelContent={{ id: node.Guid, content: higherLevelContent, updater: updateContent }} render={props => <p {...props}></p>}/>;
            case 'HeadingBlock':
                return <Heading key={node.Guid + (node.Version || '0')} id={node.Guid} level={node.Attributes.Level || ''} children={node.Children} higherLevelChildren={higherLevelContent} rootUpdater={updateContent} />;
            case 'OrderedListBlock':
                return <OrderedList key={node.Guid + (node.Version || '0')} children={node.Children} />;
            case 'UnorderedListBlock':
                return <UnorderedList key={node.Guid + (node.Version || '0')} children={node.Children} />;
            case 'Table':
                return <Table key={node.Guid + (node.Version || '0')} id={node.Guid} children={node.Children} />;
            case 'ListBlock':
                if (node.Attributes.IsOrdered && node.Attributes.IsOrdered === 'True') {
                    return <OrderedList key={node.Guid + (node.Version || '0')} children={node.Children} />
                } else {
                    return <UnorderedList key={node.Guid + (node.Version || '0')} children={node.Children} />
                }
            case 'QuoteBlock':
                return <QuoteBlock key={node.Guid + (node.Version || '0')} children={node.Children} />;
            case 'ThematicBreakBlock':
                return <HorizontalRule id={node.Guid} key={node.Guid + (node.Version || '0')}/>;
             case 'FencedCodeBlock':
                if (node.Attributes.Language && node.Attributes.Language.startsWith('type-alert-')) {
                    return <AlertBlock key={node.Guid + (node.Version || '0')} id={node.Guid} version={node.Version || 'V0'} higherLevelChildren={higherLevelContent} type={node.Attributes.Language} children={node.Children} />;
                } else {
                    return <CodeBlock key={node.Guid + (node.Version || '0')} id={node.Guid} version={node.Version || 'V0'} higherLevelChildren={higherLevelContent} rootUpdater={updateContent} language={node.Attributes.Language || ''} children={node.Children} />;
                }
            case 'BlankLine':
                return <BlankLine key={node.Guid + (node.Version || '0')} id={node.Guid} format={null} self={node} higherLevelContent={{ content: higherLevelContent, updater: updateContent }} />
            // ... handle other types as needed
            default:
                return null;
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt')
        {
            return;
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
        {
            event.preventDefault();
            // processedAstRef.current = processAst(astRef.current);
            handleArrowKeyPress(event.key, editorData, processedAstRef.current);
        }

        if (event.ctrlKey)
        {
            if (event.key === 'z')
            {
                const res = historyManager.undo(deepCopyAstNode(astRef.current));
                if (res) {
                    const [updatedAst, rootChildIds] = res;
                    updateContent(updatedAst.Children, rootChildIds);
                }
            } else if (event.key === 'y')
            {
                const res = historyManager.redo(deepCopyAstNode(astRef.current));
                if (res) {
                    const [updatedAst, rootChildIds] = res;
                    updateContent(updatedAst.Children, rootChildIds);
                }
            }
        }

        if (event.key.length === 1)
            event.preventDefault();

        return;
        //const markdown = convertToMarkdown(astRef.current, 0);
        //console.log(JSON.stringify(markdown, null, 2));
    }

    return (
        <div className='relative w-full' style={{ padding: '10px', minHeight: '30px'}}>
            <div key={ast.Guid} 
                 ref={editorRef}
                 onKeyDown={onKeyDown}
                 className="bg-white absolute top-0 left-0 w-full min-h-[100px] overflow-auto outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_2rem] cursor-text text-left text-base"
                 id="richTextEditor"
                 style={{
                 color: 'rgba(100, 100, 100, 1)',
                 fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
                 }}>
                 {higherLevelAst.map((c) => renderNode(c, higherLevelAst))}
            </div>
        </div>
    );
};

export default RichTextEditor;
