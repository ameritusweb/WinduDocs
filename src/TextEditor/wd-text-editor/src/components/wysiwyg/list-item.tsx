import React from "react";
import Paragraph from "./paragraph";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import { AstNode } from "./interface";

export interface ListItemProps {
    id: string;
    pathIndices: number[];
    children: AstNode[];
    higherLevelChildren: AstNode[];
}

const ListItem: React.FC<ListItemProps> = ({ id, pathIndices, children, higherLevelChildren }) => {
    return (
        <li id={id}>
            {children.map((child) => {
                const childPathIndices = [...pathIndices];
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: higherLevelChildren, id }} render={props => <p {...props}></p>} />;
                    case 'ListBlock':
                        if (child.Attributes.IsOrdered && child.Attributes.IsOrdered === 'True')
                        {
                            return <OrderedList key={child.Guid + (child.Version || '0')} pathIndices={childPathIndices} children={child.Children} />;
                        }
                        else
                        {
                            return <UnorderedList key={child.Guid + (child.Version || '0')} pathIndices={childPathIndices} children={child.Children} />;
                        }
                    default:
                        return null;
                }
            })}
        </li>
    );
};

export default ListItem;
