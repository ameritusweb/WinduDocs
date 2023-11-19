import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface CodeBlockProps {
    id: string;
    version: string;
    language: string;
    children: AstNode[];
    higherLevelChildren: AstNode[];
    rootUpdater: (nodes: AstNode[], guid: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ id, version, language, children, higherLevelChildren, rootUpdater }) => {

    return (
        <pre id={`pre-${id}`}>
            <code id={id} className={`rich-code language-${language}`}>
                {<Paragraph<HTMLParagraphElement> key={id} id={id} version={version} content={children} higherLevelContent={{ id: id, content: higherLevelChildren, updater: rootUpdater }}  render={props => <p {...props}></p>} />}
            </code>
        </pre>
    );
};

export default CodeBlock;
