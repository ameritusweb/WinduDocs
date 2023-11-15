import React from "react";
import TableCell from "./table-cell";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";

interface TableRowProps {
    children: AstNode[];
    isHeader: boolean;
}

export interface TableHeaderProps {
    children: AstNode[];
}

const ThCell: React.FC<TableHeaderProps> = ({ children }) => <th>{children.map((child) => {
    switch (child.NodeName) {
        case 'ParagraphBlock':
            return <Paragraph key={child.Guid} id={child.Guid} content={child.Children} higherLevelContent={children} render={props => <span {...props}></span>}/>;
        default:
            return null;
    }
})}</th>;

const TableRow: React.FC<TableRowProps> = ({ children, isHeader }) => {
    return (
        <tr>
            {children.map((child) => {
                if (child.NodeName === 'TableCell') {
                    return isHeader ? 
                        <ThCell key={child.Guid}>{child.Children}</ThCell> :
                        <TableCell key={child.Guid} children={child.Children} />;
                }
                return null;
            })}
        </tr>
    );
};

export default TableRow;
