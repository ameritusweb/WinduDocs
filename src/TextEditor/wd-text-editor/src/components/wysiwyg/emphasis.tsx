import React, { useRef } from "react";
import Strong from "./strong";
import { AstNode } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

export interface EmphasisProps {
    children: AstNode[];
}

const Emphasis: React.FC<EmphasisProps> = ({ children }) => {
    
    const emRef = useRef<HTMLElement | null>(null);
    const { updateAst } = useRichTextEditor(children);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        event.preventDefault();

        if (emRef.current) {
            updateAst(event, emRef.current);
        }

        event.stopPropagation();

    }
    
    return (
        <em ref={emRef} onKeyDown={onKeyDown} tabIndex={1}>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'Strong':
                        return <Strong key={child.Guid} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    default:
                        return null;
                }
            })}
        </em>
    );
};

export default Emphasis;
