import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface CodeBlockProps {
    id: string;
    pathIndices: number[];
    version: string;
    language: string;
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], updateProcessed: boolean) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ id, pathIndices, version, language, children, higherLevelChildren, rootUpdater }) => {

    return (
        <pre id={`pre-${id}`}>
            <code id={id} className={`rich-code language-${language}`}>
                {<Paragraph<HTMLParagraphElement> key={id} id={id} pathIndices={pathIndices} version={version} content={children} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }}  render={props => <p {...props}></p>} />}
            </code>
        </pre>
    );
};

export default CodeBlock;
