import { AddNodeParams, AstOperation, AstOperationType, RemoveNodeParams, UpdateNodeParams } from "../../../components/wysiwyg/interface";

const createNodeOperation = (type: AstOperationType, params: AddNodeParams | UpdateNodeParams | RemoveNodeParams): AstOperation => {
    switch (type)
    {
        case 'add':
            return {
                type: 'add',
                targetNodeId: (params as AddNodeParams).parentNodeId,
                payload: { newNode: (params as AddNodeParams).newNode },
                timestamp: Date.now()
            };
        case 'remove':
            return {
                type: 'remove',
                targetNodeId: (params as RemoveNodeParams).nodeId,
                timestamp: Date.now()
            };
        case 'update':
            return {
                type: 'update',
                targetNodeId: (params as UpdateNodeParams).nodeId,
                payload: { newAttributes: (params as UpdateNodeParams).newAttributes },
                oldState: (params as UpdateNodeParams).oldAttributes, // Storing the old attributes
                timestamp: Date.now()
            };
        default:
            throw new Error('Invalid operation type');
    }
}

export default createNodeOperation;