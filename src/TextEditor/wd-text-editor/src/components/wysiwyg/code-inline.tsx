import React from "react";

interface CodeInlineProps {
    id: string;
    pathIndices: number[];
    children: string | null;
}

const CodeInline: React.FC<CodeInlineProps> = ({ id, pathIndices, children }) => {
    return <code id={id}>{children}</code>;
};

export default CodeInline;
