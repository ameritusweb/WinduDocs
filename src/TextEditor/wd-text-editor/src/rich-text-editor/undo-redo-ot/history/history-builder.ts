import { toId } from "..";
import { AstNode, CursorPositionParams, IHistoryBuilder, IHistoryCommand, IHistoryManagerRecorder } from "../../../components/wysiwyg/interface";

class HistoryBuilder implements IHistoryBuilder {

    private initialCursorPosition: CursorPositionParams | null;
    private finalCursorPosition: CursorPositionParams | null;
    private commands: IHistoryCommand[];

    constructor() {
        this.initialCursorPosition = null;
        this.finalCursorPosition = null;
        this.commands = [];
    }

    getCommands(): readonly IHistoryCommand[] {
        return this.commands;
    }

    addInitialCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.initialCursorPosition = { targetParentId:  toId(parentWithId)!, nodeIndex: indexToTextNode, offset };
        return this;
    }

    addFinalCursorPosition(parentWithId: AstNode, indexToTextNode: number, offset: number) {
        this.finalCursorPosition = { targetParentId: toId(parentWithId)!, nodeIndex: indexToTextNode, offset };
        return this;
    }

    addInsertBeforeCommand(siblingWithId: AstNode, newNode: AstNode) {

        this.commands.push({ type: 'insertBefore', siblingId: siblingWithId.Guid, oldNode: null, newNode, update: null });
        return this;
    }

    addInsertAfterCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'insertAfter', siblingId: siblingWithId.Guid, oldNode: null, newNode, update: null });
        return this;
    }

    addRemoveBeforeCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'removeBefore', siblingId: siblingWithId.Guid, oldNode: null, newNode, update: null });
        return this;
    }

    addRemoveAfterCommand(siblingWithId: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'removeAfter', siblingId: siblingWithId.Guid, oldNode: null, newNode, update: null });
        return this;
    }

    addReplaceCommand(oldNode: AstNode, newNode: AstNode) {
        this.commands.push({ type: 'replace', siblingId: null, oldNode, newNode, update: null });
        return this;
    }

    addUpdateCommand(oldText: string, startOffset: number, parentNode: AstNode, textNode: AstNode, rootChildId: string) {
        this.commands.push({ type: 'update', siblingId: null, oldNode: null, newNode: textNode, update: { oldText, startOffset, parentNode, rootChildId } });
        return this;
    }

    applyTo(historyManager: IHistoryManagerRecorder) {
        this.commands.forEach((c, ind) => {
            switch (c.type) {
                case 'insertBefore':
                    historyManager.recordChildInsertBefore(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'insertAfter':
                    historyManager.recordChildInsertAfter(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'removeBefore':
                    historyManager.recordChildRemoveBefore(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'removeAfter':
                    historyManager.recordChildRemoveAfter(
                        this.initialCursorPosition,
                        this.finalCursorPosition, 
                        c.siblingId || '', 
                        c.newNode, 
                        ind > 0);
                        break;
                case 'replace':
                    if (c.oldNode) {
                        historyManager.recordChildReplace(
                            this.initialCursorPosition,
                            this.finalCursorPosition, 
                            c.oldNode, 
                            c.newNode, 
                            ind > 0);
                    }
                        break;
                case 'update':
                    if (c.update) {
                        historyManager.recordChildTextUpdate(
                            c.update.oldText,
                            c.update.startOffset,
                            c.update.parentNode,
                            c.newNode,
                            c.update.rootChildId,
                            ind > 0);
                    }
            }
        })
    }
}

export default HistoryBuilder;