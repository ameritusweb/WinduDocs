import { AstOperation, Transaction } from "../../../components/wysiwyg/interface";

class OperationStack {
    private stack: Transaction[];

    constructor() {
        this.stack = [];
    }

    stackReadOnly(): readonly Transaction[] {
        return this.stack;
    }

    
    startTransaction(): void {
        this.stack.push([]);
    }

    
    addToTransaction(operation: AstOperation): void {
        if (this.isEmpty()) {
            throw new Error('No active transaction to add to');
        }
        this.stack[this.stack.length - 1].push(operation);
    }

    
    pop(): Transaction {
        if (this.isEmpty()) {
            throw new Error('Cannot pop from an empty stack');
        }
        return this.stack.pop() as Transaction;
    }

    
    isEmpty(): boolean {
        return this.stack.length === 0;
    }

    
    clear(): void {
        this.stack = [];
    }

    
    size(): number {
        return this.stack.length;
    }

    
    peek(): Transaction | null {
        if (this.isEmpty()) {
            return null;
        }

        const lastTransaction = this.stack[this.stack.length - 1];

        
        return this.deepCopyTransaction(lastTransaction);
    }

    private deepCopyTransaction(transaction: Transaction): Transaction {
        return transaction.map(operation => {
            
            return {...operation, payload: { ...operation.payload }};
        });
    }
}

export default OperationStack;