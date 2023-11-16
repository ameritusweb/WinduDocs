import React from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";

export interface UnorderedListProps {
    children: AstNode[];
}

const UnorderedList: React.FC<UnorderedListProps> = ({ children }) => {
    return (
        <ul>
            {children.map((child) =>
                child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} children={child.Children} /> : null
            )}
        </ul>
    );
};

export default UnorderedList;
