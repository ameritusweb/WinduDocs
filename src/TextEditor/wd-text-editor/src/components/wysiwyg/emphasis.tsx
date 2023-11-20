import React from "react";
import Strong from "./strong";
import { AstNode } from "./interface";

export interface EmphasisProps {
    id: string;
    pathIndices: number[];
    children: AstNode[];
}

const Emphasis: React.FC<EmphasisProps> = ({ id, pathIndices, children }) => {
    return (
        <em id={id}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'Strong':
                        return <Strong key={child.Guid} id={child.Guid} pathIndices={childPathIndices} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    case 'Emphasis':
                        return child.Children.map((child) => {
                            return <Strong key={child.Guid} id={child.Guid} pathIndices={childPathIndices} children={child.Children} />;
                        });
                    default:
                        return null;
                }
            })}
        </em>
    );
};

export default Emphasis;
