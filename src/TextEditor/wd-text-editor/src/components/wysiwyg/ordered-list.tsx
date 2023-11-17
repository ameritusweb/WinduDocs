import React, { useState } from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";

interface OrderedListProps {
    children: AstNode[];
}

const OrderedList: React.FC<OrderedListProps> = ({ children }) => {

    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(children);

    const updateContent = (nodes: AstNode[]) => {
        const upToDateAst = nodes.map((n) => Object.assign({}, n));
        setHigherLevelAst(upToDateAst);
    }
    
    return (
        <ol>
            {higherLevelAst.map((child) =>
                child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} id={child.Guid} updater={updateContent} children={child.Children} higherLevelChildren={children} /> : null
            )}
        </ol>
    );
};

export default OrderedList;
