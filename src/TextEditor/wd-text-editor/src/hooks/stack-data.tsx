import { ASTNode } from "./use-stack";

interface StackDataType {
    _stacks: (ASTNode[])[];
    _stackHeight: number;
}

class StackData {

    // Shared properties
    get stacks(): (ASTNode[])[]
    {
        return ((StackData.prototype as any) as StackDataType)._stacks;
    }
    
    set stacks(nodes: (ASTNode[])[]) {
        ((StackData.prototype as any) as StackDataType)._stacks = nodes;
    }

    get stackHeight(): number
    {
        return ((StackData.prototype as any) as StackDataType)._stackHeight;
    }
    
    set stackHeight(height: number) {
        ((StackData.prototype as any) as StackDataType)._stackHeight = height;
    }

}

// Initialize the shared properties
((StackData.prototype as any) as StackDataType)._stacks = [[]];
((StackData.prototype as any) as StackDataType)._stackHeight = -1;

export default new StackData();
