import React from "react";
import TableRow from "./table-row";
import { AstNode } from "./interface";

export interface TableProps {
    id: string;
    children: AstNode[];
}

const Table: React.FC<TableProps> = ({ id, children }) => {
    return (
        <table id={id}>
            <tbody>
                {children.map((child) => {
                    if (child.NodeName === 'TableRow') {
                        const isHeader = child.Attributes && child.Attributes.IsHeader === "True";
                        return <TableRow key={child.Guid + (child.Version || '0')} children={child.Children} isHeader={isHeader} />;
                    }
                    return null;
                })}
            </tbody>
        </table>
    );
};

export default Table;
