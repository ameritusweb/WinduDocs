import React from "react";
import Strong from "./strong";
import { AstNode } from "./interface";

export interface EmphasisProps {
    children: AstNode[];
}

const Emphasis: React.FC<EmphasisProps> = ({ children }) => {
    return (
        <em>
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
