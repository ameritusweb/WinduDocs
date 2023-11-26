import { generateKey, isNodeEmpty, splitNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const splitTreeDeux = (root: AstNode, target: AstNode, offset: number, rightNodeGuid?: string): [AstNode, AstNode] => {
    let targetFound = false;

    const generateNewTree = (node: AstNode, generateNewGuid: boolean): AstNode => {
        return {
            ...node,
            Children: node.Children.map(child => generateNewTree(child, generateNewGuid)),
            Guid: generateNewGuid ? generateKey() : node.Guid
        };
    };

    const traverseAndSplit = (node: AstNode, depth: number): [AstNode, AstNode | null] => {
        if (node.Guid === target.Guid) {
            targetFound = true;
            const [leftNode, rightNode] = splitNode(node, offset, undefined, rightNodeGuid);
            return [leftNode, rightNode];
        }

        let leftChildren = [];
        let rightChildren = [];
        for (let i = 0; i < node.Children.length; i++) {
            if (targetFound) {
                const newChild = generateNewTree(node.Children[i], true);
                if (!isNodeEmpty(newChild)) {
                    rightChildren.push(newChild);
                }
            } else {
                const [leftChild, rightChild] = traverseAndSplit(node.Children[i], depth + 1);
                if (!isNodeEmpty(leftChild)) {
                    leftChildren.push(leftChild);
                }
                if (rightChild && !isNodeEmpty(rightChild)) {
                    rightChildren.push(rightChild);
                }
            }
        }

        const leftPart = { ...node, Children: leftChildren, Guid: node.Guid };
        const rightPart = targetFound ? { ...node, Children: rightChildren, Guid: generateKey() } : null;
        return [leftPart, rightPart];
    };

    const [leftTree, rightTree] = traverseAndSplit(root, 0);
    return [leftTree, rightTree ? rightTree : generateNewTree(root, true)];
};

export default splitTreeDeux;