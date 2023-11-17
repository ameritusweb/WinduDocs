import { createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createNewAstNodeFromFormat = (format: string, content: string): AstNode => {

    if (Array.isArray(format)) {
        const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
        const newStrongNode = createNewAstNode('Strong', 0, 0, null);
        const newEmphasisNode = createNewAstNode('Emphasis', 0, 0, null);
        const newTextNode = createNewAstNode('Text', 0, 0, content);
        newEmphasisNode.Children.push(newTextNode);
        newStrongNode.Children.push(newEmphasisNode);
        newNode.Children.push(newStrongNode);
        newNode.Version = 'New';
        return newNode;
    }

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
                newNode.Version = 'New';
                return newNode;
            }
        case 'strong':
            {
                const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                const newStrongNode = createNewAstNode('Strong', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newStrongNode.Children.push(newTextNode);
                newNode.Children.push(newStrongNode);
                newNode.Version = 'New';
                return newNode;
            }
        case 'em':
            {
                const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                const newEmphasisNode = createNewAstNode('Emphasis', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newEmphasisNode.Children.push(newTextNode);
                newNode.Children.push(newEmphasisNode);
                newNode.Version = 'New';
                return newNode;
            }
        default:
            {
                const newNode = createNewAstNode('ParagraphBlock', 0, 0, null);
                const newTextNode = createNewAstNode('Text', 0, 0, content);
                newNode.Children.push(newTextNode);
                newNode.Version = 'New';
                return newNode;
            }
    }
}

export default createNewAstNodeFromFormat;