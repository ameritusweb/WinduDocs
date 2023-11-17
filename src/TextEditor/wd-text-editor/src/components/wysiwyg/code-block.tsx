import React, { useState } from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface CodeBlockProps {
    id: string;
    language: string;
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[]) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ id, language, children, higherLevelChildren, rootUpdater }) => {

    return (
        <pre id={`pre-${id}`}>
            <code className={`rich-code language-${language}`}>
                {<Paragraph<HTMLParagraphElement> key={id} id={id} content={children} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }}  render={props => <p {...props}></p>} />}
            </code>
        </pre>
    );
};

export default CodeBlock;
