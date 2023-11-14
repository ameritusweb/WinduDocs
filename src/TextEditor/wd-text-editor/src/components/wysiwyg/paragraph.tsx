import React, { useState } from "react";
import { AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

export interface ParagraphProps {
    id: string;
    content: AstNode[];
}

const Paragraph: React.FC<ParagraphProps> = ({ id, content }) => {

    const [ast, setAst] = useState<AstNode[]>(content);
    const { updateAst } = useRichTextEditor();

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        event.preventDefault();

        const update = updateAst(event, ast);
        setAst(update.map((u) => Object.assign({}, u)));

        event.stopPropagation();

    }

    return (
      <p id={id} tabIndex={1} contentEditable={true} suppressContentEditableWarning={true} onKeyDown={onKeyDown}>
        {ast.map((item) => {
          switch (item.NodeName) {
            case 'Strong':
              return <Strong key={item.Guid} id={item.Guid}>{item.Children}</Strong>;
            case 'Emphasis':
              return <Emphasis key={item.Guid} id={item.Guid}>{item.Children}</Emphasis>;
            case 'CodeInline':
              return <CodeInline key={item.Guid} id={item.Guid}>{item.TextContent}</CodeInline>;
            case 'Link':
              return <Link key={item.Guid} id={item.Guid} url={item.Attributes.Url || ''}>{item.TextContent}</Link>
            case 'Text':
            default:
              return <React.Fragment key={item.Guid}>{item.TextContent}</React.Fragment>;
          }
        })}
      </p>
    );
  };
  
  export default Paragraph;