import React from "react";

interface CodeInlineProps {
    children: string | null;
}

const CodeInline: React.FC<CodeInlineProps> = ({ children }) => {
    return <code>{children}</code>;
};

export default CodeInline;
