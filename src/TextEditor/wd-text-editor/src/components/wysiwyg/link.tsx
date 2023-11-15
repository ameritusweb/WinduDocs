import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface LinkProps {
    id: string;
    url: string;
    children: AstNode[];
}

const Link: React.FC<LinkProps> = ({ id, url, children }) => {
    return <a id={id} href={url}>{<Paragraph key={`para-${id}`} id={`para-${id}`} content={children} higherLevelContent={[]} />}</a>;
};

export default Link;