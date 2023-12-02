import React, { useEffect, useRef, useState } from "react";
import { AstContext, AstNode, AstUpdate, IHistoryManager, ITextBlock } from "./interface";
import Paragraph from "./paragraph";
import Heading from "./heading";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import Table from "./table";
import QuoteBlock from "./quote-block";
import HorizontalRule from "./horizontal-rule";
import CodeBlock from "./code-block";
import AlertBlock from "./alert-block";
import './rich-text-editor.css';
import BlankLine from "./blank-line";
import { useMarkdownGenerator } from "../../hooks/use-markdown-generator";
import { HistoryManager } from "../../rich-text-editor/undo-redo-ot";
import { deepCopyAstNode } from "../../rich-text-editor/node-operations";
import editorData from "../../hooks/editor-data";
import processAst from "../../rich-text-editor/node-operations/process-ast";
import { handleArrowKeyUpOrDownPress, handleArrowKeyLeftOrRightPress } from "../../rich-text-editor/handlers";
import ParagraphContainer from "./paragraph-container";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

export interface RichTextEditorProps {
    ast: AstNode;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ ast }) => {

    const astRef = useRef<AstNode>(ast);
    const processedAstRef = useRef<ITextBlock[][]>([]);
    const processedAstMap = useRef<Map<string, number[]>>(new Map<string, number[]>());
    const { convertToMarkdown } = useMarkdownGenerator();
    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(ast.Children);
    const historyManager: IHistoryManager = HistoryManager;
    const editorRef = useRef<HTMLDivElement | null>(null);
    const initialContext = useRef<AstContext>({
        isAlertBlock: false,
        isQuoteBlock: false,
        isCodeBlock: false,
        isEmphasis: false,
        isHeading: false,
        isInlineCode: false,
        isLink: false,
        isOrderedList: false,
        isStrong: false,
        isTable: false,
        isUnorderedList: false,
        types: []
    });
    const { restoreCursorPosition } = useRichTextEditor();

    const updateProcessedAst = () => {
        const asyncProcessAst = async () => { 
            [processedAstRef.current, processedAstMap.current] = await processAst(astRef.current);
        }

        asyncProcessAst();
    }

    const updateContent = (nodes: AstNode[], updateProcessed: boolean) => {
        setHigherLevelAst(prev => nodes.map(n => Object.assign({}, n)));
        astRef.current.Children = nodes;
        if (updateProcessed)
            updateProcessedAst();
    }

    useEffect(() => {
        updateProcessedAst();

    }, []);

    const updateNodeChildren = (node: AstNode, path: number[], update: AstUpdate, currentDepth: number = 0): AstNode => {
        if (path.length === currentDepth) {
          // Reached the node to update
          return { ...node, Children: update.nodes };
        }
      
        // Recurse into the children
        const childIndex = path[currentDepth];
        if (childIndex < node.Children.length) {
          return {
            ...node,
            Children: node.Children.map((child, index) => {
              if (index === childIndex) {
                const updatedChild = updateNodeChildren(child, path, update, currentDepth + 1);
                return updatedChild;
              }
              else {
                return child;
              }
            })
          };
        }
      
        // If the path is invalid, return the node as is
        return node;
      };

      const handleUpdate = (update: AstUpdate) => {
        if (update.pathIndices) {

          let indices = update.pathIndices.slice(0);
          if (update.type.startsWith('higherLevel'))
          {
            indices = update.pathIndices.slice(0, -1);
          } else if (update.type.startsWith('skyLevel'))
          {
            indices = update.pathIndices.slice(0, -2);
          }

            // Update the tree with the new children directly using the current AST
            const updatedAst = updateNodeChildren(astRef.current, indices, update);
            
            // Update the content with the new tree
            updateContent(updatedAst.Children, update.type !== 'insert');
        }
      };      

    useEffect(() => {

        editorData.events.subscribe('richTextEditor', 'update', handleUpdate);

        return () => {
            editorData.events.unsubscribe('richTextEditor');
        }

    }, []);

useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      // Check for the specific mutation type, if necessary
      if (mutationsList.length > 0) {
        restoreCursorPosition(mutationsList);

      }
    });

    if (editorRef.current) {
      observer.observe(editorRef.current, { childList: true, subtree: true, characterData: true });
    }

    return () => observer.disconnect();
  }, []);

    const renderNode = (node: AstNode, higherLevelContent: AstNode[], pathIndices: number[]) => {
        switch (node.NodeName) {
            case 'ParagraphBlock':
                return (
                    <ParagraphContainer
                        key={node.Guid + (node.Version || 'V0')}
                        paragraphId={node.Guid}
                        renderParagraph={(paragraphProps) => (
                            <Paragraph<HTMLParagraphElement>
                                {...paragraphProps}
                                id={node.Guid}
                                context={initialContext.current}
                                pathIndices={pathIndices}
                                version={node.Version || 'V0'}
                                content={node.Children}
                                higherLevelContent={{
                                    id: node.Guid, 
                                    content: higherLevelContent, 
                                    updater: updateContent
                                }}
                                render={(props) => <p {...props}></p>}
                            />
                        )}
                    />
                );
            case 'HeadingBlock':
                return <Heading 
                            key={node.Guid + (node.Version || 'V0')} 
                            id={node.Guid} 
                            context={ initialContext.current }
                            pathIndices={pathIndices} 
                            version={node.Version || 'V0'} 
                            level={node.Attributes.Level || ''} 
                            children={node.Children} 
                            higherLevelChildren={higherLevelContent} 
                            rootUpdater={updateContent}
                        />;
            case 'Table':
                return <Table 
                            key={node.Guid + (node.Version || 'V0')} 
                            id={node.Guid} 
                            context={ initialContext.current }
                            pathIndices={pathIndices} 
                            children={node.Children} 
                        />;
            case 'ListBlock':
                if (node.Attributes.IsOrdered && node.Attributes.IsOrdered === 'True') {
                    return <OrderedList 
                                key={node.Guid + (node.Version || 'V0')} 
                                id={node.Guid} 
                                isTopLevel={true} 
                                context={ initialContext.current }
                                pathIndices={pathIndices} 
                                higherLevelChild={node} 
                                children={node.Children} 
                            />
                } else {
                    return <UnorderedList 
                                key={node.Guid + (node.Version || 'V0')} 
                                id={node.Guid} 
                                isTopLevel={true} 
                                context={ initialContext.current }
                                pathIndices={pathIndices} 
                                higherLevelChild={node} 
                                children={node.Children} 
                            />
                }
            case 'QuoteBlock':
                return <QuoteBlock 
                            key={node.Guid + (node.Version || 'V0')} 
                            id={node.Guid} 
                            context={ initialContext.current }
                            pathIndices={pathIndices} 
                            children={node.Children} />;
            case 'ThematicBreakBlock':
                return <HorizontalRule 
                            id={node.Guid} 
                            key={node.Guid + (node.Version || 'V0')} />;
             case 'FencedCodeBlock':
                if (node.Attributes.Language && node.Attributes.Language.startsWith('type-alert-')) {
                    return <AlertBlock 
                                key={node.Guid + (node.Version || 'V0')} 
                                id={node.Guid}
                                context={ initialContext.current } 
                                version={node.Version || 'V0'} 
                                pathIndices={pathIndices} 
                                higherLevelChildren={higherLevelContent} 
                                type={node.Attributes.Language} 
                                children={node.Children} />;
                } else {
                    return <CodeBlock 
                                key={node.Guid + (node.Version || 'V0')} 
                                id={node.Guid} 
                                context={ initialContext.current }
                                pathIndices={pathIndices} 
                                language={node.Attributes.Language || ''} 
                                children={node.Children} />;
                }
            case 'BlankLine':
                return <BlankLine 
                            key={node.Guid + (node.Version || 'V0')} 
                            id={node.Guid} 
                            format={null} 
                            self={node} 
                            higherLevelContent={{ content: higherLevelContent, updater: updateContent }} />
            // ... handle other types as needed
            default:
                return null;
        }
    };

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        const richTextEditorId = 'richTextEditor';
    
        function setFocusAtStart(textNode: Text) {
            const range = document.createRange();
            range.setStart(textNode, 0);
            range.collapse(true);
    
            const selection = window.getSelection();
            if (selection && shouldSetFocus(selection)) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
            textNode.parentElement!.focus();
        }
    
        function shouldSetFocus(selection: Selection) {
            return selection.focusOffset === 0 || !isWithinEditor(selection.focusNode as Element);
        }
    
        function isWithinEditor(node: Element | null) {
            while (node && node.nodeType !== Node.DOCUMENT_NODE) {
                if (node.id === richTextEditorId) return true;
                node = node.parentNode as Element;
            }
            return false;
        }
    
        function findFirstTextNode(node: Node): Text | null {
            if (node.nodeType === Node.TEXT_NODE) {
                return node as Text;
            }
        
            for (const child of node.childNodes) {
                const textNode = findFirstTextNode(child);
                if (textNode) {
                    return textNode;
                }
            }
        
            return null;
        }
    
        const target = event.target as HTMLElement;
        const textNode = target.nodeType === Node.TEXT_NODE ? target : findFirstTextNode(target);
    
        if (textNode) {
            setFocusAtStart(textNode as Text);
        } else {
            target.focus();
        }
    };    

    const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {

        if (event.button === 0) {
            editorData.cursorOffsetReduction = 0;
        }

        (event.target as HTMLElement).focus();

    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt')
        {
            return;
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
        {
            event.preventDefault();
            handleArrowKeyUpOrDownPress(event.key, editorData, processedAstRef.current, processedAstMap.current);
        }

        if (event.key === 'ArrowLeft')
        {
            editorData.cursorOffsetReduction = 0;
            handleArrowKeyLeftOrRightPress(event, editorData, processedAstRef.current, processedAstMap.current, 'left');
        }

        if (event.key === 'ArrowRight')
        {
            editorData.cursorOffsetReduction = 0;
            handleArrowKeyLeftOrRightPress(event, editorData, processedAstRef.current, processedAstMap.current, 'right');
        }

        if (event.ctrlKey)
        {
            if (event.key === 'z')
            {
                const res = historyManager.undo(deepCopyAstNode(astRef.current));
                if (res) {
                    const [updatedAst] = res;
                    updateContent(updatedAst.Children, true);
                }
            } else if (event.key === 'y')
            {
                const res = historyManager.redo(deepCopyAstNode(astRef.current));
                if (res) {
                    const [updatedAst] = res;
                    updateContent(updatedAst.Children, true);
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
                 onMouseDown={onMouseDown}
                 onClick={onClick}
                 className="bg-white dark:bg-zinc-950 text-gray-600/90 dark:text-zinc-400 absolute top-0 left-0 w-full min-h-[100px] overflow-visible outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_2rem] cursor-text text-left text-base"
                 id="richTextEditor"
                 style={{
                 fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
                 }}>
                 {higherLevelAst.map((c, pathIndex) => renderNode(c, higherLevelAst, [pathIndex]))}
            </div>
        </div>
    );
};

export default RichTextEditor;
