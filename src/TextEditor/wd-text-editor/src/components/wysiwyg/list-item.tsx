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
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                    case 'ListBlock':
                        if (child.Attributes.IsOrdered && child.Attributes.IsOrdered === 'True')
                        {
                            return <OrderedList key={child.Guid + (child.Version || '0')} children={child.Children} />;
                        }
                        else
                        {
                            return <UnorderedList key={child.Guid + (child.Version || '0')} children={child.Children} />;
                        }
                    default:
                        return null;
                }
            })}
        </li>
    );
};

export default ListItem;
