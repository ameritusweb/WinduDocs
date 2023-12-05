import React, { useEffect } from "react";
import Emphasis from "./emphasis";
import { AstContext, AstNode } from "./interface";
import { serializeContext } from "../../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "../../hooks/editor-data";

export interface StrongProps {
    id: string;
    parentId: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
}

const Strong: React.FC<StrongProps> = ({ id, parentId, context, pathIndices, children }) => {

    const editorData: EditorDataType = EditorData;
    
    useEffect(() => {

        const broadcastEvent = (payload: object | null) => {
            editorData.emitEvent('*', parentId, payload);
        }
        
        
        editorData.events.subscribe(`${id}`, '*', broadcastEvent);
  
        return () => {
            
            editorData.events.unsubscribe(`${id}`);
        };
    }, [id]); 

    return (
        <strong data-testid={serializeContext(context)} id={id}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'Emphasis':
                        return <Emphasis key={child.Guid} id={child.Guid} parentId={id} context={{ ...context, isStrong: true, types: [...context.types, 'strong'] }} pathIndices={childPathIndices} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    default:
                        return null;
                }
            })}
        </strong>
    );
};

export default Strong;
