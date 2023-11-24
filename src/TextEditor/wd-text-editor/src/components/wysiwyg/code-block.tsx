import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";
import UtilityContainer from "./utility-container";

interface CodeBlockProps {
    id: string;
    pathIndices: number[];
    version: string;
    language: string;
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], updateProcessed: boolean) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ id, pathIndices, version, language, children, higherLevelChildren, rootUpdater }) => {

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
        <pre id={`pre_${id}`}>
            <code id={id} className={`rich-code language-${language}`}>
                {children.map((child, index) => {
                    const childPathIndices = [...pathIndices, index];
                    switch (child.NodeName) {
                        case 'Text':
                            return <Paragraph<HTMLParagraphElement> key={child.Guid} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={[child]} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                        default:
                            return null;
                    }
                })}
            </code>
        </pre>
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

export default CodeBlock;
