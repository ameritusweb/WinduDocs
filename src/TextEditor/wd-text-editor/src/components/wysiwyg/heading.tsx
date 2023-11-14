import React, { useEffect, useRef } from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

export interface HeadingProps {
    level: string;
    children: AstNode[];
}

export const Heading: React.FC<HeadingProps> = ({ level, children }) => {
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = level ? `h${level}` : 'p';

    const headingRef = useRef<HTMLElement | null>(null);
    useRichTextEditor(children);

    const onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();

        children[0].TextContent = event.key;

        event.stopPropagation();

    }

    useEffect(() => {
        const curr = headingRef.current;

        curr?.addEventListener('keydown', onKeyDown, false);

        return () => {
            curr?.removeEventListener('keydown', onKeyDown, false);
        }
    }, []);
  
    const elementChildren = children.map((child) => {
        switch (child.NodeName) {
            case 'Text':
                return <Paragraph key={child.Guid} content={[child]} />;
            default:
                return null;
        }
    });

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { ref: headingRef, tabIndex: '1' },
        elementChildren      
    );
  };

  export default Heading;