import { findNodeByGuid } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const findTextNodeByNode = (nodes: AstNode[], nodeToFind: Node, parent: AstNode | null): [AstNode | null, AstNode | null, AstNode | null] => {

    let guid = '';
    if (nodeToFind.parentElement) {
        const found = findNodeByGuid(nodes, nodeToFind.parentElement.id, null);
        if (found[0]) {
            const childIndex = Array.from(nodeToFind.parentElement.childNodes).indexOf(nodeToFind as ChildNode);
            if (childIndex > -1) {
                const astNode = found[0].Children[childIndex];
                guid = astNode.Guid;
            }
        }
    }

    if (!guid) {
        return [null, null, null];
    }

    return findNodeByGuid(nodes, guid, parent);
}

export default findTextNodeByNode;