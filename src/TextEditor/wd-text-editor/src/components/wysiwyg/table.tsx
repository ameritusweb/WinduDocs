import React from "react";
import TableRow from "./table-row";
import { AstNode } from "./interface";

export interface TableProps {
    children: AstNode[];
}

const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <table>
            <tbody>
                {children.map((child) => {
                    if (child.NodeName === 'TableRow') {
                        const isHeader = child.Attributes && child.Attributes.IsHeader === "True";
                        return <TableRow key={child.Guid} children={child.Children} isHeader={isHeader} />;
                    }
                    return null;
                })}
            </tbody>
        </table>
    );
};

export default Table;
