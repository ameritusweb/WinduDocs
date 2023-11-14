import React from "react";
import Emphasis from "./emphasis";
import { AstNode } from "./interface";

export interface StrongProps {
    id: string;
    children: AstNode[];
}

const Strong: React.FC<StrongProps> = ({ id, children }) => {
    return (
        <strong id={id}>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'Emphasis':
                        return <Emphasis key={child.Guid} id={child.Guid} children={child.Children} />;
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
