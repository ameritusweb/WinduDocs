import React from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";

interface OrderedListProps {
    children: AstNode[];
}

const OrderedList: React.FC<OrderedListProps> = ({ children }) => {
    return (
        <ol>
            {children.map((child) =>
                child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} children={child.Children} /> : null
            )}
        </ol>
    );
};

export default OrderedList;
