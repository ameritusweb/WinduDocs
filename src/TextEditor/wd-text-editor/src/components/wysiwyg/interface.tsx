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
    Version?: string;
  }

  export interface HigherLevelProps {
    id?: string;
    content: AstNode[];
    updater?: (nodes: AstNode[], updateProcessed: boolean) => void;
  }

  export interface AstUpdate {
    nodes: AstNode[];
    type: string;
    pathIndices?: number[];
    rootChildId?: string;
    higherLevelNodes?: AstNode[];
}

export type AstOperationType = 'add' | 'remove' | 'update';

export interface AstOperation<Type extends AstOperationType = 'add' | 'remove' | 'update'> {
  type: Type;
  targetNodeId: string;
  payload?: OperationPayloads[Type];
  timestamp: number;
  oldState?: AstNode | string; // Adjust this based on what oldState represents
  oldVersion?: string;
  rootChildId?: string;
}

export interface CursorPositionType {
  offset: number;
  parentId: string;
  nextSibling: boolean;
  index: number;
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
  newTextContent: string | null;
  oldTextContent: string | null;
  newVersion: string | undefined;
  oldVersion: string | undefined;
  rootChildId: string | undefined;
}

export type Transaction = AstOperation[];

export interface IHistoryManager {
  clear(): void;
  recordChildTextUpdate(oldTextContent: string, offset: number, child: AstNode, rootChildId?: string): void;
  recordOperation<Type extends 'add' | 'remove' | 'update'>(operation: AstOperation<Type>, partOfTransaction?: boolean): void;
  recordOperationsAsTransaction(operations: AstOperation[], historyManager: IHistoryManager): void;
  performOperationsAsTransaction(ast: AstNode, operations: AstOperation[], historyManager: IHistoryManager): AstNode;
  performOperation(ast: AstNode, operation: AstOperation, partOfTransaction?: boolean): AstNode;
  getReverseOperation(operation: AstOperation): AstOperation;
  undo(ast: AstNode): [AstNode, string] | null;
  redo(ast: AstNode): [AstNode, string] | null;
}

export interface AddNodePayload {
  newNode: AstNode;
}

export interface RemoveNodePayload {
  id: string;
}

export interface UpdateNodePayload {
  newTextContent: string | null;
  newVersion: string | undefined;
}

export interface OperationPayloads {
  'add': AddNodePayload;
  'remove': RemoveNodePayload;
  'update': UpdateNodePayload;
}

type EventListener = (payload: any) => void;

export interface IEventEmitter {
    // Subscribe to an event with a specific GUID
    subscribe(guid: string, event: string, listener: EventListener): string;

    // Unsubscribe using the subscriber's GUID
    unsubscribe(guid: string): void;

    // Emit an event to only the subscribers with a specific GUID
    emit(event: string, guid: string, payload: any): void;
}

export interface ITextBlock {
  guid: string;
  index: number;
  textContent: string;
  offset?: number;
}