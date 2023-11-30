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
const splitTreeAndExtractSpan = (siblings: AstNode[], leftNode: AstNode, leftOffset: number, rightNode: AstNode, rightOffset: number): [AstNode[] | null, AstNode[] | null, string] => {
    if (!siblings || siblings.length === 0) {
        throw new Error("Invalid input: siblings array must be provided and not empty");
    }

    let leftTargetFound = false;
    let rightTargetFound = false;
    let extractedText = "";

    // Extracts text from a given node if it contains text.
    const extractText = (node: AstNode): string => {
        return node.TextContent || '';
    };

    // Recursively traverses the AST nodes and their children, and splits them based on the provided nodes and offsets.
    const traverseAndExtractSpan = (nodes: AstNode[]): [AstNode[], AstNode[], AstNode[]] => {
        let leftChildren: AstNode[] = [];
        let middleChildren: AstNode[] = [];
        let rightChildren: AstNode[] = [];

        nodes.forEach(node => {
            // Flags to determine if the current node or its children are split
            let isLeftSplit = false;
            let isRightSplit = false;
            if (node.Guid === leftNode.Guid) {
                leftTargetFound = true;
                const [leftPart, middleStartNode] = splitNode(node, leftOffset);
                leftChildren.push(leftPart);
                extractedText += extractText(middleStartNode);
                if (node.Guid === rightNode.Guid) {
                    rightTargetFound = true;
                    const [middleEndNode, rightPart] = splitNode(middleStartNode, rightOffset - leftOffset, undefined, rightNode.Guid);
                    extractedText += extractText(middleEndNode);
                    middleChildren.push(middleEndNode);
                    rightChildren.push(rightPart);
                    return;
                } else {
                    middleChildren.push(middleStartNode);
                    isLeftSplit = true;
                }
            } else if (node.Guid === rightNode.Guid) {
                rightTargetFound = true;
                const [middleEndNode, rightPart] = splitNode(node, rightOffset);
                extractedText += extractText(middleEndNode);
                middleChildren.push(middleEndNode);
                rightChildren.push(rightPart);
                isRightSplit = true;
                return;
            }
            else if (leftTargetFound && !rightTargetFound) {
                extractedText += extractText(node);
            }

            if (node.Children && node.Children.length > 0) {
                const [leftChild, middleChild, rightChild] = traverseAndExtractSpan(node.Children);
                appendChildren(leftChildren, node, leftChild);
                appendChildren(middleChildren, node, middleChild);
                appendChildren(rightChildren, node, rightChild);
            }

            // Decide which array to push the node (or its split parts) to
            if (!leftTargetFound) {
                if (isLeftSplit || isRightSplit) {
                    // If the node was split, its parts are already added to respective arrays in the recursive call
                    // No need to add the whole node here
                } else {
                    leftChildren.push(node); // The whole node is part of the left section
                }
            } else if (leftTargetFound && !rightTargetFound) {
                middleChildren.push(node); // The whole node is part of the middle section
            } else if (rightTargetFound) {
                rightChildren.push(node); // The whole node is part of the right section
            }
        });

        return [leftChildren, middleChildren, rightChildren];
    };

    /**
     * Appends child nodes to the corresponding parent node's children array.
     * @param {AstNode[]} parentArray - The array to which the children should be appended.
     * @param {AstNode} parentNode - The parent node whose properties should be preserved.
     * @param {AstNode[]} childrenArray - The array of child nodes to append.
     */
    const appendChildren = (parentArray: AstNode[], parentNode: AstNode, childrenArray: AstNode[]) => {
        if (childrenArray.length > 0) {
            parentArray.push({ ...parentNode, Children: childrenArray });
        }
    };

    // Error handling for invalid offsets
    if (leftOffset < 0 || rightOffset < 0) {
        throw new Error("Invalid offset: Offsets must be non-negative");
    }

    try {
        // Begins the traversal and extraction process on the array of sibling nodes
        const [leftTrees, middleTrees, rightTrees] = traverseAndExtractSpan(siblings);
        return [leftTrees, rightTrees, extractedText];
    } catch (error) {
        console.error("Error encountered during traversal and extraction:", error);
        return [null, null, ''];
    }
};

export default splitTreeAndExtractSpan;
