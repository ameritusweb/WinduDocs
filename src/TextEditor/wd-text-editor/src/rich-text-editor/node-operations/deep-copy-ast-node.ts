import { AstNode } from "../../components/wysiwyg/interface";

const deepCopyAstNode = (node: AstNode): AstNode => {
    // Copying primitive properties
    let nodeCopy: AstNode = {
        NodeName: node.NodeName,
        Attributes: { ...node.Attributes }, // Shallow copy of Attributes object
        ChildIndex: node.ChildIndex,
        Guid: node.Guid,
        Depth: node.Depth,
        TextContent: node.TextContent,
        Children: [],
        Version: node.Version
    };

    // Recursively copying children
    node.Children.forEach(child => {
        nodeCopy.Children.push(deepCopyAstNode(child));
    });

    return nodeCopy;
}

export default deepCopyAstNode;