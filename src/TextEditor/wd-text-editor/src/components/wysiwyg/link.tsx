import React from "react";
import Paragraph from "./paragraph";
import { AstContext, AstNode } from "./interface";

interface LinkProps {
    id: string;
    pathIndices: number[];
    context: AstContext;
    version: string;
    url: string;
    children: AstNode[];
}

const Link: React.FC<LinkProps> = ({ id, pathIndices, context, version, url, children }) => {
    return <a id={id} href={url}>{
            <Paragraph 
                key={id} 
                id={id} 
                version={version || 'V0'} 
                context={{ ...context, isLink: true, types: [ ...context.types, 'a' ] }} 
                pathIndices={pathIndices} 
                content={children} 
                higherLevelContent={{ content: [] }} 
                render={props => <span {...props}></span>} 
            />}
        </a>;
};

export default Link;