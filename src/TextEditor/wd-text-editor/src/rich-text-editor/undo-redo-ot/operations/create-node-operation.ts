import { AddNodeParams, AstOperation, AstOperationType, RemoveNodeParams, UpdateNodeParams } from "../../../components/wysiwyg/interface";

type OperationParamsMap = {
    'add': AddNodeParams;
    'remove': RemoveNodeParams;
    'update': UpdateNodeParams;
}

type OperationReturnMap = {
    'add': AstOperation<'add'>;
    'remove': AstOperation<'remove'>;
    'update': AstOperation<'update'>;
}

const createNodeOperation = <T extends AstOperationType>(type: T, params: OperationParamsMap[T]): OperationReturnMap[T] => {
    switch (type)
    {
        case 'add':
            return {
                type: 'add',
                targetNodeId: (params as AddNodeParams).parentNodeId,
                payload: { newNode: (params as AddNodeParams).newNode },
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        case 'remove':
            return {
                type: 'remove',
                targetNodeId: (params as RemoveNodeParams).nodeId,
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        case 'update':
            return {
                type: 'update',
                targetNodeId: (params as UpdateNodeParams).nodeId,
                payload: { newTextContent: (params as UpdateNodeParams).newTextContent },
                oldState: (params as UpdateNodeParams).oldTextContent,
                timestamp: Date.now()
            } as OperationReturnMap[T]; // Type assertion here
        default:
            throw new Error('Invalid operation type');
    }
}

export default createNodeOperation;