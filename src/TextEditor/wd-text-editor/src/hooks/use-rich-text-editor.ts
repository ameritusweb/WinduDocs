import { AstNode } from "../components/wysiwyg/interface";
import { handleBackspaceKeyPress, handleCharacterInsertion, handleEnterKeyPress } from "../rich-text-editor/handlers";
import { createNewAstNode, createNewAstNodeFromFormat } from "../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "./editor-data";

export interface AstUpdate {
    nodes: AstNode[];
    type: string;
}

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;

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
                handleEnterKeyPress(container, children, higherLevelChildren, range, startOffset, higherLevelId)
            }
            else if (key === 'Backspace') {
                event.preventDefault();
                handleBackspaceKeyPress(container, endContainer, children, range, startOffset, endOffset);
            }
            else if (key.length === 1) {
                event.preventDefault();
                handleCharacterInsertion(container, children, event.key, startOffset);
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