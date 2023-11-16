import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface QuoteBlockProps {
    children: AstNode[];
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ children }) => {

    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(children);

    const updateContent = (nodes: AstNode[]) => {
        const upToDateAst = nodes.map((n) => Object.assign({}, n));
        setHigherLevelAst(upToDateAst);
    }

    return (
        <blockquote>
            {higherLevelAst.map((child) => {
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} content={child.Children} higherLevelContent={{ content: children, updater: updateContent }} render={props => <p {...props}></p>} />;
                    default:
                        return null;
                }
            })}
        </blockquote>
    );
};

export default QuoteBlock;
