import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

export interface TableCellProps {
    children: AstNode[];
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
    return (
        <td>
            {children.map((child) => {
                switch (child.NodeName) {
                    case 'ParagraphBlock':
                        return <Paragraph key={child.Guid} id={child.Guid} content={child.Children} higherLevelContent={children} />;
                    default:
                        return null;
                }
            })}
        </td>
    );
};

export default TableCell;
