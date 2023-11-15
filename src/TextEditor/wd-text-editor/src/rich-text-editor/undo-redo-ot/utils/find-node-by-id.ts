import { AstNode } from "../../../components/wysiwyg/interface";

const findNodeById = (node: AstNode, id: string): AstNode | null => {
    if (node.Guid === id) {
        return node;
    }
    for (const child of node.Children) {
        const found = findNodeById(child, id);
        if (found) return found;
    }
    return null;
}

export default findNodeById;