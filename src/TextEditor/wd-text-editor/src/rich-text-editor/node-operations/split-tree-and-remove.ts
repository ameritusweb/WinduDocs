import { splitNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

/**
 * Splits the AST tree based on specified nodes and offsets and extracts the text within.
 * @param {AstNode[]} siblings - An array of sibling AST nodes.
 * @param {AstNode} leftNode - The AST node at which to start extraction.
 * @param {number} leftOffset - The offset within the leftNode to start extraction.
 * @param {AstNode} rightNode - The AST node at which to end extraction.
 * @param {number} rightOffset - The offset within the rightNode to end extraction.
 * @returns {Array} A tuple containing the left part of the tree, the right part of the tree, and the extracted text.
 */
const splitTreeAndRemove = (siblings: AstNode[], leftNode: AstNode, leftOffset: number, rightNode: AstNode, rightOffset: number): AstNode[] | null => {
    if (!siblings || siblings.length === 0) {
        throw new Error("Invalid input: siblings array must be provided and not empty");
    }

    let leftTargetFound = false;
    let rightTargetFound = false;
    
    const traverseAndExtractSpan = (nodes: AstNode[], depth: number): [AstNode[], AstNode[], AstNode[]] => {
        const leftChildren: AstNode[] = [];
        const mergedChildren: AstNode[] = [];
        const rightChildren: AstNode[] = [];

        nodes.forEach(node => {
            
            let isLeftSplit = false;
            let isRightSplit = false;
            if (node.Guid === leftNode.Guid) {
                leftTargetFound = true;
                const [leftPart, middleStartNode] = splitNode(node, leftOffset);
                mergedChildren.push(leftPart);
                leftChildren.push(leftPart);
                if (node.Guid === rightNode.Guid) {
                    rightTargetFound = true;
                    const [middleEndNode, rightPart] = splitNode(middleStartNode, rightOffset - leftOffset, undefined, rightNode.Guid);
                    mergedChildren.push(rightPart);
                    rightChildren.push(rightPart);
                    return;
                } else {
                    isLeftSplit = true;
                }
            } else if (node.Guid === rightNode.Guid) {
                if (!leftTargetFound)
                    throw new Error('Left target not found.');
                rightTargetFound = true;
                const [middleEndNode, rightPart] = splitNode(node, rightOffset);
                // extractedText += extractText(middleEndNode);
                mergedChildren.push(rightPart);
                rightChildren.push(rightPart);
                isRightSplit = true;
                return;
            }

            if (node.Children && node.Children.length > 0) {
                const [leftChild, mergedChild, rightChild] = traverseAndExtractSpan(node.Children, depth + 1);

                if (leftChild.length > 0) {
                    leftChildren.push({...node, Children: leftChild});
                }
                if (rightChild.length > 0) {
                    rightChildren.push({...node, Children: rightChild});
                }
                if (mergedChild.length > 0) {
                    mergedChildren.push({...node, Children: mergedChild});
                }

                return;
            }

            
            if (!leftTargetFound) {
                if (!(isLeftSplit || isRightSplit)) {
                    mergedChildren.push(node);
                    leftChildren.push(node);    
                }
            } else if (rightTargetFound) {
                mergedChildren.push(node);
                rightChildren.push(node); 
            }
        });

        if (depth === 0 && !rightTargetFound)
        {
            throw new Error('Right target not found.');
        }

        return [leftChildren, mergedChildren, rightChildren];
    };
    
    if (leftOffset < 0 || rightOffset < 0) {
        throw new Error("Invalid offset: Offsets must be non-negative");
    }

    try {  
        const [leftTrees, middleTrees] = traverseAndExtractSpan(siblings, 0);
        return [...middleTrees];
    } catch (error) {
        console.error("Error encountered during traversal and extraction:", error);
        return null;
    }
};

export default splitTreeAndRemove;
