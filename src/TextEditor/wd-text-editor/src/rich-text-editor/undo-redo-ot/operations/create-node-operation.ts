import { AddNodeParams, AstNode, AstOperation, AstOperationType, RemoveNodeParams, UpdateNodeParams } from "../../../components/wysiwyg/interface";

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

const getParentId = (node: AstNode) => {

    if (node.NodeName === 'ParagraphBlock')
    {
        return `para_${node.Guid}`;
    }

    return node.Guid;

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
                targetNodeId: ((params as UpdateNodeParams).node || (params as UpdateNodeParams).parentNode).Guid,
                payload: { 
                    newVersion: (params as UpdateNodeParams).newVersion, 
                    newTextContent: (params as UpdateNodeParams).newTextContent,
                    offset: (params as UpdateNodeParams).offset
                },
                parentNodeId: !(params as UpdateNodeParams).node ? `para_${(params as UpdateNodeParams).parentNode.Guid}` : getParentId((params as UpdateNodeParams).parentNode),
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