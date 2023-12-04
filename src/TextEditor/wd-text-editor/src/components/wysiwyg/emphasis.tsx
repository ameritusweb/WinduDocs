import React, { useEffect } from "react";
import Strong from "./strong";
import { AstContext, AstNode } from "./interface";
import { serializeContext } from "../../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "../../hooks/editor-data";

export interface EmphasisProps {
    id: string;
    parentId: string;
    context: AstContext;
    pathIndices: number[];
    children: AstNode[];
}

const Emphasis: React.FC<EmphasisProps> = ({ id, parentId, context, pathIndices, children }) => {

    const editorData: EditorDataType = EditorData;
    
    useEffect(() => {

        const broadcastEvent = (payload: any) => {
            editorData.emitEvent('*', parentId, payload);
        }
        
        
        editorData.events.subscribe(`${id}`, '*', broadcastEvent);
  
        return () => {
            
            editorData.events.unsubscribe(`${id}`);
        };
    }, [id]); 
    
    return (
        <em data-testid={serializeContext(context)} id={id}>
            {children.map((child, index) => {
                const childPathIndices = [...pathIndices, index];
                switch (child.NodeName) {
                    case 'Strong':
                        return <Strong key={child.Guid} id={child.Guid} parentId={id} context={{ ...context, isEmphasis: true, types: [...context.types, 'emphasis'] }} pathIndices={childPathIndices} children={child.Children} />;
                    case 'Text':
                        return <React.Fragment key={child.Guid}>{child.TextContent}</React.Fragment>;
                    default:
                        return null;
                }
            })}
        </em>
    );
};

export default Emphasis;
