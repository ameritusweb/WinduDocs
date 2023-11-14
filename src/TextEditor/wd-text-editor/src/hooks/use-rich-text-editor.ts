import { AstNode } from "../components/wysiwyg/interface";

export const useRichTextEditor = () => {

    const replaceText = (container: Node, child: AstNode, start: number, key: string) => {

        if (container.textContent)
            child.TextContent = container.textContent.substring(0, start) + key + container.textContent.substring(start);
        else
            child.TextContent = container.textContent + key;

    }

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[]): AstNode[] => {

        const sel = window.getSelection();
        const key = event.key;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const start = range.startOffset;
            if (key.length === 1) {
                if (container.nodeName === '#text')
                {
                    const parent = container.parentElement;
                    if (parent) {
                        const parentId = parent.id;
                        let child = children.find((c) => c.Guid === parentId);
                        if (child) {
                            replaceText(container, child, start, event.key);
                            return children;
                        } else {
                            const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                            child = children[index];
                            if (child) {
                                replaceText(container, child, start, event.key);
                                return children;
                            }
                        }
                    }
                }
            }
        }

        return [];

    }

    return {
        updateAst
      };
}