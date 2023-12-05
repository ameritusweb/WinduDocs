import { AstNode } from "../../components/wysiwyg/interface";

const deepCopyAstNode = (node: AstNode): AstNode => {
    
    const nodeCopy: AstNode = {
        NodeName: node.NodeName,
        Attributes: { ...node.Attributes }, 
        ChildIndex: node.ChildIndex,
        Guid: node.Guid,
        Depth: node.Depth,
        TextContent: node.TextContent,
        Children: [],
        Version: node.Version
    };

    
    node.Children.forEach(child => {
        nodeCopy.Children.push(deepCopyAstNode(child));
    });

    return nodeCopy;
}

export default deepCopyAstNode;