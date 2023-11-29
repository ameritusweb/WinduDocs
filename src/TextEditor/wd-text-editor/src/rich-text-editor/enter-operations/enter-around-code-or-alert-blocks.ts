import { AstNode, IHistoryManagerRecorder, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNode, deepCopyAstNode, splitNode } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";

const enterAroundCodeOrAlertBlocks = (updateData: UpdateData, parentId: string, historyManager: IHistoryManagerRecorder, higherLevelChildren: AstNode[], children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, containerIndex } = updateData;

    if (startOffset === 0)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNode('Text', 0, 0, '\n');
            higherLevelChildren.splice(higherLevelIndex, 0, newNode);
            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex + 1], startOffset, newNode, { ...higherLevelChildren[higherLevelIndex + 1], NodeName: 'ParagraphBlock' }, containerIndex, 0);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }   
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNode('Text', 0, 0, '\n');
            higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newNode, { ...newNode, NodeName: 'ParagraphBlock' }, 0, 0);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }   
    }
    else
    {
        const [node1, node2] = splitNode(child!, startOffset);
        const oldNode = deepCopyAstNode(higherLevelChildren[containerIndex]);
        higherLevelChildren.splice(higherLevelIndex, 1, node1);
        historyManager.recordChildReplace(null, oldNode, node1, { ...node1, NodeName: 'ParagraphBlock' }, 0, startOffset);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, node2, { ...node2, NodeName: 'ParagraphBlock' }, 0, 0, true);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default enterAroundCodeOrAlertBlocks;