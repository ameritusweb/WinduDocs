import React from "react";
import { AstContext } from "./interface";

interface CodeInlineProps {
    id: string;
    context: AstContext;
    pathIndices: number[];
    children: string | null;
}

const CodeInline: React.FC<CodeInlineProps> = ({ id, children }) => {
    return <code id={`code_${id}`}><span id={`para_${id}`}>{children}</span></code>;
};

export default CodeInline;
