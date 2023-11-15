import React from "react";
import Paragraph from "./paragraph";
import { AstNode } from "./interface";

interface CodeBlockProps {
    id: string;
    language: string;
    node: AstNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ id, language, node }) => {

    return (
        <pre>
            <code className={`rich-code language-${language}`}>
                {<Paragraph key={`para-${id}`} id={`para-${id}`} content={[node]} higherLevelContent={[]} />}
            </code>
        </pre>
    );
};

export default CodeBlock;
