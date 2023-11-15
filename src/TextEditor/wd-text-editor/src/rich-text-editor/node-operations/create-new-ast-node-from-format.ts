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