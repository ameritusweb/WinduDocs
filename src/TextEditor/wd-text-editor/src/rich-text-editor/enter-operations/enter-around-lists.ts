import { AstNode, IHistoryManagerRecorder, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNodeFromFormat, findNodeByGuid, generateKey, replaceKeys } from "../node-operations";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const enterAroundLists = (updateData: UpdateData, historyManager: IHistoryManagerRecorder, children: AstNode[], container: Node, startOffset: number) => {

    const { astParent, containerIndex, skyChildren } = updateData;

    if (startOffset === 0)
    {
        // TODO
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        if (child && astParent) {
            const [node] = findNodeByGuid(skyChildren, astParent.Guid, null);
            const newNode = replaceKeys(node!);
            newNode.Guid = generateKey();
            newNode.Children = [ createNewAstNodeFromFormat('p', '\n') ];
            const index = skyChildren.findIndex((c) => c.Guid === astParent.Guid);
            skyChildren.splice(index + 1, 0, newNode);
            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition(updateData.child!, 0, startOffset);
            historyBuilder.addFinalCursorPosition(newNode.Children[0], 0, 0);
            historyBuilder.addInsertAfterCommand(skyChildren[index], newNode);
            historyBuilder.applyTo(historyManager);
            return { type: 'skyLevelSplitOrMove', nodes: skyChildren };
        }
    }
    else
    {
        // TODO
    }

    return null;
}

export default enterAroundLists;