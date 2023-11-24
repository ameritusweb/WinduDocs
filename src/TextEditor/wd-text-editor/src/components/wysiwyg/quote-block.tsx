import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";
import UtilityContainer from "./utility-container";

interface QuoteBlockProps {
    id: string;
    pathIndices: number[];
    children: AstNode[];
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ id, pathIndices, children }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    return (
        <section id={`section_${id}`}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
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
