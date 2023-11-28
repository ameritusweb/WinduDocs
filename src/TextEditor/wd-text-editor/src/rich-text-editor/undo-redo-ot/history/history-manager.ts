import { incrementEnd, trimSpecial } from "..";
import { AddNodePayload, AstNode, AstOperation, IHistoryManager, RemoveNodePayload, ReplaceNodePayload, UpdateNodePayload } from "../../../components/wysiwyg/interface";
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

    clear(): void {
        this.undoStack.clear();
        this.redoStack.clear();
    }

    restoreCursorPosition(): void {

        let payload = null;
        let lastTransaction = this.redoStack.peek();
        let transactionIndex = 0;
        if (!lastTransaction) {
            lastTransaction = this.undoStack.peek();
            if (lastTransaction) {
                transactionIndex = lastTransaction.length - 1;
                payload = lastTransaction[transactionIndex].payload;
            }
        } else {
            const transactionToUndo = lastTransaction[transactionIndex];
            if (transactionToUndo.type === 'add') {
                payload = { offset: (transactionToUndo.payload! as AddNodePayload).startOffset };
                transactionToUndo.parentNodeId = (transactionToUndo.payload! as AddNodePayload).previousSiblingId!;
            } else if (transactionToUndo.type === 'update') {
                payload = { offset: transactionToUndo.oldOffset };
            } else {
                payload = { offset: (transactionToUndo.payload! as AddNodePayload).offset };
            }
        }
        if (lastTransaction)
        {
            const lastMove = lastTransaction[transactionIndex];
            if (lastMove) {
                const op: AstOperation = lastMove as AstOperation;
                if (op.type === 'add' || op.type === 'replace') {
                    let node = document.getElementById(lastMove.parentNodeId);
                    if (node) {
                        if (node.nodeName === 'A')
                        {
                            node = node.firstElementChild as HTMLElement;
                        }
                        let textNode: ChildNode | null = node?.childNodes[lastMove.nodeIndex];
                        if (textNode && textNode.nodeType !== Node.TEXT_NODE) {
                            textNode = textNode.firstChild;
                        }
                        if (textNode && op.payload) {
                        
                            const selection = window.getSelection();
                            if (selection) {
                                const range = new Range();
                                const addNodePayload = payload as AddNodePayload;
                                range.setStart(textNode, addNodePayload.offset);
                                range.setEnd(textNode, addNodePayload.offset);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                            }
                        }
                    }
                }
                else if (op.type === 'update') {
                    let node = document.getElementById(lastMove.parentNodeId);
                    if (node) {
                        if (node.nodeName === 'A')
                        {
                            node = node.firstElementChild as HTMLElement;
                        }
                        let textNode: ChildNode | null = node?.childNodes[lastMove.nodeIndex];
                        if (textNode && textNode.nodeType !== Node.TEXT_NODE) {
                            textNode = textNode.firstChild;
                        }
                        if (textNode && op.payload) {
                        
                            const selection = window.getSelection();
                            if (selection) {
                                const range = new Range();
                                const updateNodePayload = payload as UpdateNodePayload;
                                range.setStart(textNode, updateNodePayload.offset);
                                range.setEnd(textNode, updateNodePayload.offset);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                            }
                        }
                    }
                }
            }
        }

    }

    recordChildTextUpdate(oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string): void {
        const target = child || parent;
        const oldVersion = target.Version || 'V0';
        const trimmed = trimSpecial(oldVersion, { startString: 'R' });
        const newVersion = trimmed === 'New' ? 'V0' : incrementEnd(trimmed);
        const contentDiff = (target.TextContent?.length || 0) - oldTextContent.length;
        this.recordOperation<'update'>(createNodeOperation('update', { oldVersion: trimmed, oldOffset: offset, newVersion, parentNode: parent, offset: offset + contentDiff, node: child, newTextContent: target.TextContent, oldTextContent, rootChildId }), false);
        target.Version = newVersion;
    }

    recordChildReplace(parent: AstNode | null, oldNode: AstNode, newNode: AstNode, cursorTargetParent: AstNode, nodeIndex: number | null, offset: number): void {
        this.recordOperation<'replace'>(createNodeOperation('replace', { parentNode: parent || null, oldNode, cursorTargetParent: cursorTargetParent, nodeIndex: nodeIndex == null ? -1 : nodeIndex, offset, newNode  }));
    }

    recordChildAdd(parent: AstNode | null, previousSibling: AstNode | null, startOffset: number | null, newNode: AstNode, cursorTargetParent: AstNode, nodeIndex: number | null, offset: number, partOfTransaction?: boolean): void {
        this.recordOperation<'add'>(createNodeOperation('add', { parentNode: parent || null, previousSibling, startOffset, cursorTargetParent, nodeIndex: nodeIndex == null ? -1 : nodeIndex, offset, newNode  }), partOfTransaction);
    }

    recordOperation<Type extends 'add' | 'remove' | 'update' | 'replace'>(operation: AstOperation<Type>, partOfTransaction = false): void {
        if (!partOfTransaction) {
            this.undoStack.startTransaction();
        }

        this.undoStack.addToTransaction(operation);

        if (!partOfTransaction) {
            this.redoStack.clear();
        }
    }

    recordOperationsAsTransaction(operations: AstOperation[], historyManager: HistoryManager): void {
        if (operations.length === 0) {
            throw new Error('No operations provided for the transaction');
        }
    
        // Start the transaction with the first operation
        historyManager.recordOperation(operations[0], true);
    
        // Record all intermediate operations as part of the transaction
        operations.slice(1, operations.length - 1).forEach(operation => {
            historyManager.recordOperation(operation, true);
        });
    
        // End the transaction with the last operation
        if (operations.length > 1) {
            historyManager.recordOperation(operations[operations.length - 1], false);
        }
    }

    performOperationsAsTransaction(ast: AstNode, operations: AstOperation[], historyManager: HistoryManager): AstNode {
        if (operations.length === 0) {
            throw new Error('No operations provided for the transaction');
        }
    
        // Start the transaction with the first operation
        ast = historyManager.performOperation(ast, operations[0], true);
    
        // Perform all intermediate operations as part of the transaction
        operations.slice(1, operations.length - 1).forEach(operation => {
            ast = historyManager.performOperation(ast, operation, true);
        });
    
        // End the transaction with the last operation
        if (operations.length > 1) {
            ast = historyManager.performOperation(ast, operations[operations.length - 1], false);
        }
    
        return ast;
    }

    // Performs an operation and manages the transaction
    performOperation(ast: AstNode, operation: AstOperation, partOfTransaction = false): AstNode {
        if (!partOfTransaction) {
            this.undoStack.startTransaction();
        }
        
        ast = applyOperation(ast, operation);
        this.undoStack.addToTransaction(operation);

        if (!partOfTransaction) {
            this.redoStack.clear();
        }

        return ast;
    }

    getReverseOperation(operation: AstOperation): AstOperation {
        switch (operation.type) {
            case 'add':
                return { 
                    ...operation, 
                    type: 'remove', 
                    targetNodeId: (operation.payload as AddNodePayload).newNode.Guid,
                    payload: {
                        ...(operation as AstOperation<'add'>).payload!,
                        targetNode: (operation as AstOperation<'add'>).payload!.newNode,
                        newNode: null,
                        offset: (operation as AstOperation<'add'>).payload!.startOffset,
                        startOffset: (operation as AstOperation<'add'>).payload!.offset
                    } as RemoveNodePayload
                };
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
            case 'remove':
                return { 
                    ...operation, 
                    type: 'add', 
                    targetNodeId: (operation.payload as RemoveNodePayload).targetNode.Guid,
                    payload: {
                        ...(operation as AstOperation<'remove'>).payload!,
                        newNode: (operation as AstOperation<'remove'>).payload!.targetNode,
                        targetNode: null,
                        startOffset: (operation as AstOperation<'remove'>).payload!.offset,
                        offset: (operation as AstOperation<'remove'>).payload!.startOffset
                    } as AddNodePayload
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