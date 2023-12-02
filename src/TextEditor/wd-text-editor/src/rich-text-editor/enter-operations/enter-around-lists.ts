import { AstNode, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNodeFromFormat, findNodeByGuid, generateKey, replaceKeys } from "../node-operations";

const enterAroundLists = (updateData: UpdateData, historyManager: IHistoryManager, children: AstNode[], container: Node, startOffset: number) => {

    const { astParent, containerIndex, higherLevelChildren } = updateData;

    if (startOffset === 0)
    {
        // TODO
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        if (child && astParent) {
            const [node] = findNodeByGuid(higherLevelChildren, astParent.Guid, null);
            const newNode = replaceKeys(node!);
            newNode.Guid = generateKey();
            newNode.Children = [ createNewAstNodeFromFormat('p', '\n') ];
            const index = higherLevelChildren.findIndex((c) => c.Guid === astParent.Guid);
            higherLevelChildren.splice(index + 1, 0, newNode);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }
    else
    {
        // TODO
    }

    return null;
}

export default enterAroundLists;