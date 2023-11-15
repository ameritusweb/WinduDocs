import React, { HTMLAttributes, MutableRefObject, useEffect, useRef, useState } from "react";
import { AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

type ParagraphProps = {
  id: string;
  content: AstNode[];
  higherLevelContent: AstNode[];
  render?: (props: { children: React.ReactNode }) => JSX.Element;
};

type DynamicTagProps = HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> & ParagraphProps;

const Paragraph: React.FC<DynamicTagProps> = ({ id, content, higherLevelContent, render }) => {

    const [ast, setAst] = useState<AstNode[]>(content);
    const { updateAst } = useRichTextEditor();
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const cursorPositionRef = useRef<number>(0);

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

        const update = updateAst(event, ast);
        saveCursorPosition(update.type);
        setAst(update.nodes.map((u) => Object.assign({}, u)));

        if (event.code === 'Space') {
          return;
        }
        event.stopPropagation();

    }

    if (render)
    {
      return render({
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
      });
  }

    return (
      <span id={id} ref={paraRef} className="rich-para" tabIndex={1} contentEditable={true} suppressContentEditableWarning={true} onKeyDown={onKeyDown}>
        {ast.map((item) => {
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
        })}
      </span>
    );
  };
  
  export default Paragraph;