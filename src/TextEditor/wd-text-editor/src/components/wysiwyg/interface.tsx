export interface AstNodeAttributes {
    Level?: string;
    Url?: string;
    Title?: string;
    IsHeader?: string;
    IsOrdered?: string;
    Language?: string;
  }

export interface AstNode {
    NodeName: string;
    Attributes: AstNodeAttributes;
    ChildIndex: number;
    Guid: string;
    Depth: number;
    TextContent: string | null;
    Children: AstNode[];
  }

  export interface HigherLevelProps {
    id?: string;
    content: AstNode[];
    updater?: (nodes: AstNode[]) => void;
  }

  export interface AstUpdate {
    nodes: AstNode[];
    type: string;
}

export type AstOperationType = 'add' | 'remove' | 'update';

export interface AstOperation<Type extends AstOperationType = 'add' | 'remove' | 'update'> {
  type: Type;
  targetNodeId: string;
  payload?: OperationPayloads[Type];
  timestamp: number;
  oldState?: AstNode | AstNodeAttributes; // Adjust this based on what oldState represents
}

export interface AddNodeParams {
  parentNodeId: string;
  newNode: AstNode;
}

export interface RemoveNodeParams {
  nodeId: string;
}

export interface UpdateNodeParams {
  nodeId: string;
  newAttributes: AstNodeAttributes;
  oldAttributes: AstNodeAttributes;
}

export type Transaction = AstOperation[];

export interface IHistoryManager {
  clear(): void;
  recordOperation(operation: AstOperation, partOfTransaction?: boolean): void;
  recordOperationsAsTransaction(operations: AstOperation[], historyManager: IHistoryManager): void;
  performOperationsAsTransaction(ast: AstNode, operations: AstOperation[], historyManager: IHistoryManager): AstNode;
  performOperation(ast: AstNode, operation: AstOperation, partOfTransaction?: boolean): AstNode;
  getReverseOperation(operation: AstOperation): AstOperation;
  undo(ast: AstNode): AstNode;
  redo(ast: AstNode): AstNode;
}

export interface AddNodePayload {
  newNode: AstNode;
}

export interface RemoveNodePayload {

}

export interface UpdateNodePayload {
  newAttributes: AstNodeAttributes;
}

export interface OperationPayloads {
  'add': AddNodePayload;
  'remove': RemoveNodePayload;
  'update': UpdateNodePayload;
}

