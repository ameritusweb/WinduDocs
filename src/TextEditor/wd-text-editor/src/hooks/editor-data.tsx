import { ASTNode } from "./use-stack";

export interface EditorDataType {
    stacks: (ASTNode[])[];
    stackHeight: number;
    maxStackHeight: number;
    preState: string;
    lastNode: Text | null;
    lastChangedAST: ASTNode | null;
    lastCharacter: string | null;
    editorState: string;
}

export class EditorData implements EditorDataType {

    constructor(stacks: (ASTNode[])[], stackHeight: number, maxStackHeight: number, preState: string, 
    lastNode: Text | null, lastChangedAST: ASTNode | null, lastCharacter: string | null, editorState: string) {
        this.stacks = stacks;
        this.stackHeight = stackHeight;
        this.maxStackHeight = maxStackHeight;
        this.preState = preState;
        this.lastNode = lastNode;
        this.lastChangedAST = lastChangedAST;
        this.lastCharacter = lastCharacter;
        this.editorState = editorState;
    }

    stacks: (ASTNode[])[];
    stackHeight: number;
    maxStackHeight: number;
    preState: string;
    lastNode: Text | null;
    lastChangedAST: ASTNode | null;
    lastCharacter: string | null;
    editorState: string;
}

export default new EditorData([[]], 0, 0, '', null, null, null, 'unselected');
