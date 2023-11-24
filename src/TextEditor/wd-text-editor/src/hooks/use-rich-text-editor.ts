import { AstNode, AstUpdate, IHistoryManager, UpdateData } from "../components/wysiwyg/interface";
import { handleBackspaceKeyPress, handleCharacterInsertion, handleEnterKeyPress } from "../rich-text-editor/handlers";
import { createNewAstNode, createNewAstNodeFromFormat, findHigherlevelIndex, findNodeByGuid } from "../rich-text-editor/node-operations";
import { HistoryManager } from "../rich-text-editor/undo-redo-ot";
import EditorData, { EditorDataType } from "./editor-data";

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;
    const historyManager: IHistoryManager = HistoryManager;

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[], higherLevelChildren: AstNode[], editorData: EditorDataType, pathIndices: number[], higherLevelId?: string): AstUpdate => {

        const sel = window.getSelection();
        const key = event.key;
        const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
        if (higherLevelIndex === null)
            return {type: 'none', nodes: children };
        higherLevelChildren[higherLevelIndex].Children = children;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const endContainer = range.endContainer;
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            const parent = container.parentElement;
            if (!parent)
                return {type: 'none', nodes: children };
            const [child, astParent, immediateChild] = findNodeByGuid(higherLevelChildren, parent?.id, null);
            const updateData: UpdateData = { higherLevelIndex, child, astParent, immediateChild }
            if (key === 'Enter') {
                event.preventDefault();
                let update = handleEnterKeyPress(historyManager, container, children, higherLevelChildren, updateData, range, startOffset, higherLevelId);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
            else if (key === 'Backspace') {
                event.preventDefault();
                let update = handleBackspaceKeyPress(historyManager, container, endContainer, children, higherLevelChildren, updateData, range, startOffset, endOffset);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
            else if (key.length === 1) {
                event.preventDefault();
                let update = handleCharacterInsertion(historyManager, container, children, higherLevelChildren, updateData, event.key, editorData.editorState, startOffset);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
        }

        return {type: 'none', nodes: children };

    }

    const restoreCursorPosition = () => {

        historyManager.restoreCursorPosition();

    }

    /*
    const getCursorPosition = (updateType: string) => {
        const selection = window.getSelection();
        let offset = 0;
        let nextSibling = false;
        let lastChild = false;
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (updateType === 'remove') {
                offset = range.startOffset - 2;
            }
            else if (updateType === 'removeSelected') {
                offset = range.startOffset - 1;
            }
            else if (updateType === 'insertNew' || updateType === 'higherLevelSplit') {
                offset = 0;
                nextSibling = true;
            } else if (updateType === 'higherLevelInsertNew') {
                offset = -1;
                lastChild = true;
            }
            else
            {
                offset = range.startOffset;
            }
            const parent = range.startContainer.parentElement;
            const index = Array.from(parent?.childNodes || []).findIndex((c) => c === range.startContainer);
            return { parentId: parent?.id || '', index, nextSibling, lastChild, offset };
        }
        return null;
    }
*/
    return {
        editorData,
        updateAst,
        createNewAstNode,
        createNewAstNodeFromFormat,
        restoreCursorPosition
      };
}