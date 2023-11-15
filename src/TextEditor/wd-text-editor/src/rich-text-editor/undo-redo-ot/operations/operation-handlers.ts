import { findNodeById, findParentNode } from "..";
import { AstNode, AstOperation } from "../../../components/wysiwyg/interface";

export const applyAddOperation = (ast: AstNode, operation: AstOperation<'add'>): AstNode => {
    // Assuming `ast` is the root node and we have a method to find a node by ID
    const parentNode = findNodeById(ast, operation.targetNodeId);
    if (parentNode) {
        parentNode.Children.push(operation.payload!.newNode);
    }
    return ast; // Return the modified AST
}

export const applyRemoveOperation = (ast: AstNode, operation: AstOperation): AstNode => {
    // Remove the node with the given ID from its parent's children
    const parentNode = findParentNode(ast, operation.targetNodeId);
    if (parentNode) {
        parentNode.Children = parentNode.Children.filter(child => child.Guid !== operation.targetNodeId);
    }
    return ast;
}

export const applyUpdateOperation = (ast: AstNode, operation: AstOperation<'update'>): AstNode => {
    // Update the node with the new attributes
    const node = findNodeById(ast, operation.targetNodeId);
    if (node) {
        Object.assign(node.Attributes, operation.payload!.newAttributes);
    }
    return ast;
}

export const applyOperation = (ast: AstNode, operation: AstOperation): AstNode => {
    switch (operation.type) {
        case 'add':
            return applyAddOperation(ast, operation as AstOperation<'add'>);
        case 'remove':
            return applyRemoveOperation(ast, operation);
        case 'update':
            return applyUpdateOperation(ast, operation as AstOperation<'update'>);
        default:
            throw new Error('Unsupported operation type');
    }
}
