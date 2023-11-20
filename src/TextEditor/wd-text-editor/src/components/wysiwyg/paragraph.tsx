import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstNode, CursorPositionType } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { HigherLevelProps } from './interface';
import { deepCopyAstNode } from "../../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { domToAstMap } from "../ast-mapping";

interface ParagraphProps<T extends HTMLElement> {
  id: string;
  content: AstNode[];
  pathIndices: number[];
  version: string;
  render: (props: RenderProps<T>) => JSX.Element;
  higherLevelContent?: HigherLevelProps;
}

interface RenderProps<T extends HTMLElement> {
  id: string;
  ref: MutableRefObject<T | null>;
  className: string;
  version: string;
  tabIndex: number;
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const Paragraph = <T extends HTMLElement>(props: ParagraphProps<T>) => {

    const [ast, setAst] = useState<AstNode[]>(props.content);
    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(props.higherLevelContent?.content || []);
    const { updateAst, getCursorPosition } = useRichTextEditor();
    const paraRef = useRef<T | null>(null);
    const cursorPositionRef = useRef<CursorPositionType | null>(null);
    const editorData: EditorDataType = EditorData;

    useEffect(() => {
      const handleIndent = (payload: any) => {
          
      };

      // Subscribe with the provided GUID
      editorData.events.subscribe(props.id, 'indent', handleIndent);

      const handleOutdent = (payload: any) => {
          
      };

      // Subscribe with the provided GUID
      editorData.events.subscribe(props.id, 'outdent', handleOutdent);

      return () => {
          // Unsubscribe the GUID on component unmount
          editorData.events.unsubscribe(props.id);
      };
  }, [props.id]); // Depend on the GUID prop

    useEffect(() => {

      setAst(props.content);
      if (props.higherLevelContent)
        setHigherLevelAst(props.higherLevelContent.content);

    }, [props.content, props.higherLevelContent, props.higherLevelContent?.content]);

    const saveCursorPosition = (updateType: string) => {
      const cursorPosition = getCursorPosition(updateType);
      if (cursorPosition) {
        cursorPositionRef.current = cursorPosition;
      }
    };
  
    const restoreCursorPosition = (node: Node) => {
      const selection = window.getSelection();
      const range = new Range();
      if (cursorPositionRef.current) {
        if ((node as Element).id === cursorPositionRef.current.parentId && node.hasChildNodes()) {
          node = node.childNodes[cursorPositionRef.current.index];
        }
        if (cursorPositionRef.current.nextSibling)
        {
          node = node.parentElement?.lastElementChild?.firstChild as Node;
        }
        range.setStart(node, cursorPositionRef.current.offset + 1);
        range.setEnd(node, cursorPositionRef.current.offset + 1);
        if (selection && range) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };
  
    useEffect(() => {
      const observer = new MutationObserver((mutationsList) => {
        // Check for the specific mutation type, if necessary
        if (mutationsList.length > 0) {
          restoreCursorPosition(mutationsList[mutationsList.length - 1].target);
        }
      });
  
      if (paraRef.current) {
        observer.observe(paraRef.current, { childList: true, subtree: true, characterData: true });
      }

      domToAstMap.set(paraRef.current as Element, [ast, higherLevelAst]);
      
      return () => observer.disconnect();
    }, [/* dependencies */]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

      const astCopy = ast.map((p) => deepCopyAstNode(p));
      const higherLevelAstCopy = higherLevelAst.map((p) => deepCopyAstNode(p));

      if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt')
      {
        return;
      }

      if ((event.key === 'z' || event.key === 'y') && event.ctrlKey)
      {
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')
      {
          return;
      }

        let update = updateAst(event, astCopy, higherLevelAstCopy, editorData, props.higherLevelContent?.id);
        if (update.type === 'none')
        {
          return;
        }
        saveCursorPosition(update.type);
        update = { ...update, pathIndices: props.pathIndices };
        editorData.emitEvent('update', 'richTextEditor', update);
        /*
        if (props.higherLevelContent && props.higherLevelContent.updater && update.type.startsWith('higherLevel')) {
          props.higherLevelContent.updater(update.nodes, true);
        }
        else
        {
          if (props.higherLevelContent && props.higherLevelContent.updater && update.higherLevelNodes)
          {
            props.higherLevelContent?.updater(update.higherLevelNodes, true);
          }
          setAst(update.nodes);
        }
        */

        if (event.code === 'Space') {
          return;
        }
        event.stopPropagation();

    }

    const renderProps: RenderProps<T> = {
      id: `para_${props.id}`,
      ref: paraRef,
      className: "rich-para",
      version: props.version,
      tabIndex: 1,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onKeyDown,
      children: ast.map((item, index) => {
        const childPathIndices = [...props.pathIndices, index];
        switch (item.NodeName) {
          case 'Strong':
            return <Strong key={item.Guid + (item.Version || '0')} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Strong>;
          case 'Emphasis':
            return <Emphasis key={item.Guid + (item.Version || '0')} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Emphasis>;
          case 'CodeInline':
            return <CodeInline key={item.Guid + (item.Version || '0')} pathIndices={childPathIndices} id={item.Guid}>{item.TextContent}</CodeInline>;
          case 'Link':
            return <Link key={item.Guid + (item.Version || '0')} pathIndices={childPathIndices} id={item.Guid} version={item.Version || 'V0'} url={item.Attributes.Url || ''}>{item.Children}</Link>
          case 'Text':
          default:
            return <React.Fragment key={item.Guid}>{item.TextContent || '\n'}</React.Fragment>;
        }
      })
  };

  return props.render(renderProps);
  };
  
  export default Paragraph;