import React, { useState } from "react";
import ListItem from "./list-item";
import { AstContext, AstNode } from "./interface";
import { handleListClick } from "../../rich-text-editor/handlers";
import UtilityContainer from "./utility-container";

export interface UnorderedListProps {
    isTopLevel?: boolean;
    id: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
    higherLevelChild: AstNode;
}

const UnorderedList: React.FC<UnorderedListProps> = ({ id, context, isTopLevel, pathIndices, children, higherLevelChild }) => {

    const [isFocused, setIsFocused] = useState(false);

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
        <section id={`section_${id}`}
            className="relative"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
        <ul id={id} onClick={onClick}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                return child.NodeName === 'ListItemBlock' ? 
                <ListItem 
                    key={child.Guid + (child.Version || '0')} 
                    id={child.Guid} 
                    context={{ ...context, isUnorderedList: true, types: [ ...context.types, 'ul' ] }}
                    pathIndices={childPathIndices} 
                    higherLevelChild={higherLevelChild} 
                    children={child.Children} 
                    higherLevelChildren={children} 
                /> : null
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
        <ul id={id} onClick={onClick}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                return child.NodeName === 'ListItemBlock' ? 
                <ListItem 
                    key={child.Guid + (child.Version || '0')} 
                    id={child.Guid}
                    context={{ ...context, isUnorderedList: true, types: [ ...context.types, 'ul' ] }}
                    pathIndices={childPathIndices} 
                    higherLevelChild={higherLevelChild} 
                    children={child.Children} 
                    higherLevelChildren={children} /> : null
            })}
        </ul>
    );
};

export default UnorderedList;
