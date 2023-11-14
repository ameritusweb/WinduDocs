import React, { useRef } from "react";
import Emphasis from "./emphasis";
import { AstNode } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

export interface StrongProps {
    children: AstNode[];
}

const Strong: React.FC<StrongProps> = ({ children }) => {

    const strongRef = useRef<HTMLElement | null>(null);
    const { updateAst } = useRichTextEditor(children);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        event.preventDefault();

        if (strongRef.current) {
            updateAst(event, strongRef.current);
        }

        event.stopPropagation();

    }

    return (
        <strong ref={strongRef} onKeyDown={onKeyDown} tabIndex={1}>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'Emphasis':
                        return <Emphasis key={child.Guid} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    default:
                        return null;
                }
            })}
        </strong>
    );
};

export default Strong;
