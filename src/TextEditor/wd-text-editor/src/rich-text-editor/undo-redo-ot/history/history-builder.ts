import { HistoryManager, toId } from "..";
import { AstNode, CursorPositionParams, IHistoryBuilder, IHistoryCommand, IHistoryManagerRecorder } from "../../../components/wysiwyg/interface";

class HistoryBuilder implements IHistoryBuilder {

    private initialCursorPosition: CursorPositionParams | null;
    private finalCursorPosition: CursorPositionParams | null;
    private commands: IHistoryCommand[];
    private historyManager: IHistoryManagerRecorder;

    constructor() {
        this.initialCursorPosition = null;
        this.finalCursorPosition = null;
        this.commands = [];
        this.historyManager = HistoryManager;
    }

    addInitialCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.initialCursorPosition = { targetParentId:  toId(parentWithId) || '', nodeIndex: indexToTextNode, offset };
    }

    addFinalCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.finalCursorPosition = { targetParentId: toId(parentWithId) || '', nodeIndex: indexToTextNode, offset };
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

    apply() {
        this.commands.forEach((c, ind) => {
            switch (c.type) {
                case 'insertBefore':
                    this.historyManager.recordChildInsertBefore(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'insertAfter':
                    this.historyManager.recordChildInsertAfter(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'removeBefore':
                    this.historyManager.recordChildRemoveBefore(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'removeAfter':
                    this.historyManager.recordChildRemoveAfter(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'replace':
                    if (c.oldNode) {
                        this.historyManager.recordChildReplace(
                            this.initialCursorPosition,
                            this.finalCursorPosition, 
                            c.oldNode, 
                            c.newNode, 
                            ind > 0);
                    }
                        break;
            }
        })
    }
}

export default HistoryBuilder;