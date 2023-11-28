import React from "react";
import Emphasis from "./emphasis";
import { AstContext, AstNode } from "./interface";

export interface StrongProps {
    id: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
}

const Strong: React.FC<StrongProps> = ({ id, context, pathIndices, children }) => {
    return (
        <strong id={id}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'Emphasis':
                        return <Emphasis key={child.Guid} id={child.Guid} context={{ ...context, isStrong: true, types: [...context.types, 'strong'] }} pathIndices={childPathIndices} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    case 'Strong':
                        return child.Children.map((child) => {
                            return <Emphasis key={child.Guid} id={child.Guid} context={{ ...context, isStrong: true, types: [...context.types, 'strong'] }} pathIndices={childPathIndices} children={child.Children} />;
                        });
                    default:
                        return null;
                }
            })}
        </strong>
    );
};

export default Strong;
