import React from "react";

interface CodeInlineProps {
    id: string;
    pathIndices: number[];
    children: string | null;
}

const CodeInline: React.FC<CodeInlineProps> = ({ id, pathIndices, children }) => {
    return <code id={`code_${id}`}><span id={`para_${id}`}>{children}</span></code>;
};

export default CodeInline;
