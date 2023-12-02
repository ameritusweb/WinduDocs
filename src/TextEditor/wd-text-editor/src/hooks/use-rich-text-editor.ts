import { AstContext, AstNode, AstUpdate, IHistoryManager, UpdateData } from "../components/wysiwyg/interface";
import { handleBackspaceKeyPress, handleCharacterInsertion, handleEnterKeyPress } from "../rich-text-editor/handlers";
import { createNewAstNode, createNewAstNodeFromFormat, findClosestAncestor, findHigherlevelIndex, findNodeByGuid, findNodeIndexByGuid } from "../rich-text-editor/node-operations";
import { HistoryManager, trimSpecial } from "../rich-text-editor/undo-redo-ot";
import EditorData, { EditorDataType } from "./editor-data";

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;
    const historyManager: IHistoryManager = HistoryManager;

    const gatherUpdateData = (children: AstNode[], higherLevelChildren: AstNode[], index?: number): { updateData: UpdateData; container: Node; endContainer: Node; range: Range; startOffset: number; endOffset: number } | null => {
        const sel = window.getSelection();
        let skyChildren: AstNode[] = [];
        let higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
        if (higherLevelIndex === null) {
            higherLevelIndex = -1;
            const i = higherLevelChildren.findIndex(c => c.Guid === children[0].Guid);
            if (i > -1) {
                higherLevelChildren[i] = children[0];
            } else if (index !== undefined) {
                const nestedIndex = findHigherlevelIndex(children, higherLevelChildren[index].Children);
                if (nestedIndex !== null) {
                    higherLevelChildren[index].Children[nestedIndex].Children = children;
                    skyChildren = higherLevelChildren;
                    higherLevelChildren = higherLevelChildren[index].Children;
                    higherLevelIndex = nestedIndex;
                }
            }
        } else {
            higherLevelChildren[higherLevelIndex].Children = children;
        }
        if (sel) {
            const range = sel.getRangeAt(0);
            let container = range.startContainer;
            let endContainer = range.endContainer;
            const differentContainers = container !== endContainer;
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
            {
                console.warn('parent is null');
                return null;
            }
            const rootChildId = findClosestAncestor(parent, 'richTextEditor')?.id;
            if (!rootChildId)
            {
                console.warn('rootChildId is null');
                return null;
            }

            const containerIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
            const [child, astParent, immediateChild] = findNodeByGuid(skyChildren.length > 0 ? skyChildren : higherLevelChildren, trimSpecial(parent?.id, { startString: 'para_' }), null);
            const lowerLevelIndex = findNodeIndexByGuid(children, parent?.id || '');
            const lowerLevelChild: AstNode | null = children[lowerLevelIndex === null ? -1 : lowerLevelIndex] || null;
            const grandChild = child?.Children[containerIndex] || null;
            let endChild = null;
            let endGrandChild = null;
            if (differentContainers) {
                if (endContainer.nodeName !== '#text')
                {
                    endContainer = endContainer.firstChild!;
                }
                if (endContainer.nodeName !== '#text')
                {
                    endContainer = endContainer.firstChild!;
                }
                const endParent = endContainer.parentElement;
                if (endParent) {
                    const endContainerIndex = Array.from(endParent.childNodes).findIndex((c) => c === endContainer);
                    [endChild] = findNodeByGuid(higherLevelChildren, endParent?.id, null);
                    endGrandChild = endChild?.Children[endContainerIndex] || null;
                }
            }
            const updateData: UpdateData = { parent, higherLevelIndex, child, astParent, lowerLevelChild, immediateChild, rootChildId, containerIndex, grandChild, endChild, endGrandChild, skyChildren, higherLevelChildren }
            return {updateData, container, endContainer, range, startOffset, endOffset};
        }
        return null;
    }

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[], higherChildren: AstNode[], editorData: EditorDataType, context: AstContext, pathIndices: number[], higherLevelIndex?: number): AstUpdate => {

        const updateDataRes = gatherUpdateData(children, higherChildren, higherLevelIndex);

        if (updateDataRes)
        {
            const { updateData, container, endContainer, range, startOffset, endOffset } = updateDataRes;
            const key = event.key;
            if (key === 'Enter') {
                event.preventDefault();
                let update = handleEnterKeyPress(historyManager, container, children, updateData, context, range, startOffset);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
            else if (key === 'Backspace') {
                event.preventDefault();
                let update = handleBackspaceKeyPress(historyManager, container, endContainer, children, updateData, range, startOffset, endOffset);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
            else if (key.length === 1) {
                event.preventDefault();
                let update = handleCharacterInsertion(historyManager, container, children, updateData, event.key, editorData.editorState, startOffset);
                if (update) {
                    update = { ...update, pathIndices };
                    editorData.emitEvent('update', 'richTextEditor', update);
                }
            }
        }

        return {type: 'none', nodes: children };

    }

    const restoreCursorPosition = (mutationsList: MutationRecord[]) => {

        historyManager.restoreCursorPosition();

    }

    return {
        editorData,
        historyManager,
        gatherUpdateData,
        updateAst,
        createNewAstNode,
        createNewAstNodeFromFormat,
        restoreCursorPosition
      };
}