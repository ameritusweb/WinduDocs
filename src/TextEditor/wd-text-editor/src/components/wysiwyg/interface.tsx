export interface AstNodeAttributes {
    Level?: string;
    Url?: string;
    Title?: string;
    IsHeader?: string;
    IsOrdered?: string;
    Language?: string;
  }

  export interface AstNodeBase {
    NodeName: string;
    Attributes: AstNodeAttributes;
    ChildIndex: number;
    Guid: string;
    Depth: number;
    TextContent: string | null;
    Version?: string;
  }

export interface AstNode extends AstNodeBase {
    Children: AstNode[];
  }

  export interface HigherLevelProps {
    id?: string;
    content: AstNode[];
    children?: AstNode[];
    contentParent?: AstNode;
    higherLevelIndex?: number;
    updater?: (nodes: AstNode[], updateProcessed: boolean) => void;
  }

  export interface AstUpdate {
    nodes: AstNode[];
    type: string;
    pathIndices?: number[];
    rootChildId?: string;
    higherLevelNodes?: AstNode[];
}

export type AstOperationType = 'insertBefore' | 'insertAfter' | 'removeBefore' | 'removeAfter' | 'update' | 'replace';

export interface AstOperation<Type extends AstOperationType = 'insertBefore' | 'insertAfter' | 'removeBefore' | 'removeAfter' | 'update' | 'replace'> {
  type: Type;
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  parentNodeId: string | null;
  nodeIndex: number | null;
  targetNodeId: string | null;
  payload: OperationPayloads[Type];
  timestamp: number;
  oldState?: AstNode | string; // Adjust this based on what oldState represents
  oldVersion?: string;
  oldOffset?: number;
  rootChildId?: string;
}

export type Transaction = AstOperation[];

export interface CursorPositionParams {
  targetParentId: string;
  nodeIndex: number;
  offset: number;
}

export interface InsertBeforeNodeParams {
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  siblingId: string;
  newNode: AstNode;
}

export interface InsertAfterNodeParams {
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  siblingId: string;
  newNode: AstNode;
}

export interface RemoveBeforeNodeParams {
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  siblingId: string;
  targetNode: AstNode;
}

export interface RemoveAfterNodeParams {
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  siblingId: string;
  targetNode: AstNode;
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

export interface ReplaceNodeParams {
  initialPosition: CursorPositionParams | null;
  finalPosition: CursorPositionParams | null;
  oldNode: AstNode;
  newNode: AstNode;
}

export interface IHistoryManagerRecorder {
  recordChildReplace(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, oldNode: AstNode, newNode: AstNode, partOfTransaction?: boolean): void;
  recordChildInsertBefore(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, newNode: AstNode, partOfTransaction?: boolean): void;
  recordChildInsertAfter(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, newNode: AstNode, partOfTransaction?: boolean): void;
  recordChildRemoveBefore(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, targetNode: AstNode, partOfTransaction?: boolean): void;
  recordChildRemoveAfter(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, targetNode: AstNode, partOfTransaction?: boolean): void;
  recordChildTextUpdate(oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string, partOfTransaction?: boolean): void;
  recordOperation<Type extends 'insertBefore' | 'insertAfter' | 'removeBefore' | 'removeAfter' | 'update' | 'replace'>(operation: AstOperation<Type>, partOfTransaction?: boolean): void;
  recordOperationsAsTransaction(operations: AstOperation[], historyManager: IHistoryManager): void;
}

export interface IHistoryManager extends IHistoryManagerRecorder {
  clear(): void;
  restoreCursorPosition(): void;
  getReverseOperation(operation: AstOperation): AstOperation;
  undo(ast: AstNode): [AstNode, string] | null;
  redo(ast: AstNode): [AstNode, string] | null;
}

export interface InsertBeforeNodePayload {
  siblingId: string | null;
  newNode: AstNode;
}

export interface InsertAfterNodePayload {
  siblingId: string | null;
  newNode: AstNode;
}

export interface RemoveBeforeNodePayload {
  siblingId: string | null;
  targetNode: AstNode;
}

export interface RemoveAfterNodePayload {
  siblingId: string | null;
  targetNode: AstNode;
}

export interface UpdateNodePayload {
  newTextContent: string | null;
  newVersion: string | undefined;
  offset: number;
}

export interface ReplaceNodePayload {
  oldNode: AstNode;
  newNode: AstNode;
}

export interface OperationPayloads {
  'insertBefore': InsertBeforeNodePayload;
  'insertAfter': InsertAfterNodePayload;
  'removeBefore': RemoveBeforeNodePayload;
  'removeAfter': RemoveAfterNodePayload;
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
    emit(event: string, guid: string, payload: object): void;
}

export interface ITextBlock {
  guid: string;
  index: number;
  textContent: string;
  offset?: number;
}

export interface Idable {
  id: string;
}

export type IdableNode = Node & Idable;

export interface UpdateData {
  parent: IdableNode;
  higherLevelIndex: number;
  child: AstNode | null;
  grandChild: AstNode | null;
  endChild: AstNode | null;
  endGrandChild: AstNode | null;
  astParent: AstNode | null;
  lowerLevelChild: AstNode | null;
  immediateChild: AstNode | null;
  rootChildId: string;
  containerIndex: number;
  skyChildren: AstNode[];
  higherLevelChildren: AstNode[];
}

export interface AstContext {
  isQuoteBlock: boolean;
  isLink: boolean;
  isCodeBlock: boolean;
  isInlineCode: boolean;
  isHeading: boolean;
  isAlertBlock: boolean;
  isStrong: boolean;
  isEmphasis: boolean;
  isTable: boolean;
  isOrderedList: boolean;
  isUnorderedList: boolean;
  types: string[];
}

export interface IHistoryCommand {
  type: 'insertBefore' | 'insertAfter' | 'removeBefore' | 'removeAfter' | 'replace';
  siblingId: string | null;
  oldNode: AstNode | null;
  newNode: AstNode;
}

export interface IHistoryBuilder {
  // Add initial cursor position to the history
  addInitialCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number): void;

  // Add final cursor position to the history
  addFinalCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number): void;

  // Add a command to insert a new node before a specified sibling node
  addInsertBeforeCommand(siblingWithId: AstNode, newNode: AstNode): void;

  // Add a command to insert a new node after a specified sibling node
  addInsertAfterCommand(siblingWithId: AstNode, newNode: AstNode): void;

  // Add a command to remove a node before a specified sibling node
  addRemoveBeforeCommand(siblingWithId: AstNode, oldNode: AstNode | null): void;

  // Add a command to remove a node after a specified sibling node
  addRemoveAfterCommand(siblingWithId: AstNode, oldNode: AstNode | null): void;

  // Add a command to replace an old node with a new node
  addReplaceCommand(oldNode: AstNode, newNode: AstNode): void;

  // Build and apply the history commands to a given history manager
  applyTo(historyManager: IHistoryManagerRecorder): void;
}