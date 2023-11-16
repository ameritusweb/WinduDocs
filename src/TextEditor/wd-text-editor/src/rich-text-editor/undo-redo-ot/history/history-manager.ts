import { AstNode, AstOperation, IHistoryManager } from "../../../components/wysiwyg/interface";
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

    recordChildTextUpdate(oldTextContent: string, child: AstNode): void {
        const oldVersion = child.Version || 0;
        this.recordOperation<'update'>(createNodeOperation('update', { oldVersion: oldVersion, newVersion: oldVersion + 1, nodeId: child.Guid, newTextContent: child.TextContent, oldTextContent }), false);
        child.Version = oldVersion + 1;
    }

    recordOperation<Type extends 'add' | 'remove' | 'update'>(operation: AstOperation<Type>, partOfTransaction = false): void {
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
                return { ...operation, type: 'remove' };
            case 'remove':
                return { ...operation, type: 'add', payload: { newNode: operation.oldState as AstNode } };
            case 'update':
                return { ...operation, payload: { newVersion: operation.oldVersion as number, newTextContent: operation.oldState as string | null } };
            default:
                throw new Error('Invalid operation type');
        }
    }    

    undo(ast: AstNode): AstNode | null {
        if (this.undoStack.isEmpty()) {
            return null;
        }

        const transactionToUndo = this.undoStack.pop();
        transactionToUndo.forEach(operation => {
            const reverseOperation = this.getReverseOperation(operation);
            ast = applyOperation(ast, reverseOperation);
        });

        this.redoStack.startTransaction();
        transactionToUndo.forEach(operation => this.redoStack.addToTransaction(operation));

        return ast;
    }

    // Redoes the last transaction
    redo(ast: AstNode): AstNode | null {
        if (this.redoStack.isEmpty()) {
            return null;
        }

        const transactionToRedo = this.redoStack.pop();
        transactionToRedo.forEach(operation => {
            ast = applyOperation(ast, operation);
        });

        this.undoStack.startTransaction();
        transactionToRedo.forEach(operation => this.undoStack.addToTransaction(operation));

        return ast;
    }
}

export default new HistoryManager();