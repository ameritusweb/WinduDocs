import { AstNode } from "../../components/wysiwyg/interface";

const findNodeByGuid = (nodes: AstNode[], guid: string, parent: AstNode | null): [AstNode | null, AstNode | null, AstNode | null] => {

    if (guid.includes('_'))
    {
        guid = guid.substring(guid.indexOf('_') + 1);
    }

    for (const node of nodes) {
        if (node.Guid === guid) {
            return [node, parent, node];
        }

        const foundInChildren = findNodeByGuid(node.Children, guid, node);
        if (foundInChildren[0]) {
            // If the target node is found in the children, set the current node as the third element
            return [foundInChildren[0], foundInChildren[1], node];
        }
    }

    return [null, null, null];
}

export default findNodeByGuid;