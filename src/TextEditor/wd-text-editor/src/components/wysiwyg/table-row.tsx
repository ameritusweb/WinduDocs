import React from "react";
import TableCell from "./table-cell";
import { AstNode } from "./interface";
import TableHeaderCell from "./table-header-cell";

interface TableRowProps {
    children: AstNode[];
    isHeader: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, isHeader }) => {
    return (
        <tr>
            {children.map((child) => {
                if (child.NodeName === 'TableCell') {
                    return isHeader ? 
                        <TableHeaderCell key={child.Guid + (child.Version || '0')}>{child.Children}</TableHeaderCell> :
                        <TableCell key={child.Guid + (child.Version || '0')} children={child.Children} />;
                }
                return null;
            })}
        </tr>
    );
};

export default TableRow;
