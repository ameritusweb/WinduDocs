import { AstOperation, Transaction } from "../../../components/wysiwyg/interface";

class OperationStack {
    private stack: Transaction[];

    constructor() {
        this.stack = [];
    }

    stackReadOnly(): readonly Transaction[] {
        return this.stack;
    }

    // Starts a new transaction
    startTransaction(): void {
        this.stack.push([]);
    }

    // Adds an operation to the current active transaction
    addToTransaction(operation: AstOperation): void {
        if (this.isEmpty()) {
            throw new Error('No active transaction to add to');
        }
        this.stack[this.stack.length - 1].push(operation);
    }

    // Removes and returns the last transaction from the stack
    pop(): Transaction {
        if (this.isEmpty()) {
            throw new Error('Cannot pop from an empty stack');
        }
        return this.stack.pop() as Transaction;
    }

    // Checks if the stack is empty
    isEmpty(): boolean {
        return this.stack.length === 0;
    }

    // Clears the stack
    clear(): void {
        this.stack = [];
    }

    // Returns the number of transactions in the stack
    size(): number {
        return this.stack.length;
    }

    // Peeks at the last transaction without removing it
    peek(): Transaction | null {
        if (this.isEmpty()) {
            return null;
        }

        const lastTransaction = this.stack[this.stack.length - 1];

        // Deep copy the last transaction
        return this.deepCopyTransaction(lastTransaction);
    }

    private deepCopyTransaction(transaction: Transaction): Transaction {
        return transaction.map(operation => {
            // Assuming AstOperation is a simple object without methods
            return {...operation, payload: { ...operation.payload }};
        });
    }
}

export default OperationStack;