import React, { useState } from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";
import UtilityContainer from "./utility-container";

export interface HeadingProps {
    id: string;
    version: string;
    level: string;
    pathIndices: number[];
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], updateProcessed: boolean) => void;
}

export const Heading: React.FC<HeadingProps> = ({ id, version, level, pathIndices, children, higherLevelChildren, rootUpdater }) => {

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
    
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = level ? `h${level}` : 'p';
  
    const elementChildren = children.map((child) => {
        const childPathIndices = [...pathIndices];
        switch (child.NodeName) {
            case 'Text':
                return <Paragraph<HTMLParagraphElement> key={child.Guid} pathIndices={childPathIndices} id={child.Guid} version={child.Version || 'V0'} content={[child]} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }} render={props => <p {...props}></p>} />;
            default:
                return null;
        }
    });

    // Use React.createElement to dynamically create the element
    return (
        <section id={`section_${id}`}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
        {React.createElement(
      Tag,
      { 'id': `${id}`, 'version': `${version}` },
        elementChildren      
    )}
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

  export default Heading;