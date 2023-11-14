import { AstNode } from "../components/wysiwyg/interface";

export interface AstUpdate {
    nodes: AstNode[];
    type: string;
}

export const useRichTextEditor = () => {

    const replaceText = (container: Node, child: AstNode, start: number, key: string) => {

        if (container.textContent)
            child.TextContent = container.textContent.substring(0, start) + key + container.textContent.substring(start);
        else
            child.TextContent = container.textContent + key;

    }

    const removeText = (container: Node, child: AstNode, start: number, end: number) => {
        const diff = end - start;
        if (container.textContent) {
            const subStart = diff > 0 ? start : start - 1;
            const newText = container.textContent.substring(0, subStart) + container.textContent.substring(start + diff);
            child.TextContent = newText;
        }
    }

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[]): AstUpdate => {

        const sel = window.getSelection();
        const key = event.key;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const start = range.startOffset;
            const end = range.endOffset;
            if (key === 'Backspace') {
                event.preventDefault();
                if (container.nodeName === '#text')
                {
                    const parent = container.parentElement;
                    if (parent) {
                        const parentId = parent.id;
                        const childIndex = children.findIndex((c) => c.Guid === parentId);
                        let child = children[childIndex];
                        if (child) {
                            removeText(container, child, start, end);
                            return { type: end > start ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                                return ind === childIndex ? Object.assign({}, c) : c
                            }) };
                        } else {
                            const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                            child = children[index];
                            if (child) {
                                removeText(container, child, start, end);
                                return { type: end > start ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                                    return ind === index ? Object.assign({}, c) : c
                                }) };
                            }
                        }
                    }
                }
            }
            else if (key.length === 1) {
                event.preventDefault();
                if (container.nodeName === '#text')
                {
                    const parent = container.parentElement;
                    if (parent) {
                        const parentId = parent.id;
                        const childIndex = children.findIndex((c) => c.Guid === parentId);
                        let child = children[childIndex];
                        if (child) {
                            replaceText(container, child, start, event.key);
                            return { type: 'insert', nodes: children.map((c, ind) => {
                                return ind === childIndex ? Object.assign({}, c) : c
                            }) };
                        } else {
                            const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                            child = children[index];
                            if (child) {
                                replaceText(container, child, start, event.key);
                                return { type: 'insert', nodes: children.map((c, ind) => {
                                    return ind === index ? Object.assign({}, c) : c
                                }) };
                            }
                        }
                    }
                }
            }
        }

        return {type: 'none', nodes: children };

    }

    return {
        updateAst
      };
}