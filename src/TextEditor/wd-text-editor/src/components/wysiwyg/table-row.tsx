import React from "react";
import TableCell from "./table-cell";
import { AstContext, AstNode } from "./interface";
import TableHeaderCell from "./table-header-cell";

interface TableRowProps {
    children: AstNode[];
    context: AstContext;
    pathIndices: number[];
    isHeader: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ context, children, pathIndices, isHeader }) => {
    return (
        <tr>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                if (child.NodeName === 'TableCell') {
                    return isHeader ? 
                        <TableHeaderCell key={child.Guid + (child.Version || '0')} context={context} pathIndices={childPathIndices} >{child.Children}</TableHeaderCell> :
                        <TableCell key={child.Guid + (child.Version || '0')} context={context} pathIndices={childPathIndices} children={child.Children} />;
                }
                return null;
            })}
        </tr>
    );
};

export default TableRow;
