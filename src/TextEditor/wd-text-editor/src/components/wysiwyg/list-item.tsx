import React from "react";
import Paragraph from "./paragraph";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import { AstContext, AstNode } from "./interface";

export interface ListItemProps {
    id: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
    higherLevelChildren: AstNode[];
    higherLevelChild: AstNode;
}

const ListItem: React.FC<ListItemProps> = ({ id, context, pathIndices, children, higherLevelChildren, higherLevelChild }) => {
    return (
        <li id={id}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices];
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} context={context} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: higherLevelChildren, contentParent: higherLevelChild, id }} render={props => <p {...props}></p>} />;
                    case 'ListBlock':
                        if (child.Attributes.IsOrdered && child.Attributes.IsOrdered === 'True')
                        {
                            return <OrderedList key={child.Guid + (child.Version || '0')} context={context} id={child.Guid} pathIndices={[...childPathIndices, index]} higherLevelChild={child} children={child.Children} />;
                        }
                        else
                        {
                            return <UnorderedList key={child.Guid + (child.Version || '0')} context={context} id={child.Guid} pathIndices={[...childPathIndices, index]} higherLevelChild={child} children={child.Children} />;
                        }
                    default:
                        return null;
                }
            })}
        </li>
    );
};

export default ListItem;
