import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface QuoteBlockProps {
    pathIndices: number[];
    children: AstNode[];
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ pathIndices, children }) => {

    return (
        <blockquote>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                    default:
                        return null;
                }
            })}
        </blockquote>
    );
};

export default QuoteBlock;
