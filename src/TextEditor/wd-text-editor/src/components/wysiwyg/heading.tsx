import React from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";

export interface HeadingProps {
    id: string;
    level: string;
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], guid: string) => void;
}

export const Heading: React.FC<HeadingProps> = ({ id, level, children, higherLevelChildren, rootUpdater }) => {
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = level ? `h${level}` : 'p';
  
    const elementChildren = children.map((child) => {
        switch (child.NodeName) {
            case 'Text':
                return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} content={[child]} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }} render={props => <p {...props}></p>} />;
            default:
                return null;
        }
    });

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { 'id': `${id}` },
        elementChildren      
    );
  };

  export default Heading;