import { AstNode, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNodeFromFormat, deepCopyAstNode, splitTree } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";

const enterAroundQuoteBlocks = (updateData: UpdateData, parentId: string, historyManager: IHistoryManager, higherLevelChildren: AstNode[], children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild, containerIndex } = updateData;

    if (startOffset === 0)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNodeFromFormat('p', '\n');
            higherLevelChildren.splice(higherLevelIndex, 0, newNode);
            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex + 1], startOffset, newNode, higherLevelChildren[higherLevelIndex + 1], 0, 0);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNodeFromFormat('p', '\n');
            higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newNode, newNode, 0, 0);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }
    else {
        const higherLevelChild = higherLevelChildren[higherLevelIndex];
        if (child) {
            const [node1, node2] = splitTree(higherLevelChild, grandChild!, startOffset);
            const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
            higherLevelChildren.splice(higherLevelIndex, 1, node1);
            historyManager.recordChildReplace(null, oldNode, node1, node1, 0, startOffset);
            higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, node2, node2, 0, 0, true);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }

    return null;
}

export default enterAroundQuoteBlocks;