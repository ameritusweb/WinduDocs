import React, { useState } from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";
import { handleListClick } from "../../rich-text-editor/handlers";

export interface UnorderedListProps {
    children: AstNode[];
}

const UnorderedList: React.FC<UnorderedListProps> = ({ children }) => {

    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(children);

    const updateContent = (nodes: AstNode[]) => {
        const upToDateAst = nodes.map((n) => Object.assign({}, n));
        setHigherLevelAst(upToDateAst);
    }

    const onClick = (event: React.MouseEvent<HTMLUListElement>) => {
        handleListClick(event);
    }
    
    return (
        <ul onClick={onClick}>
            {higherLevelAst.map((child) =>
                child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} id={child.Guid} updater={updateContent} children={child.Children} higherLevelChildren={children} /> : null
            )}
        </ul>
    );
};

export default UnorderedList;
