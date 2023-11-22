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
                {children.map((child, index) => {
                    const childPathIndices = [...pathIndices, index];
                    switch (child.NodeName) {
                        case 'Text':
                            return <Paragraph<HTMLParagraphElement> key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={[child]} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                        default:
                            return null;
                    }
                })}
            </code>
        </pre>
    );
};

export default CodeBlock;
