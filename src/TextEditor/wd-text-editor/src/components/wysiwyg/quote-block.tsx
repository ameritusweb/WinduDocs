import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstContext, AstNode } from "./interface";
import UtilityContainer from "./utility-container";

interface QuoteBlockProps {
    id: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ id, context, pathIndices, children }) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    return (
        <section id={`section_${id}`}
            className="relative"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
        <blockquote>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} context={{ ...context, isQuoteBlock: true, types: [ ...context.types, 'quote' ] }} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                    default:
                        return null;
                }
            })}
        </blockquote>
        {(
                    <UtilityContainer 
                        show={isFocused}
                        onCopy={handleCopy} 
                        onCut={handleCut} 
                        onDelete={handleDelete} 
                        onPaste={handlePaste}
                    />
                )}
        </section>
    );
};

export default QuoteBlock;
