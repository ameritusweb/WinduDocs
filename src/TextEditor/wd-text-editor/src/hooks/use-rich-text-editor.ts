import { AstNode } from "../components/wysiwyg/interface";

export const useRichTextEditor = (children: AstNode[]) => {

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, ref: HTMLElement) => {

        const sel = window.getSelection();
        const key = event.key;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const start = range.startOffset;
            const childNodes = Array.from(ref.childNodes) as (Node | Text)[];
            if (key.length === 1) {
                if (container.nodeName === '#text')
                {
                    const index = childNodes.findIndex((e) => e === container);
                    const astNode = children[index];
                    if (container.textContent)
                        astNode.TextContent = container.textContent.substring(0, start) + event.key + container.textContent.substring(start);
                    else
                        astNode.TextContent = container.textContent + key;
                }
            }
        }

    }

    return {
        updateAst
      };
}