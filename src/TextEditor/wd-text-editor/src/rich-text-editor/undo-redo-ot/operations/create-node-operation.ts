import { toId } from "..";
import { AstOperation, AstOperationType, InsertAfterNodeParams, InsertBeforeNodeParams, RemoveAfterNodeParams, RemoveBeforeNodeParams, ReplaceNodeParams, UpdateNodeParams } from "../../../components/wysiwyg/interface";

type OperationParamsMap = {
    'insertBefore': InsertBeforeNodeParams;
    'removeBefore': RemoveBeforeNodeParams;
    'insertAfter': InsertAfterNodeParams;
    'removeAfter': RemoveAfterNodeParams;
    'update': UpdateNodeParams;
    'replace': ReplaceNodeParams;
}

type OperationReturnMap = {
    'insertBefore': AstOperation<'insertBefore'>;
    'removeBefore': AstOperation<'removeBefore'>;
    'insertAfter': AstOperation<'insertAfter'>;
    'removeAfter': AstOperation<'removeAfter'>;
    'update': AstOperation<'update'>;
    'replace': AstOperation<'replace'>;
}

const createNodeOperation = <T extends AstOperationType>(type: T, params: OperationParamsMap[T]): OperationReturnMap[T] => {
    switch (type)
    {
        case 'insertBefore': {
            const insertBeforeParams = params as InsertBeforeNodeParams;
            const op: OperationReturnMap['insertBefore'] = {
                type: 'insertBefore',
                initialPosition: insertBeforeParams.initialPosition,
                finalPosition: insertBeforeParams.finalPosition,
                parentNodeId: null,
                targetNodeId: null,
                nodeIndex: null,
                payload: { 
                    siblingId: insertBeforeParams.siblingId,
                    newNode: insertBeforeParams.newNode
                },
                timestamp: Date.now()
            };
            return op as OperationReturnMap[T];
        }
        case 'insertAfter': {
            const insertAfterParams = params as InsertAfterNodeParams;
            const op: OperationReturnMap['insertAfter'] = {
                type: 'insertAfter',
                initialPosition: insertAfterParams.initialPosition,
                finalPosition: insertAfterParams.finalPosition,
                parentNodeId: null,
                targetNodeId: null,
                nodeIndex: null,
                payload: { 
                    siblingId: insertAfterParams.siblingId,
                    newNode: insertAfterParams.newNode
                },
                timestamp: Date.now()
            };
            return op as OperationReturnMap[T];
        }
        case 'removeBefore': {
            const removeBeforeParams = params as RemoveBeforeNodeParams;
            const op: OperationReturnMap['removeBefore'] = {
                type: 'removeBefore',
                initialPosition: removeBeforeParams.initialPosition,
                finalPosition: removeBeforeParams.finalPosition,
                parentNodeId: null,
                targetNodeId: null,
                nodeIndex: null,
                payload: { 
                    siblingId: removeBeforeParams.siblingId,
                    targetNode: removeBeforeParams.targetNode
                },
                timestamp: Date.now()
            };
            return op as OperationReturnMap[T];
        }
        case 'removeAfter': {
            const removeAfterParams = params as RemoveAfterNodeParams;
            const op: OperationReturnMap['removeAfter'] = {
                type: 'removeAfter',
                initialPosition: removeAfterParams.initialPosition,
                finalPosition: removeAfterParams.finalPosition,
                parentNodeId: null,
                targetNodeId: null,
                nodeIndex: null,
                payload: { 
                    siblingId: removeAfterParams.siblingId,
                    targetNode: removeAfterParams.targetNode
                },
                timestamp: Date.now()
            };
            return op as OperationReturnMap[T];
        }
        case 'replace': {
            const replaceParams = params as ReplaceNodeParams;
            const op: OperationReturnMap['replace'] = {
                type: 'replace',
                initialPosition: replaceParams.initialPosition,
                finalPosition: replaceParams.finalPosition,
                parentNodeId: null,
                targetNodeId: replaceParams.oldNode.Guid,
                nodeIndex: null,
                payload: { 
                    oldNode: replaceParams.oldNode,
                    newNode: replaceParams.newNode
                },
                timestamp: Date.now()
            };
            return op as OperationReturnMap[T];
        }
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
            } as OperationReturnMap[T]; 
        default:
            throw new Error('Invalid operation type');
    }
}

export default createNodeOperation;