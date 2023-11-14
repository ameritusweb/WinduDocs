import React from "react";

interface CodeBlockProps {
    language: string;
    text: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, text }) => {
    // You can add language-specific formatting or syntax highlighting here
    return (
        <pre>
            <code className={`language-${language}`}>
                {text}
            </code>
        </pre>
    );
};

export default CodeBlock;
