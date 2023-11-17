import { createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createNewAstNodeFromFormat = (format: string, content: string): AstNode => {
    switch (format) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            {
                const level = format.substring(1);
                const newNode = createNewAstNode('HeadingBlock', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newNode.Children.push(newTextNode);
                newNode.Attributes.Level = level;
                return newNode;
            }
        case 'strong':
            {
                const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                const newStrongNode = createNewAstNode('Strong', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newStrongNode.Children.push(newTextNode);
                newNode.Children.push(newStrongNode);
                return newNode;
            }
            case 'emphasis':
                {
                    const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                    const newEmphasisNode = createNewAstNode('Emphasis', 0, 0, null);
                    const newTextNode = createNewAstNode('Text', 0, 0, content);
                    newEmphasisNode.Children.push(newTextNode);
                    newNode.Children.push(newEmphasisNode);
                    return newNode;
                }
        default:
            {
                const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newNode.Children.push(newTextNode);
                return newNode;
            }
    }
}

export default createNewAstNodeFromFormat;