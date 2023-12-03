import { AstNode, AstUpdate, IHistoryManager, IdableNode, UpdateData } from "../../components/wysiwyg/interface";
import { insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText, insertBothStrongAndEmphasisTextIntoNormalText, insertEitherStrongOrEmphasisTextIntoNormalText, insertNormalTextIntoBothStrongAndEmphasisText, insertNormalTextIntoEitherStrongOrEmphasisText, insertNormalTextIntoOtherNormalText, insertStrongTextIntoEmphasisTextOrViceVersa, insertTextIntoAListItem, insertTextIntoEitherACodeBlockOrAlertBlock, insertTextIntoHeading } from "../insertion-operations";

// Handle character insertion
const handleCharacterInsertion = (historyManager: IHistoryManager, container: Node, children: AstNode[], updateData: UpdateData, key: string, editorState: string, startOffset: number): AstUpdate | null => {
    if (container && container.nodeName === '#text')
    {
        let {parent, child, astParent, higherLevelIndex, immediateChild, rootChildId, containerIndex, higherLevelChildren} = updateData;
        if (parent) {
            const grandParent = parent.parentElement;
            if (child) {
                let grandChild = null;
                if (child.Children.length) {
                    grandChild = child.Children[containerIndex];
                }
                if (astParent && parent.parentElement?.nodeName === 'STRONG' && parent.nodeName === 'EM' && editorState === 'normal')
                {
                    const res = insertNormalTextIntoBothStrongAndEmphasisText(container as Text, startOffset, historyManager, higherLevelIndex, astParent, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                }
                else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && editorState === 'normal')
                {
                    const res = insertNormalTextIntoEitherStrongOrEmphasisText(container as Text, startOffset, historyManager, higherLevelIndex, child, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if ((parent.nodeName === 'STRONG' && editorState === 'em') || (parent.nodeName === 'EM' && editorState === 'strong') )
                {
                    const res = insertStrongTextIntoEmphasisTextOrViceVersa(parent, editorState, startOffset, historyManager, higherLevelIndex, astParent, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && parent.parentElement?.nodeName !== 'STRONG' && Array.isArray(editorState)) {
                    const res = insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText(parent, historyManager, higherLevelIndex, higherLevelChildren, children, startOffset, key);
                    if (res)
                        return res;
                } else if (grandParent && (grandParent.nodeName === 'CODE' || grandParent.nodeName === 'DIV')) {
                    const res = insertTextIntoEitherACodeBlockOrAlertBlock(child, container as IdableNode, startOffset, rootChildId, historyManager, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if (grandParent && grandChild && astParent && grandParent.nodeName === 'LI') {
                    const res = insertTextIntoAListItem(grandChild, startOffset, child, rootChildId, historyManager, astParent, container as Text, key);
                    if (res)
                        return res;
                } else if (grandParent && astParent && child && grandParent.nodeName.startsWith('H')) {
                    const res = insertTextIntoHeading(child, container as Text, historyManager, startOffset, astParent, rootChildId, children, key);
                    if (res)
                        return res;
                } else if (grandChild !== null && parent.nodeName === 'P' && ((editorState === 'strong' || editorState === 'em') || Array.isArray(editorState))) {
                    let higherLevelIndex: number | null = null;
                    let type = 'insertNew';
                    if (Array.isArray(editorState))
                    {
                        const res = insertBothStrongAndEmphasisTextIntoNormalText(startOffset, container, child, grandChild, children, containerIndex, historyManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, key);
                        if (res)
                            return res;
                    } else {
                        const res = insertEitherStrongOrEmphasisTextIntoNormalText(startOffset, container, child, grandChild, children, containerIndex, historyManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, key);
                        if (res)
                            return res;
                    }
                } else if (grandChild !== null && grandParent) {
                    const res = insertNormalTextIntoOtherNormalText(grandChild, container as Text, startOffset, historyManager, child, rootChildId, children, key);
                    if (res)
                        return res;
                } else {
                    throw new Error('Something went wrong when entering a character.');
                }
            } else {
                child = children[containerIndex];
                if (child) {
                    if (parent.nodeName === 'P' && ((editorState === 'strong' || editorState === 'em') || Array.isArray(editorState)))
                    {
                        const higherLevelChild = higherLevelChildren[higherLevelIndex];
                        let higherLevelIndexNew: number | null = null;
                        let type = 'insertNew';
                        if (Array.isArray(editorState))
                        {
                            const res = insertBothStrongAndEmphasisTextIntoNormalText(startOffset, container, higherLevelChild, child, children, containerIndex, historyManager, higherLevelIndexNew, higherLevelChildren, type, rootChildId, editorState, key);
                            if (res)
                                return res;
                        } else {
                            const res = insertEitherStrongOrEmphasisTextIntoNormalText(startOffset, container, higherLevelChild, child, children, containerIndex, historyManager, higherLevelIndexNew, higherLevelChildren, type, rootChildId, editorState, key);
                            if (res)
                                return res;
                        }
                        
                    } else {
                        throw new Error('Something went wrong when entering a character.');
                    }
                }
            }
        }
    }

    return null;
};

export default handleCharacterInsertion;