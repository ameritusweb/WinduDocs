import { AstNode, AstUpdate, IHistoryManagerRecorder, IdableNode, UpdateData } from "../../components/wysiwyg/interface";
import { insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText, insertBothStrongAndEmphasisTextIntoNormalText, 
    insertEitherStrongOrEmphasisTextIntoNormalText, insertNormalTextIntoBothStrongAndEmphasisText, 
    insertNormalTextIntoEitherStrongOrEmphasisText, insertNormalTextIntoOtherNormalText, 
    insertStrongTextIntoEmphasisTextOrViceVersa, insertTextIntoEitherACodeBlockOrAlertBlock } from "../insertion-operations";


const handleCharacterInsertion = (historyManager: IHistoryManagerRecorder, container: Node, children: AstNode[], updateData: UpdateData, key: string, editorState: string, startOffset: number): AstUpdate | null => {
    if (container && container.nodeName === '#text')
    {
        let {parent, child, astParent, higherLevelIndex, immediateChild, rootChildId, containerIndex, higherLevelChildren} = updateData;
        console.log("c1");
        if (parent) {
            console.log("c2");
            const grandParent = parent.parentElement;
            if (child) {
                console.log("c3");
                let grandChild = null;
                if (child.Children.length) {
                    console.log("c4");
                    grandChild = child.Children[containerIndex];
                }
                if (astParent && parent.parentElement?.nodeName === 'STRONG' && parent.nodeName === 'EM' && editorState === 'normal')
                {
                    console.log("c5");
                    const res = insertNormalTextIntoBothStrongAndEmphasisText(container as IdableNode, startOffset, child, historyManager, higherLevelIndex, astParent, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                }
                else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && editorState === 'normal')
                {
                    console.log("c6");
                    const res = insertNormalTextIntoEitherStrongOrEmphasisText(container as IdableNode, startOffset, historyManager, higherLevelIndex, child, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if ((parent.nodeName === 'STRONG' && editorState === 'em') || (parent.nodeName === 'EM' && editorState === 'strong') )
                {
                    console.log("c7");
                    const res = insertStrongTextIntoEmphasisTextOrViceVersa(parent, child, editorState, startOffset, historyManager, higherLevelIndex, astParent, containerIndex, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && parent.parentElement?.nodeName !== 'STRONG' && Array.isArray(editorState)) {
                    console.log("c8");
                    const res = insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText(parent, child, container as IdableNode, containerIndex, historyManager, higherLevelIndex, higherLevelChildren, children, startOffset, key);
                    if (res)
                        return res;
                } else if (grandParent && (grandParent.nodeName === 'CODE' || grandParent.nodeName === 'DIV')) {
                    console.log("c9");
                    const res = insertTextIntoEitherACodeBlockOrAlertBlock(child, container as IdableNode, startOffset, rootChildId, historyManager, higherLevelChildren, children, key);
                    if (res)
                        return res;
                } else if (grandChild !== null && parent.nodeName === 'P' && ((editorState === 'strong' || editorState === 'em') || Array.isArray(editorState))) {
                    console.log("c10");
                    let higherLevelIndex: number | null = null;
                    let type = 'insertNew';
                    if (Array.isArray(editorState))
                    {
                        console.log("c10a");
                        const res = insertBothStrongAndEmphasisTextIntoNormalText(startOffset, container, child, grandChild, children, containerIndex, historyManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, key);
                        if (res)
                            return res;
                    } else {
                        console.log("c10b");
                        const res = insertEitherStrongOrEmphasisTextIntoNormalText(startOffset, container, child, grandChild, children, containerIndex, historyManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, key);
                        if (res)
                            return res;
                    }
                } else if (grandChild !== null && grandParent) {
                    console.log("c11");
                    const res = insertNormalTextIntoOtherNormalText(grandChild, container as IdableNode, startOffset, historyManager, child, rootChildId, children, key);
                    if (res)
                        return res;
                } else {
                    console.log("c12");
                    throw new Error('Something went wrong when entering a character.');
                }
            } else {
                console.log("c13");
                child = children[containerIndex];
                if (child) {
                    console.log("c14");
                    if (parent.nodeName === 'P' && ((editorState === 'strong' || editorState === 'em') || Array.isArray(editorState)))
                    {
                        console.log("c15");
                        const higherLevelChild = higherLevelChildren[higherLevelIndex];
                        let higherLevelIndexNew: number | null = null;
                        let type = 'insertNew';
                        if (Array.isArray(editorState))
                        {
                            console.log("c16");
                            const res = insertBothStrongAndEmphasisTextIntoNormalText(startOffset, container, higherLevelChild, child, children, containerIndex, historyManager, higherLevelIndexNew, higherLevelChildren, type, rootChildId, editorState, key);
                            if (res)
                                return res;
                        } else {
                            console.log("c17");
                            const res = insertEitherStrongOrEmphasisTextIntoNormalText(startOffset, container, higherLevelChild, child, children, containerIndex, historyManager, higherLevelIndexNew, higherLevelChildren, type, rootChildId, editorState, key);
                            if (res)
                                return res;
                        }
                        
                    } else {
                        console.log("c18");
                        throw new Error('Something went wrong when entering a character.');
                    }
                }
            }
        }
    }

    return null;
};

export default handleCharacterInsertion;