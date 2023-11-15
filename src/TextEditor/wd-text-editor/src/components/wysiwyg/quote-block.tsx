import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";
import { BlankLine } from "./blank-line";

interface QuoteBlockProps {
    children: AstNode[];
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ children }) => {
    return (
        <blockquote>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid} id={child.Guid} content={child.Children} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                    case 'BlankLine':
                        return <BlankLine key={child.Guid} />;
                    // Handle other node types if necessary
                    default:
                        return null;
                }
            })}
        </blockquote>
    );
};

export default QuoteBlock;
