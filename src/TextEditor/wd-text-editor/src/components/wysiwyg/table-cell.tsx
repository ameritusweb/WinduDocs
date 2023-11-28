import React from "react";
import Paragraph from "./paragraph";
import { AstContext, AstNode } from "./interface";

export interface TableCellProps {
    pathIndices: number[];
    children: AstNode[];
    context: AstContext;
}

const TableCell: React.FC<TableCellProps> = ({ pathIndices, children, context }) => {
    return (
        <td>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph key={child.Guid + (child.Version || '0')} context={context} pathIndices={childPathIndices} id={child.Guid} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <span {...props}></span>}/>;
                    default:
                        return null;
                }
            })}
        </td>
    );
};

export default TableCell;
