import { ASTNode } from "./use-stack";

interface StackDataType {
    stacks: (ASTNode[])[];
    stackHeight: number;
    maxStackHeight: number;
    preState: string;
    lastNode: Text | null;
    lastChangedAST: ASTNode | null;
    lastCharacter: string | null;
}

class StackData implements StackDataType {

    constructor(stacks: (ASTNode[])[], stackHeight: number, maxStackHeight: number, preState: string, lastNode: Text | null, lastChangedAST: ASTNode | null, lastCharacter: string | null) {
        this.stacks = stacks;
        this.stackHeight = stackHeight;
        this.maxStackHeight = maxStackHeight;
        this.preState = preState;
        this.lastNode = lastNode;
        this.lastChangedAST = lastChangedAST;
        this.lastCharacter = lastCharacter;
    }

    stacks: (ASTNode[])[];
    stackHeight: number;
    maxStackHeight: number;
    preState: string;
    lastNode: Text | null;
    lastChangedAST: ASTNode | null;
    lastCharacter: string | null;
}

export default new StackData([[]], 0, 0, '', null, null, null);
