import React from "react";
import Emphasis from "./emphasis";
import { AstNode } from "./interface";

export interface StrongProps {
    children: AstNode[];
}

const Strong: React.FC<StrongProps> = ({ children }) => {
    return (
        <strong>
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
