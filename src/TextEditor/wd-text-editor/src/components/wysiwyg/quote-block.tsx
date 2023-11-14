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
                        return <Paragraph key={child.Guid} content={child.Children} />;
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
