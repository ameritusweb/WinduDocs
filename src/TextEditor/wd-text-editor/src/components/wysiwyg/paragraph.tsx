import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstNode, CursorPositionType } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { HigherLevelProps } from './interface';
// import EditorData, { EditorDataType } from "../../hooks/editor-data";

interface ParagraphProps<T extends HTMLElement> {
  id: string;
  content: AstNode[];
  render: (props: RenderProps<T>) => JSX.Element;
  higherLevelContent?: HigherLevelProps;
}

interface RenderProps<T extends HTMLElement> {
  id: string;
  ref: MutableRefObject<T | null>;
  className: string;
  tabIndex: number;
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const Paragraph = <T extends HTMLElement>(props: ParagraphProps<T>) => {

    const [ast, setAst] = useState<AstNode[]>(props.content);
    const [higherLevelAst] = useState<AstNode[]>(props.higherLevelContent?.content || []);
    const { updateAst, getCursorPosition } = useRichTextEditor();
    const paraRef = useRef<T | null>(null);
    const cursorPositionRef = useRef<CursorPositionType | null>(null);
    // const editorData: EditorDataType = EditorData;

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
  
      return () => observer.disconnect();
    }, [/* dependencies */]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {


      if ((event.key === 'z' || event.key === 'y') && event.ctrlKey)
      {
        return;
      }

        const update = updateAst(event, ast, higherLevelAst, props.higherLevelContent?.id);
        saveCursorPosition(update.type);
        if (props.higherLevelContent && props.higherLevelContent.updater && update.type.startsWith('higherLevel')) {
          props.higherLevelContent.updater(update.nodes);
        }
        else
        {
          setAst(update.nodes);
        }

        if (event.code === 'Space') {
          return;
        }
        event.stopPropagation();

    }

    const renderProps: RenderProps<T> = {
      id: props.id,
      ref: paraRef,
      className: "rich-para",
      tabIndex: 1,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onKeyDown,
      children: ast.map((item) => {
        switch (item.NodeName) {
          case 'Strong':
            return <Strong key={item.Guid + (item.Version || '0')} id={item.Guid}>{item.Children}</Strong>;
          case 'Emphasis':
            return <Emphasis key={item.Guid + (item.Version || '0')} id={item.Guid}>{item.Children}</Emphasis>;
          case 'CodeInline':
            return <CodeInline key={item.Guid + (item.Version || '0')} id={item.Guid}>{item.TextContent}</CodeInline>;
          case 'Link':
            return <Link key={item.Guid + (item.Version || '0')} id={item.Guid} url={item.Attributes.Url || ''}>{item.Children}</Link>
          case 'Text':
          default:
            return <React.Fragment key={item.Guid + (item.Version || '0')}>{item.TextContent}</React.Fragment>;
        }
      })
  };

  return props.render(renderProps);
  };
  
  export default Paragraph;