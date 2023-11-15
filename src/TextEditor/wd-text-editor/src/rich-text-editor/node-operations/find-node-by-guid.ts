import { AstNode } from "../../components/wysiwyg/interface";

const findNodeByGuid = (nodes: AstNode[], guid: string): AstNode | null => {
    for (const node of nodes) {
        if (node.Guid === guid) {
            return node;
        }

        const foundInChildren = findNodeByGuid(node.Children, guid);
        if (foundInChildren) {
            return foundInChildren;
        }
    }

    return null;
}

export default findNodeByGuid;