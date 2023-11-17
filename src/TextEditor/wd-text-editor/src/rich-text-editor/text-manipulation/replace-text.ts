import { AstNode } from "../../components/wysiwyg/interface";

const replaceText = (container: Node, child: AstNode, start: number, key: string) => {

    if (container.textContent)
    {
        const content = container.textContent === '\n' ? '' : container.textContent;
        child.TextContent = content.substring(0, start) + key + content.substring(start);
    }
    else
        child.TextContent = key;

}

export default replaceText;