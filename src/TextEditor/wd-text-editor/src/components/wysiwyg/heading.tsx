import React from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";

export interface HeadingProps {
    id: string;
    level: string;
    children: AstNode[];
}

export const Heading: React.FC<HeadingProps> = ({ id, level, children }) => {
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = level ? `h${level}` : 'p';
  
    const elementChildren = children.map((child) => {
        switch (child.NodeName) {
            case 'Text':
                return <Paragraph key={child.Guid} id={child.Guid} content={[child]} />;
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