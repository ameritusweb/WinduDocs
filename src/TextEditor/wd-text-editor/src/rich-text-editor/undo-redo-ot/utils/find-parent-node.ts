import { AstNode } from "../../../components/wysiwyg/interface";

const findParentNode = (node: AstNode, childId: string, parent: AstNode | null = null): AstNode | null => {
    if (node.Guid === childId) {
        return parent;
    }
    for (const child of node.Children) {
        const foundParent = findParentNode(child, childId, node);
        if (foundParent) return foundParent;
    }
    return null;
}

export default findParentNode;