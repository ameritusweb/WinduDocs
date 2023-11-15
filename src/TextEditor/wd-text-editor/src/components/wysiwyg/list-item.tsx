import React from "react";
import Paragraph from "./paragraph";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import { AstNode } from "./interface";

export interface ListItemProps {
    children: AstNode[];
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
    return (
        <li>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph key={child.Guid} id={child.Guid} content={child.Children} higherLevelContent={{ content: children }} render={props => <span {...props}></span>} />;
                    case 'ListBlock':
                        if (child.Attributes.IsOrdered && child.Attributes.IsOrdered === 'True')
                        {
                            return <OrderedList key={child.Guid} children={child.Children} />;
                        }
                        else
                        {
                            return <UnorderedList key={child.Guid} children={child.Children} />;
                        }
                    default:
                        return null;
                }
            })}
        </li>
    );
};

export default ListItem;
