import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { moveArray } from "../array-processing";
import { createNewAstNode, createNewAstNodeFromFormat, findClosestAncestor, findHigherlevelIndex, findNodeByGuid, generateKey, splitNode, splitNodeAtTarget } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";

const splitTree = (root: AstNode, leafNode: AstNode, offset: number) => {

    const leftTree = {} as AstNode;
    const rightTree = {} as AstNode;
    const path: number[] = [];
    let foundPath: number[] = [];
    let splitFound = false;

    function traverse(node: AstNode, left: AstNode, right: AstNode, leaf: AstNode, offset: number, index: number, depth: number) {

        path[depth] = index;
        Object.assign(left, node);
        Object.assign(right, node);

        left.Children = [];
        right.Children = [];

        //if (depth === 0)
        //{
            //left.Guid = generateKey();
            right.Guid = generateKey();
        //}

        if (node === leaf)
        {
            splitFound = true;
            foundPath = path.slice(0);
            return splitNode(node, offset);
        }

        index = 0;
        for (const child of node.Children)
        {
            const leftTreeNode = Object.assign({}, child);
            leftTreeNode.Children = [];
            const rightTreeNode = Object.assign({}, child);
            rightTreeNode.Children = [];
            const innerNode = traverse(child, leftTreeNode, rightTreeNode, leaf, offset, index, depth + 1);
            if (Array.isArray(innerNode)) {
                left.Children.push(innerNode[0]);
                right.Children.push(innerNode[1]);
            }
            else if (splitFound) {
                if (path[depth + 1] === foundPath[depth + 1])
                {
                    left.Children.push(leftTreeNode);
                }
                right.Children.push(rightTreeNode);
            } else {
                left.Children.push(leftTreeNode);
            }
            index++;
        }

    }

    traverse(root, leftTree, rightTree, leafNode, offset, 0, 0);
  
    return [leftTree, rightTree];  
  
  }

  const replaceKeys = (node: AstNode): AstNode => {

    return {
      ...node, 
      Guid: generateKey(),
      Children: node.Children.map(child => replaceKeys(child))
    };
  
  }

const handleEnterKeyPress = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], range: Range, startOffset: number, higherLevelId?: string): AstUpdate | null => {
    const commonAncestor = range.commonAncestorContainer;
    if (commonAncestor.nodeName !== '#text') {

    } 
    else
    {
        const parent = container.parentElement;
        if (parent) {
            const parentId = parent.id;
            const rootChild = findClosestAncestor(parent, 'richTextEditor');
            let [child, astParent] = findNodeByGuid(higherLevelChildren, parentId, null);
            if (startOffset === 0)
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const child = children[childIndex];
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                if (child.TextContent === '\n')
                                {
                                    const newLine = createNewAstNode('Text', 0, 0, '\n');
                                    children.splice(childIndex + 1, 0, newLine);
                                    higherLevelChildren[higherLevelIndex].Children = children;
                                }
                                else if (childIndex > 0)
                                {
                                    const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                    moveArray(children, childIndex, newPara.Children, 0);
                                    higherLevelChildren[higherLevelIndex].Children = children;
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank, newPara);
                                } else {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex, 0, newBlank);
                                }
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        }
                    }
                }
            } 
            else if (startOffset === container.textContent?.length)
            {
                const gparent = parent.parentElement;
                if (gparent && gparent?.nodeName === 'LI') {
                    const ggparent = gparent.parentElement;
                    if (ggparent)
                    {
                        if (ggparent.nodeName === 'UL') {
                            const childNodes = Array.from(parent.childNodes);
                            const childIndex = childNodes.findIndex((c) => c === container);
                            const child = children[childIndex];
                            if (child && higherLevelId) {
                                const [node] = findNodeByGuid(higherLevelChildren, higherLevelId, null);
                                const newNode = replaceKeys(node!);
                                newNode.Guid = generateKey();
                                newNode.Children = [ createNewAstNodeFromFormat('p', '\n') ];
                                const index = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                higherLevelChildren.splice(index + 1, 0, newNode);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        } else if (ggparent.nodeName === 'OL') {
                            const childNodes = Array.from(parent.childNodes);
                            const childIndex = childNodes.findIndex((c) => c === container);
                            const child = children[childIndex];
                            if (child && higherLevelId) {
                                const [node] = findNodeByGuid(higherLevelChildren, higherLevelId, null);
                                const newNode = replaceKeys(node!);
                                const index = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                higherLevelChildren.splice(index + 1, 0, newNode);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        }
                    }
                }
                else if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (rootChild && higherLevelIndex !== null) {
                                const astChild = child.Children[childIndex];
                                if (childIndex === child.Children.length - 1 && startOffset === astChild.TextContent?.length)
                                {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                } else {
                                    const nextSibling = child.Children[childIndex + 1];
                                    if (nextSibling && nextSibling.TextContent === '\n')
                                    {
                                        const newLine = createNewAstNode('Text', 0, 0, '\n');
                                        child.Children.splice(childIndex + 1, 0, newLine);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    } else {
                                        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                        higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                            }
                            else if (higherLevelId) {
                                const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                if (higherLevelIndex) {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const [lowerLevelParent] = findNodeByGuid(higherLevelChildren, parent.id, null);
                        const child = lowerLevelParent?.Children[childIndex];
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                higherLevelChildren[higherLevelIndex].Children = children;
                                if (gparent.nodeName === 'BLOCKQUOTE')
                                {
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    if (lowerLevelParent) {
                                        const lowerLevelChild = lowerLevelParent.Children[childIndex];
                                        const split = splitTree(higherLevelChild, lowerLevelChild, startOffset);
                                        higherLevelChildren.splice(higherLevelIndex, 1, ...split);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                                else if (gparent.nodeName === 'CODE')
                                {
                                    const [node1, node2, newLine] = splitNode(child, startOffset);
                                    children.splice(childIndex, 1, node1, newLine, node2);
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    if (higherLevelChild)
                                    {
                                        higherLevelChild.Guid = generateKey();
                                    }
                                    return { type: 'splitOrMove', nodes: children, higherLevelNodes: higherLevelChildren };
                                }
                                else if (parent.nodeName === 'P')
                                {
                                    const [node1, node2] = splitNode(child, startOffset);
                                    children.splice(childIndex, 1, node1, node2);
                                    const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                    moveArray(children, childIndex + 1, newPara.Children, 0);
                                    higherLevelChildren[higherLevelIndex].Guid = generateKey();
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newPara);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                } else {
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    const [lowerLevelParent] = findNodeByGuid(children, parent.id, null);
                                    if (lowerLevelParent) {
                                        const lowerLevelChild = lowerLevelParent.Children[childIndex];
                                        const split = splitTree(higherLevelChild, lowerLevelChild, startOffset);
                                        higherLevelChildren.splice(higherLevelIndex, 1, ...split);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                            } else if (higherLevelId) {
                                const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                if (higherLevelIndex) {
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    const [node1, node2] = splitNode(child, startOffset);
                                    children.splice(childIndex, 1, node1);
                                    const newNode = createNewAstNode(higherLevelChild.NodeName, 0, 0, null);
                                    newNode.Attributes = Object.assign({}, higherLevelChild.Attributes);
                                    newNode.Children.push(node2);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return null;
};

export default handleEnterKeyPress;