import React from "react";
import { AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";

export interface ParagraphProps {
    content: AstNode[];
}

const Paragraph: React.FC<ParagraphProps> = ({ content }) => {
    return (
      <p>
        {content.map((item) => {
          switch (item.NodeName) {
            case 'Strong':
              return <Strong key={item.Guid}>{item.Children}</Strong>;
            case 'Emphasis':
              return <Emphasis key={item.Guid}>{item.Children}</Emphasis>;
            case 'CodeInline':
              return <CodeInline key={item.Guid}>{item.TextContent}</CodeInline>;
            case 'Link':
              return <Link key={item.Guid} url={item.Attributes.Url || ''}>{item.TextContent}</Link>
            case 'Text':
            default:
              return <React.Fragment key={item.Guid}>{item.TextContent}</React.Fragment>;
          }
        })}
      </p>
    );
  };
  
  export default Paragraph;