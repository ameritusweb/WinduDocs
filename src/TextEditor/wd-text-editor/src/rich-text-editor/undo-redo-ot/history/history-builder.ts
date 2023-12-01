import { toId } from "..";
import { AstNode, IHistoryManagerRecorder } from "../../../components/wysiwyg/interface";

export interface ICursorHistoryItem {
    parentId: string | null;
    index: number;
    offset: number;
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

class HistoryBuilder implements IHistoryBuilder {

    private initialCursorPosition: ICursorHistoryItem | null;
    private finalCursorPosition: ICursorHistoryItem | null;
    private commands: IHistoryCommand[];

    constructor() {
        this.initialCursorPosition = null;
        this.finalCursorPosition = null;
        this.commands = [];
    }

    addInitialCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.initialCursorPosition = { parentId:  toId(parentWithId), index: indexToTextNode, offset };
    }

    addFinalCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.finalCursorPosition = { parentId: toId(parentWithId), index: indexToTextNode, offset };
    }

    addInsertBeforeCommand(siblingWithId: AstNode, newNode: AstNode) {

        this.commands.push({ type: 'insertBefore', siblingId: toId(siblingWithId), oldNode: null, newNode });
    }

    addInsertAfterCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'insertAfter', siblingId: toId(siblingWithId), oldNode: null, newNode });
    }

    addRemoveBeforeCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'removeBefore', siblingId: toId(siblingWithId), oldNode: null, newNode });
    }

    addRemoveAfterCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'removeAfter', siblingId: toId(siblingWithId), oldNode: null, newNode });
    }

    addReplaceCommand(oldNode: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'replace', siblingId: null, oldNode, newNode });
    }

    applyTo(historyManager: IHistoryManagerRecorder) {
        // TODO
    }

}

export default HistoryBuilder;