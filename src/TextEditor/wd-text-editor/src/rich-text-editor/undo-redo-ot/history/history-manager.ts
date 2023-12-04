import { incrementEnd, trimSpecial } from "..";
import { AstNode, AstOperation, CursorPositionParams, IHistoryManager, InsertAfterNodePayload, InsertBeforeNodePayload, RemoveAfterNodePayload, RemoveBeforeNodePayload, ReplaceNodePayload, Transaction, UpdateNodePayload } from "../../../components/wysiwyg/interface";
import createNodeOperation from "../operations/create-node-operation";
import { applyOperation } from "../operations/operation-handlers";
import OperationStack from "./operation-stack";

class HistoryManager implements IHistoryManager {
    private undoStack: OperationStack;
    private redoStack: OperationStack;

    constructor() {
        this.undoStack = new OperationStack();
        this.redoStack = new OperationStack();
    }

    stacksReadOnly(): readonly (readonly Transaction[])[] {
        return [this.undoStack.stackReadOnly(), this.redoStack.stackReadOnly()];
    }

    clear(): void {
        this.undoStack.clear();
        this.redoStack.clear();
    }

    restoreCursorPosition(): void {

        let position: CursorPositionParams | null = null;
        let lastTransaction = this.redoStack.peek();
        let transactionIndex = 0;
        if (!lastTransaction) {
            lastTransaction = this.undoStack.peek();
            if (lastTransaction) {
                transactionIndex = lastTransaction.length - 1;
                const transactionToDo = lastTransaction[transactionIndex];
                if (transactionToDo.type === 'update') {
                    position = { targetParentId: transactionToDo.parentNodeId || '', nodeIndex: transactionToDo.nodeIndex || 0, offset: (transactionToDo.payload as UpdateNodePayload).offset || 0 }
                } else {
                    position = lastTransaction[transactionIndex].finalPosition;
                }
            }
        } else {
            const transactionToUndo = lastTransaction[transactionIndex];
            if (transactionToUndo.type === 'update') {
                position = { targetParentId: transactionToUndo.parentNodeId || '', nodeIndex: transactionToUndo.nodeIndex || 0, offset: transactionToUndo.oldOffset || 0 }
            } else {
                position = transactionToUndo.initialPosition;
            }
        }
        if (lastTransaction)
        {
            const lastMove = lastTransaction[transactionIndex];
            if (lastMove && position) {
                const op: AstOperation = lastMove as AstOperation;
                if (op.type === 'insertBefore' || op.type === 'insertAfter' || op.type === 'removeBefore' || op.type === 'removeAfter'  || op.type === 'replace') {
                    let node = document.getElementById(position.targetParentId);
                    if (node) {
                        if (node.nodeName === 'A')
                        {
                            node = node.firstElementChild as HTMLElement;
                        }
                        let textNode: ChildNode | null = node?.childNodes[position.nodeIndex];
                        if (textNode && textNode.nodeType !== Node.TEXT_NODE) {
                            textNode = textNode.firstChild;
                        }
                        if (textNode && op.payload) {
                        
                            const selection = window.getSelection();
                            if (selection) {
                                const range = new Range();
                                range.setStart(textNode, position.offset);
                                range.setEnd(textNode, position.offset);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                            }
                        }
                    }
                }
                else if (op.type === 'update') {
                    let node = document.getElementById(position.targetParentId);
                    if (node) {
                        if (node.nodeName === 'A')
                        {
                            node = node.firstElementChild as HTMLElement;
                        }
                        let textNode: ChildNode | null = node?.childNodes[position.nodeIndex];
                        if (textNode && textNode.nodeType !== Node.TEXT_NODE) {
                            textNode = textNode.firstChild;
                        }
                        if (textNode && op.payload) {
                        
                            const selection = window.getSelection();
                            if (selection) {
                                const range = new Range();
                                range.setStart(textNode, position.offset);
                                range.setEnd(textNode, position.offset);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                            }
                        }
                    }
                }
            }
        }

    }

    recordChildTextUpdate(oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string, partOfTransaction?: boolean): void {
        const target = child || parent;
        const oldVersion = target.Version || 'V0';
        const trimmed = trimSpecial(oldVersion, { startString: 'R' });
        const newVersion = trimmed === 'New' ? 'V0' : incrementEnd(trimmed);
        const contentDiff = (target.TextContent?.length || 0) - oldTextContent.length;
        this.recordOperation<'update'>(createNodeOperation('update', { oldVersion: trimmed, oldOffset: offset, newVersion, parentNode: parent, offset: offset + contentDiff, node: child, newTextContent: target.TextContent, oldTextContent, rootChildId }), partOfTransaction);
        target.Version = newVersion;
    }

    recordChildReplace(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, oldNode: AstNode, newNode: AstNode, partOfTransaction?: boolean): void {
        this.recordOperation<'replace'>(createNodeOperation('replace', { initialPosition: initialCursorPosition, finalPosition: finalCursorPosition, oldNode, newNode }), partOfTransaction);
    }

    recordChildInsertBefore(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, newNode: AstNode, partOfTransaction?: boolean) {
        this.recordOperation<'insertBefore'>(createNodeOperation('insertBefore', { initialPosition: initialCursorPosition, finalPosition: finalCursorPosition, siblingId, newNode }), partOfTransaction);
    }

    recordChildInsertAfter(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, newNode: AstNode, partOfTransaction?: boolean) {
        this.recordOperation<'insertAfter'>(createNodeOperation('insertAfter', { initialPosition: initialCursorPosition, finalPosition: finalCursorPosition, siblingId, newNode }), partOfTransaction);
    }

    recordChildRemoveBefore(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, targetNode: AstNode, partOfTransaction?: boolean) {
        this.recordOperation<'removeBefore'>(createNodeOperation('removeBefore', { initialPosition: initialCursorPosition, finalPosition: finalCursorPosition, siblingId, targetNode }), partOfTransaction);
    }

    recordChildRemoveAfter(initialCursorPosition: CursorPositionParams | null, finalCursorPosition: CursorPositionParams | null, siblingId: string, targetNode: AstNode, partOfTransaction?: boolean) {
        this.recordOperation<'removeAfter'>(createNodeOperation('removeAfter', { initialPosition: initialCursorPosition, finalPosition: finalCursorPosition, siblingId, targetNode }), partOfTransaction);
    }

    recordOperation<Type extends 'insertBefore' | 'insertAfter' | 'removeBefore' | 'removeAfter' | 'update' | 'replace'>(operation: AstOperation<Type>, partOfTransaction = false): void {
        if (!partOfTransaction) {
            this.undoStack.startTransaction();
        }

        this.undoStack.addToTransaction(operation);

        if (!partOfTransaction) {
            this.redoStack.clear();
        }
    }

    recordOperationsAsTransaction(operations: AstOperation[], historyManager: IHistoryManager): void {
        if (operations.length === 0) {
            throw new Error('No operations provided for the transaction');
        }
    
        // Start the transaction with the first operation
        historyManager.recordOperation(operations[0], false);
    
        // Record all intermediate operations as part of the transaction
        operations.slice(1).forEach(operation => {
            historyManager.recordOperation(operation, true);
        });
    }

    getReverseOperation(operation: AstOperation): AstOperation {
        switch (operation.type) {
            case 'insertBefore': {
                const payload = operation.payload as InsertBeforeNodePayload;
                return {
                    ...operation,
                    type: 'removeBefore',
                    payload: {
                        siblingId: payload.siblingId,
                        targetNode: payload.newNode
                    }
                };
            }
            case 'insertAfter': {
                const payload = operation.payload as InsertAfterNodePayload;
                return {
                    ...operation,
                    type: 'removeAfter',
                    payload: {
                        siblingId: payload.siblingId,
                        targetNode: payload.newNode
                    }
                };
            }
            case 'removeBefore': {
                const payload = operation.payload as RemoveBeforeNodePayload;
                return {
                    ...operation,
                    type: 'removeBefore',
                    payload: {
                        siblingId: payload.siblingId,
                        newNode: payload.targetNode
                    }
                };
            }
            case 'removeAfter': {
                const payload = operation.payload as RemoveAfterNodePayload;
                return {
                    ...operation,
                    type: 'removeAfter',
                    payload: {
                        siblingId: payload.siblingId,
                        newNode: payload.targetNode
                    }
                };
            }
            case 'replace':
                return { 
                    ...operation, 
                    type: 'replace', 
                    targetNodeId: (operation.payload as ReplaceNodePayload).newNode.Guid,
                    payload: {
                        ...(operation as AstOperation<'replace'>).payload!,
                        oldNode: (operation as AstOperation<'replace'>).payload!.newNode,
                        newNode: (operation as AstOperation<'replace'>).payload!.oldNode
                    }
                };
            case 'update':
                return { 
                    ...operation, 
                    payload: { 
                        offset: operation.oldOffset || 0, 
                        newVersion: 'R' + operation.oldVersion as string, 
                        newTextContent: operation.oldState as string | null 
                    } as UpdateNodePayload 
                };
            default:
                throw new Error('Invalid operation type');
        }
    }    

    undo(ast: AstNode): [AstNode, string] | null {
        if (this.undoStack.isEmpty()) {
            return null;
        }

        let rootChildIds = '';
        const transactionToUndo = this.undoStack.pop();
        for (let i = transactionToUndo.length - 1; i >= 0; i--) {
            const operation = transactionToUndo[i];
            const reverseOperation = this.getReverseOperation(operation);
            reverseOperation.rootChildId && (rootChildIds += reverseOperation.rootChildId + ' ');
            ast = applyOperation(ast, reverseOperation);
        }

        this.redoStack.startTransaction();
        transactionToUndo.forEach(operation => this.redoStack.addToTransaction(operation));

        return [ast, rootChildIds.trimEnd()];
    }

    // Redoes the last transaction
    redo(ast: AstNode): [AstNode, string] | null {
        if (this.redoStack.isEmpty()) {
            return null;
        }

        let rootChildIds = '';
        const transactionToRedo = this.redoStack.pop();
        transactionToRedo.forEach(operation => {
            operation.rootChildId && (rootChildIds += operation.rootChildId + ' ');
            ast = applyOperation(ast, operation);
        });

        this.undoStack.startTransaction();
        transactionToRedo.forEach(operation => this.undoStack.addToTransaction(operation));

        return [ast, rootChildIds];
    }
}

export default new HistoryManager();