import { AstNode, AstUpdate, IHistoryManager } from "../components/wysiwyg/interface";
import { handleBackspaceKeyPress, handleCharacterInsertion, handleEnterKeyPress } from "../rich-text-editor/handlers";
import { createNewAstNode, createNewAstNodeFromFormat } from "../rich-text-editor/node-operations";
import HistoryManager from "../rich-text-editor/undo-redo-ot/history/history-manager";
import EditorData, { EditorDataType } from "./editor-data";

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;
    const historyManager: IHistoryManager = HistoryManager;

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[], higherLevelChildren: AstNode[], higherLevelId?: string): AstUpdate => {

        const sel = window.getSelection();
        const key = event.key;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const endContainer = range.endContainer;
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            if (key === 'Enter') {
                event.preventDefault();
                const update = handleEnterKeyPress(historyManager, container, children, higherLevelChildren, range, startOffset, higherLevelId);
                if (update)
                    return update;
            }
            else if (key === 'Backspace') {
                event.preventDefault();
                const update = handleBackspaceKeyPress(historyManager, container, endContainer, children, range, startOffset, endOffset);
                if (update)
                    return update;
            }
            else if (key.length === 1) {
                event.preventDefault();
                const update = handleCharacterInsertion(historyManager, container, children, event.key, startOffset);
                if (update)
                    return update;
            }
        }

        return {type: 'none', nodes: children };

    }

    return {
        editorData,
        updateAst,
        createNewAstNode,
        createNewAstNodeFromFormat
      };
}