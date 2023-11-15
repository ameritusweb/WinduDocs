import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { HigherLevelProps } from './interface';
import EditorData, { EditorDataType } from "../../hooks/editor-data";

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
    const { updateAst } = useRichTextEditor();
    const paraRef = useRef<T | null>(null);
    const cursorPositionRef = useRef<number>(0);
    const editorData: EditorDataType = EditorData;

    const saveCursorPosition = (updateType: string) => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        if (updateType === 'remove') {
          cursorPositionRef.current = selection.getRangeAt(0).startOffset - 2;
        }
        else if (updateType === 'removeSelected') {
          cursorPositionRef.current = selection.getRangeAt(0).startOffset - 1;
        }
        else
        {
          cursorPositionRef.current = selection.getRangeAt(0).startOffset;
        }
      }
    };
  
    const restoreCursorPosition = (node: Node) => {
      const selection = window.getSelection();
      const range = new Range();
      range.setStart(node, cursorPositionRef.current + 1);
      range.setEnd(node, cursorPositionRef.current + 1);
      if (selection && range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };
  
    useEffect(() => {
      const observer = new MutationObserver((mutationsList) => {
        // Check for the specific mutation type, if necessary
        if (mutationsList.length > 0) {
          restoreCursorPosition(mutationsList[0].target);
        }
      });
  
      if (paraRef.current) {
        observer.observe(paraRef.current, { childList: true, subtree: true, characterData: true });
      }
  
      return () => observer.disconnect();
    }, [/* dependencies */]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

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
            return <Strong key={item.Guid} id={item.Guid}>{item.Children}</Strong>;
          case 'Emphasis':
            return <Emphasis key={item.Guid} id={item.Guid}>{item.Children}</Emphasis>;
          case 'CodeInline':
            return <CodeInline key={item.Guid} id={item.Guid}>{item.TextContent}</CodeInline>;
          case 'Link':
            return <Link key={item.Guid} id={item.Guid} url={item.Attributes.Url || ''}>{item.Children}</Link>
          case 'Text':
          default:
            return <React.Fragment key={item.Guid}>{item.TextContent}</React.Fragment>;
        }
      })
  };

  return props.render(renderProps);
  };
  
  export default Paragraph;