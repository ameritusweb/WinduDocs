import { toId } from "..";
import { AddNodeParams, AstNode, AstOperation, AstOperationType, RemoveNodeParams, ReplaceNodeParams, UpdateNodeParams } from "../../../components/wysiwyg/interface";

type OperationParamsMap = {
    'add': AddNodeParams;
    'remove': RemoveNodeParams;
    'update': UpdateNodeParams;
    'replace': ReplaceNodeParams;
}

type OperationReturnMap = {
    'add': AstOperation<'add'>;
    'remove': AstOperation<'remove'>;
    'update': AstOperation<'update'>;
    'replace': AstOperation<'replace'>;
}

const createNodeOperation = <T extends AstOperationType>(type: T, params: OperationParamsMap[T]): OperationReturnMap[T] => {
    switch (type)
    {
        case 'add':
            return {
                type: 'add',
                targetNodeId: !(params as AddNodeParams).parentNode ? null : toId((params as AddNodeParams).parentNode!),
                parentNodeId: toId((params as ReplaceNodeParams).cursorTargetParent),
                nodeIndex: (params as AddNodeParams).nodeIndex,
                payload: { 
                    newNode: (params as AddNodeParams).newNode,
                    previousSiblingId: toId((params as AddNodeParams).previousSibling),
                    offset: (params as AddNodeParams).offset,
                    startOffset: (params as AddNodeParams).startOffset
                },
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        case 'replace':
            return {
                type: 'replace',
                targetNodeId: !(params as ReplaceNodeParams).parentNode ? null : toId((params as ReplaceNodeParams).parentNode!),
                parentNodeId: toId((params as ReplaceNodeParams).cursorTargetParent),
                nodeIndex: (params as ReplaceNodeParams).nodeIndex,
                payload: { 
                    newNode: (params as ReplaceNodeParams).newNode,
                    oldNode: (params as ReplaceNodeParams).oldNode,
                    offset: (params as ReplaceNodeParams).offset
                },
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        case 'remove':
            return {
                type: 'remove',
                targetNodeId: (params as RemoveNodeParams).targetNode.Guid,
                parentNodeId: toId((params as ReplaceNodeParams).cursorTargetParent),
                payload: {
                    targetNode: (params as RemoveNodeParams).targetNode, 
                },
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        case 'update':
            return {
                type: 'update',
                targetNodeId: ((params as UpdateNodeParams).node || (params as UpdateNodeParams).parentNode).Guid,
                payload: { 
                    newVersion: (params as UpdateNodeParams).newVersion, 
                    newTextContent: (params as UpdateNodeParams).newTextContent,
                    offset: (params as UpdateNodeParams).offset
                },
                parentNodeId: !(params as UpdateNodeParams).node ? `para_${(params as UpdateNodeParams).parentNode.Guid}` : toId((params as UpdateNodeParams).parentNode),
                nodeIndex: !(params as UpdateNodeParams).node ? 0 : (params as UpdateNodeParams).parentNode.Children.findIndex(c => c.Guid === (params as UpdateNodeParams).node!.Guid),
                oldState: (params as UpdateNodeParams).oldTextContent,
                oldVersion: (params as UpdateNodeParams).oldVersion,
                oldOffset: (params as UpdateNodeParams).oldOffset,
                rootChildId: (params as UpdateNodeParams).rootChildId,
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        default:
            throw new Error('Invalid operation type');
    }
}

export default createNodeOperation;