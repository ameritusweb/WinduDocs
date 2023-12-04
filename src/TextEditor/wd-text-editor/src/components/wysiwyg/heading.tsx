import React, { useState } from "react";
import { AstContext, AstNode } from "./interface";
import Paragraph from "./paragraph";
import UtilityContainer from "./utility-container";

export interface HeadingProps {
    id: string;
    context: AstContext;
    version: string;
    level: string;
    pathIndices: number[];
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], updateProcessed: boolean) => void;
}

export const Heading: React.FC<HeadingProps> = ({ id, context, version, level, pathIndices, children, higherLevelChildren, rootUpdater }) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};
    
    
    const Tag = level ? `h${level}` : 'p';
  
    const element = <Paragraph<HTMLParagraphElement> pathIndices={pathIndices} context={{ ...context, isHeading: true, types: [ ...context.types, 'h' ] }} id={id} version={version} content={children} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }} render={props => <p {...props}></p>} />;

    
    return (
        <section id={`section_${id}`}
            className="relative"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} 
        >
        {React.createElement(
      Tag,
      { 'id': `${id}`, 'version': `${version}` },
        element     
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