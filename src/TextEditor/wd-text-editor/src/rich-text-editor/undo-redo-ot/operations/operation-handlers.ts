import { findNodeById, findParentNode, findParentNodeAndSpliceIndex } from "..";
import { AstNode, AstOperation } from "../../../components/wysiwyg/interface";

export const applyInsertBeforeOperation = (ast: AstNode, operation: AstOperation<'insertBefore'>): AstNode => {
    
    if (operation.payload.siblingId && operation.payload.newNode) {
        const [ parentNode, spliceIndex ] = findParentNodeAndSpliceIndex(ast, operation.payload.siblingId, true);
        if (parentNode) {
            parentNode.Children.splice(spliceIndex, 0, operation.payload.newNode);
        }
    }
    return ast; 
}

export const applyInsertAfterOperation = (ast: AstNode, operation: AstOperation<'insertAfter'>): AstNode => {
    
    if (operation.payload.siblingId && operation.payload.newNode) {
        const [ parentNode, spliceIndex ] = findParentNodeAndSpliceIndex(ast, operation.payload.siblingId, false);
        if (parentNode) {
            parentNode.Children.splice(spliceIndex, 0, operation.payload.newNode);
        }
    }
    return ast; 
}

export const applyRemoveBeforeOperation = (ast: AstNode, operation: AstOperation<'removeBefore'>): AstNode => {
    
    if (operation.payload.siblingId) {
        const [ parentNode, spliceIndex ] = findParentNodeAndSpliceIndex(ast, operation.payload.siblingId, true);
        if (parentNode) {
            parentNode.Children.splice(spliceIndex - 1, 1);
        }
    }
    return ast; 
}

export const applyRemoveAfterOperation = (ast: AstNode, operation: AstOperation<'removeAfter'>): AstNode => {
    
    if (operation.payload.siblingId) {
        const [ parentNode, spliceIndex ] = findParentNodeAndSpliceIndex(ast, operation.payload.siblingId, false);
        if (parentNode) {
            parentNode.Children.splice(spliceIndex, 1);
        }
    }
    return ast; 
}

export const applyReplaceOperation = (ast: AstNode, operation: AstOperation<'replace'>): AstNode => {
    
    if (operation.targetNodeId) {
        const parentNode = findParentNode(ast, operation.targetNodeId);
        if (parentNode) {
            parentNode.Children = parentNode.Children.map(child => child.Guid === operation.targetNodeId ? operation.payload!.newNode : child);
        }
    }
    return ast;
}

export const applyUpdateOperation = (ast: AstNode, operation: AstOperation<'update'>): AstNode => {
    
    if (operation.targetNodeId) {
        const node = findNodeById(ast, operation.targetNodeId);
        if (node) {
            node.Version = operation.payload!.newVersion;
            node.TextContent = '' + operation.payload!.newTextContent;
        }
    }
    return ast;
}

export const applyOperation = (ast: AstNode, operation: AstOperation): AstNode => {
    switch (operation.type) {
        case 'insertBefore':
            return applyInsertBeforeOperation(ast, operation as AstOperation<'insertBefore'>);
        case 'removeBefore':
            return applyRemoveBeforeOperation(ast, operation as AstOperation<'removeBefore'>);
        case 'insertAfter':
            return applyInsertAfterOperation(ast, operation as AstOperation<'insertAfter'>);
        case 'removeAfter':
            return applyRemoveAfterOperation(ast, operation as AstOperation<'removeAfter'>);
        case 'update':
            return applyUpdateOperation(ast, operation as AstOperation<'update'>);
        case 'replace':
            return applyReplaceOperation(ast, operation as AstOperation<'replace'>);
        default:
            throw new Error('Unsupported operation type');
    }
}
