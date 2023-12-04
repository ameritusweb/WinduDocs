import { createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createNodeWithTypeAndKey = (type: string, key: string) => {
    let newNode: AstNode = {} as AstNode;

    switch (type) {
        case 'Text':
            newNode = createNewAstNode('Text', 0, 0, key);
            break;
        case 'Strong':
            newNode = createNewAstNode('Strong', 0, 0, null);
            newNode.Children = key ? [createNodeWithTypeAndKey('Text', key)] : [];
            break;
        case 'Emphasis':
            newNode = createNewAstNode('Emphasis', 0, 0, null);
            newNode.Children = key ? [createNodeWithTypeAndKey('Text', key)] : [];
            break;
        case 'Strong + Emphasis':
            newNode = createNewAstNode('Strong', 0, 0, null);
            newNode.Children = [createNodeWithTypeAndKey('Emphasis', key)];
            break;
        
        default:
            
            break;
    }

    return newNode;
};

export default createNodeWithTypeAndKey;