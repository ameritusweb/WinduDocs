import React from "react";
import Strong from "./strong";
import { AstNode } from "./interface";

export interface EmphasisProps {
    id: string;
    children: AstNode[];
}

const Emphasis: React.FC<EmphasisProps> = ({ id, children }) => {
    return (
        <em id={id}>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'Strong':
                        return <Strong key={child.Guid} id={child.Guid} children={child.Children} />;
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
