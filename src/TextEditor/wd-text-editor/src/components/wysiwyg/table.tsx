import React, { useState } from "react";
import TableRow from "./table-row";
import { AstNode } from "./interface";
import UtilityContainer from "./utility-container";

export interface TableProps {
    id: string;
    pathIndices: number[];
    children: AstNode[];
}

const Table: React.FC<TableProps> = ({ id, pathIndices, children }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    return (
        <section className="relative"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={1}>
             {isFocused && (
                <UtilityContainer 
                    show={true}
                    onCopy={handleCopy} 
                    onCut={handleCut} 
                    onDelete={handleDelete} 
                    onPaste={handlePaste}
                />
            )}
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
        </section>
    );
};

export default Table;
