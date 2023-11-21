import React, { useState } from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";
import { handleListClick } from "../../rich-text-editor/handlers";

export interface UnorderedListProps {
    pathIndices: number[];
    children: AstNode[];
}

const UnorderedList: React.FC<UnorderedListProps> = ({ pathIndices, children }) => {

    const onClick = (event: React.MouseEvent<HTMLUListElement>) => {
        handleListClick(event);
    }
    
    return (
        <ul onClick={onClick}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                return child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} children={child.Children} higherLevelChildren={children} /> : null
            })}
        </ul>
    );
};

export default UnorderedList;
