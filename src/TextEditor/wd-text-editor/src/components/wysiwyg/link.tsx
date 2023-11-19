import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface LinkProps {
    id: string;
    version: string;
    url: string;
    children: AstNode[];
}

const Link: React.FC<LinkProps> = ({ id, version, url, children }) => {
    return <a id={id} href={url}>{<Paragraph key={id} id={id} version={version || 'V0'} content={children} higherLevelContent={{ content: [] }} render={props => <span {...props}></span>} />}</a>;
};

export default Link;