import React, { useState } from "react";
import ListItem from "./list-item";
import { AstContext, AstNode } from "./interface";
import { handleListClick } from "../../rich-text-editor/handlers";
import UtilityContainer from "./utility-container";

interface OrderedListProps {
    isTopLevel?: boolean;
    id: string;
    context: AstContext;
    pathIndices: number[];
    higherLevelChild: AstNode;
    children: AstNode[];
}

const OrderedList: React.FC<OrderedListProps> = ({ id, context, isTopLevel, pathIndices, higherLevelChild, children }) => {

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
    
    return (
        isTopLevel ? (
            <section id={`section_${id}`}
                className="relative"
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={1} // Make it focusable if needed
            >
                <ol id={id} onClick={onClick}>
                    {children.map((child, index) => {
                        const childPathIndices = [...pathIndices, index];
                        return child.NodeName === 'ListItemBlock' ? (
                            <ListItem 
                                key={child.Guid + (child.Version || '0')} 
                                id={child.Guid} 
                                context={{ ...context, isOrderedList: true, types: [ ...context.types, 'ordered-list' ] }}
                                pathIndices={childPathIndices} 
                                children={child.Children} 
                                higherLevelChildren={children} 
                                higherLevelIndex={index}
                                higherLevelChild={higherLevelChild}
                            />
                        ) : null;
                    })}
                </ol>
                <UtilityContainer 
                    show={isFocused}
                    onCopy={handleCopy} 
                    onCut={handleCut} 
                    onDelete={handleDelete} 
                    onPaste={handlePaste}
                />
            </section>
        ) : (
            <ol id={id} onClick={onClick}>
                {children.map((child, index) => {
                    const childPathIndices = [...pathIndices, index];
                    return child.NodeName === 'ListItemBlock' ? (
                        <ListItem 
                            key={child.Guid + (child.Version || '0')} 
                            id={child.Guid} 
                            context={{ ...context, isOrderedList: true, types: [ ...context.types, 'ol' ] }}
                            pathIndices={childPathIndices} 
                            children={child.Children} 
                            higherLevelChildren={children} 
                            higherLevelChild={higherLevelChild}
                            higherLevelIndex={index}
                        />
                    ) : null;
                })}
            </ol>
        )
    );    
};

export default OrderedList;
