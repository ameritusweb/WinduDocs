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
    contentParent?: AstNode;
    updater?: (nodes: AstNode[], updateProcessed: boolean) => void;
  }

  export interface AstUpdate {
    nodes: AstNode[];
    type: string;
    pathIndices?: number[];
    rootChildId?: string;
    higherLevelNodes?: AstNode[];
}

export type AstOperationType = 'add' | 'remove' | 'update' | 'replace';

export interface AstOperation<Type extends AstOperationType = 'add' | 'remove' | 'update' | 'replace'> {
  type: Type;
  parentNodeId: string;
  nodeIndex: number;
  targetNodeId: string;
  payload?: OperationPayloads[Type];
  timestamp: number;
  oldState?: AstNode | string; // Adjust this based on what oldState represents
  oldVersion?: string;
  oldOffset?: number;
  rootChildId?: string;
}

export interface CursorPositionType {
  offset: number;
  parentId: string;
  nextSibling: boolean;
  lastChild: boolean;
  index: number;
}

export interface AddNodeParams {
  parentNode: AstNode | null;
  previousSiblingId: string | null;
  cursorTargetParent: AstNode;
  nodeIndex: number;
  offset: number;
  newNode: AstNode;
}

export interface ReplaceNodeParams {
  parentNode: AstNode | null;
  oldNode: AstNode;
  cursorTargetParent: AstNode;
  nodeIndex: number;
  offset: number;
  newNode: AstNode;
}

export interface RemoveNodeParams {
  nodeId: string;
}

export interface UpdateNodeParams {
  parentNode: AstNode;
  offset: number;
  node: AstNode | null;
  newTextContent: string | null;
  oldTextContent: string | null;
  newVersion: string | undefined;
  oldVersion: string | undefined;
  oldOffset: number;
  rootChildId: string | undefined;
}

export type Transaction = AstOperation[];

export interface IHistoryManager {
  clear(): void;
  restoreCursorPosition(): void;
  recordChildReplace(parent: AstNode | null, oldNode: AstNode, newNode: AstNode, cursorTargetParent: AstNode, nodeIndex: number | null, offset: number): void;
  recordChildAdd(parent: AstNode | null, previousSibling: AstNode | null, newNode: AstNode, cursorTargetParent: AstNode, nodeIndex: number | null, offset: number, partOfTransaction?: boolean): void;
  recordChildTextUpdate(oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string): void;
  recordOperation<Type extends 'add' | 'remove' | 'update'>(operation: AstOperation<Type>, partOfTransaction?: boolean): void;
  recordOperationsAsTransaction(operations: AstOperation[], historyManager: IHistoryManager): void;
  performOperationsAsTransaction(ast: AstNode, operations: AstOperation[], historyManager: IHistoryManager): AstNode;
  performOperation(ast: AstNode, operation: AstOperation, partOfTransaction?: boolean): AstNode;
  getReverseOperation(operation: AstOperation): AstOperation;
  undo(ast: AstNode): [AstNode, string] | null;
  redo(ast: AstNode): [AstNode, string] | null;
}

export interface AddNodePayload {
  previousSiblingId: string | null;
  offset: number;
  newNode: AstNode;
}

export interface RemoveNodePayload {
  id: string;
}

export interface UpdateNodePayload {
  newTextContent: string | null;
  newVersion: string | undefined;
  offset: number;
}

export interface ReplaceNodePayload {
  oldNode: AstNode;
  offset: number;
  newNode: AstNode;
}


export interface OperationPayloads {
  'add': AddNodePayload;
  'remove': RemoveNodePayload;
  'update': UpdateNodePayload;
  'replace': ReplaceNodePayload;
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

export interface UpdateData {
  parent: HTMLElement;
  higherLevelIndex: number;
  child: AstNode | null;
  astParent: AstNode | null;
  immediateChild: AstNode | null;
  rootChildId: string;
  containerIndex: number;
}