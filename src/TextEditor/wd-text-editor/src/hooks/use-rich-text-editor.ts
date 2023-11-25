import { AstNode, AstUpdate, IHistoryManager, UpdateData } from "../components/wysiwyg/interface";
import { handleBackspaceKeyPress, handleCharacterInsertion, handleEnterKeyPress } from "../rich-text-editor/handlers";
import { createNewAstNode, createNewAstNodeFromFormat, findClosestAncestorId, findHigherlevelIndex, findNodeByGuid } from "../rich-text-editor/node-operations";
import { HistoryManager } from "../rich-text-editor/undo-redo-ot";
import EditorData, { EditorDataType } from "./editor-data";

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;
    const historyManager: IHistoryManager = HistoryManager;

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[], higherLevelChildren: AstNode[], editorData: EditorDataType, pathIndices: number[], higherLevelId?: string): AstUpdate => {

        const sel = window.getSelection();
        const key = event.key;
        let higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
        if (higherLevelIndex === null) {
            higherLevelIndex = -1;
            const i = higherLevelChildren.findIndex(c => c.Guid === children[0].Guid);
            if (i > -1) {
                higherLevelChildren[i] = children[0];
            }
        } else {
            higherLevelChildren[higherLevelIndex].Children = children;
        }
        if (sel) {
            const range = sel.getRangeAt(0);
            let container = range.startContainer;
            const endContainer = range.endContainer;
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            if (container.nodeName !== '#text')
            {
                container = container.firstChild!;
            }
            if (container.nodeName !== '#text')
            {
                container = container.firstChild!;
            }
            const parent = container.parentElement;
            if (!parent)
                return {type: 'none', nodes: children };
            const rootChildId = findClosestAncestorId(parent, 'richTextEditor');
            if (!rootChildId)
                return {type: 'none', nodes: children };
            const containerIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
            const [child, astParent, immediateChild] = findNodeByGuid(higherLevelChildren, parent?.id, null);
            const updateData: UpdateData = { parent, higherLevelIndex, child, astParent, immediateChild, rootChildId, containerIndex }
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

    return {
        editorData,
        historyManager,
        updateAst,
        createNewAstNode,
        createNewAstNodeFromFormat,
        restoreCursorPosition
      };
}