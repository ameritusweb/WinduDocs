import { AstNode } from "../../components/wysiwyg/interface";

const findNodeByGuid = (nodes: AstNode[], guid: string, parent: AstNode | null): [AstNode | null, AstNode | null] => {

    if (guid.includes('_'))
    {
        guid = guid.substring(guid.indexOf('_') + 1);
    }

    for (const node of nodes) {
        if (node.Guid === guid) {
            return [node, parent];
        }

        const foundInChildren = findNodeByGuid(node.Children, guid, node);
        if (foundInChildren[0]) {
            return foundInChildren;
        }
    }

    return [null, null];
}

export default findNodeByGuid;