import React, { useState } from "react";
import TableRow from "./table-row";
import { AstNode } from "./interface";
import UtilityContainer from "./utility-container";
import TableUtilityContainer from "./table-utility-container";

export interface TableProps {
    id: string;
    pathIndices: number[];
    children: AstNode[];
}

const Table: React.FC<TableProps> = ({ id, pathIndices, children }) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};
    const handleAddRow = () => {/* Implement copy logic */};
    const handleAddColumn = () => {/* Implement paste logic */};

    return (
        <section id={`section_${id}`}
            className="relative"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1}>
             {(
                <UtilityContainer 
                    show={isFocused}
                    onCopy={handleCopy} 
                    onCut={handleCut} 
                    onDelete={handleDelete} 
                    onPaste={handlePaste}
                />
            )}
            <div className="relative table-cell pr-1 outline-none"
        tabIndex={1}>
                <table id={id}>
                    <tbody>
                        {children.map((child, index) => {
                            const childPathIndices = [...pathIndices, index];
                            if (child.NodeName === 'TableRow') {
                                const isHeader = child.Attributes && child.Attributes.IsHeader === "True";
                                return <TableRow key={child.Guid + (child.Version || '0')} pathIndices={childPathIndices} children={child.Children} isHeader={isHeader} />;
                            }
                            return null;
                        })}
                    </tbody>
                </table>
                {(
                <TableUtilityContainer 
                    show={isFocused}
                    onAddRow={handleAddRow} 
                    onAddColumn={handleAddColumn} 
                />
            )}
            </div>
        </section>
    );
};

export default Table;
