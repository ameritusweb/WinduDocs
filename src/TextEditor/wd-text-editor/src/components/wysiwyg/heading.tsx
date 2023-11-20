import React from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";

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
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = level ? `h${level}` : 'p';
  
    const elementChildren = children.map((child, index) => {
        const childPathIndices = [...pathIndices, index];
        switch (child.NodeName) {
            case 'Text':
                return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} pathIndices={childPathIndices} id={child.Guid} version={child.Version || 'V0'} content={[child]} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }} render={props => <p {...props}></p>} />;
            default:
                return null;
        }
    });

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { 'id': `${id}`, 'version': `${version}` },
        elementChildren      
    );
  };

  export default Heading;