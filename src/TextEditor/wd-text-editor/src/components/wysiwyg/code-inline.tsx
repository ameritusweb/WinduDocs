import React from "react";

interface CodeInlineProps {
    id: string;
    children: string | null;
}

const CodeInline: React.FC<CodeInlineProps> = ({ id, children }) => {
    return <code id={id}>{children}</code>;
};

export default CodeInline;
