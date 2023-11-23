import React, { useState } from "react";
import ListItem from "./list-item";
import { AstNode } from "./interface";
import { handleListClick } from "../../rich-text-editor/handlers";
import UtilityContainer from "./utility-container";

export interface UnorderedListProps {
    isTopLevel?: boolean;
    pathIndices: number[];
    children: AstNode[];
}

const UnorderedList: React.FC<UnorderedListProps> = ({ isTopLevel, pathIndices, children }) => {

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

    const onClick = (event: React.MouseEvent<HTMLUListElement>) => {
        handleListClick(event);
    }
    
    return isTopLevel ? (
        <section className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
        <ul onClick={onClick}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                return child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} children={child.Children} higherLevelChildren={children} /> : null
            })}
        </ul>
        {(
            <UtilityContainer 
                show={isFocused}
                onCopy={handleCopy} 
                onCut={handleCut} 
                onDelete={handleDelete} 
                onPaste={handlePaste}
            />
        )}
        </section>
    ) : (
        <ul onClick={onClick}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                return child.NodeName === 'ListItemBlock' ? <ListItem key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} children={child.Children} higherLevelChildren={children} /> : null
            })}
        </ul>
    );
};

export default UnorderedList;
