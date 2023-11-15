import React, { useRef, useState } from "react";
import { AstNode } from "./interface";
import Paragraph from "./paragraph";
import Heading from "./heading";
import OrderedList from "./ordered-list";
import UnorderedList from "./unordered-list";
import Table from "./table";
import QuoteBlock from "./quote-block";
import HorizontalRule from "./horizontal-rule";
import CodeBlock from "./code-block";
import AlertBlock from "./alert-block";
import ast from './test-data.json';
import './rich-text-editor.css';
import { BlankLine } from "./blank-line";
import { useMarkdownGenerator } from "../../hooks/use-markdown-generator";

const RichTextEditor = () => {

    const astRef = useRef<AstNode>(ast);
    const { convertToMarkdown } = useMarkdownGenerator();
    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(ast.Children);

    const updateContent = (nodes: AstNode[]) => {
        setHigherLevelAst(nodes.map((n) => Object.assign({}, n)));
    }

    const renderNode = (node: AstNode, higherLevelContent: AstNode[]) => {
        switch (node.NodeName) {
            case 'ParagraphBlock':
                return <Paragraph<HTMLParagraphElement> key={node.Guid} id={node.Guid} content={node.Children} higherLevelContent={{ content: higherLevelContent, updater: updateContent }} render={props => <p {...props}></p>}/>;
            case 'HeadingBlock':
                return <Heading key={node.Guid} id={node.Guid} level={node.Attributes.Level || ''} children={node.Children} rootUpdater={updateContent} />;
            case 'OrderedListBlock':
                return <OrderedList key={node.Guid} children={node.Children} />;
            case 'UnorderedListBlock':
                return <UnorderedList key={node.Guid} children={node.Children} />;
            case 'Table':
                return <Table key={node.Guid} id={node.Guid} children={node.Children} />;
            case 'ListBlock':
                if (node.Attributes.IsOrdered && node.Attributes.IsOrdered === 'True') {
                    return <OrderedList key={node.Guid} children={node.Children} />
                } else {
                    return <UnorderedList key={node.Guid} children={node.Children} />
                }
            case 'QuoteBlock':
                return <QuoteBlock key={node.Guid} children={node.Children} />;
            case 'ThematicBreakBlock':
                return <HorizontalRule id={node.Guid} key={node.Guid} />;
             case 'FencedCodeBlock':
                if (node.Attributes.Language && node.Attributes.Language.startsWith('type-alert-')) {
                    return <AlertBlock key={node.Guid} id={node.Guid} type={node.Attributes.Language} node={node} />;
                } else {
                    return <CodeBlock key={node.Guid} id={node.Guid} language={node.Attributes.Language || ''} node={node} />;
                }
            case 'BlankLine':
                return <BlankLine key={node.Guid} format={null} self={node} higherLevelContent={{ content: higherLevelContent, updater: updateContent }} />
            // ... handle other types as needed
            default:
                return null;
        }
    };

    const editorRef = useRef<HTMLDivElement | null>(null);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

        event.preventDefault();

        const markdown = convertToMarkdown(astRef.current, 0);
        console.log(JSON.stringify(markdown, null, 2));
    }

    return (
        <div className='relative w-full' style={{ padding: '10px', minHeight: '30px'}}>
            <div key={ast.Guid} 
                 ref={editorRef}
                 onKeyDown={onKeyDown}
                 className="bg-white absolute top-0 left-0 w-full min-h-[100px] overflow-auto outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_5rem] cursor-text text-left text-base"
                 id="richTextEditor"
                 style={{
                 color: 'rgba(100, 100, 100, 1)',
                 fontFamily: 'Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace'
                 }}>
                 {higherLevelAst.map((c) => renderNode(c, higherLevelAst))}
            </div>
        </div>
    );
};

export default RichTextEditor;
