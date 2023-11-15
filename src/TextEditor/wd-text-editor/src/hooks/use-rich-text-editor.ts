import { AstNode } from "../components/wysiwyg/interface";
import EditorData, { EditorDataType } from "./editor-data";

export interface AstUpdate {
    nodes: AstNode[];
    type: string;
}

export const useRichTextEditor = () => {

    const editorData: EditorDataType = EditorData;

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

    const skipUntil = function* <T extends Node | Text>(array: T[], predicate: (item: T) => boolean): Generator<T, void, undefined> {
        let skip = true;
        for (const item of array) {
            if (skip && predicate(item)) {
                skip = false;
            }
            if (!skip) {
                yield item;
            }
        }
    };
    
    const takeUntil = function* <T extends Node | Text>(source: Generator<T, void, undefined>, predicate: (item: T) => boolean): Generator<T, void, undefined> {
        for (const item of source) {
            yield item;
            if (predicate(item)) {
                return;
            }
        }
    };
    
    const processArray = <T extends Node | Text>(array: T[], startPredicate: (item: T) => boolean, endPredicate: (item: T) => boolean): T[] => {
        const skipped = skipUntil(array, startPredicate);
        const taken = takeUntil(skipped, endPredicate);
        return Array.from(taken);
    };
    
    const reverse = function* <T>(array: T[]): Generator<T, void, undefined> {
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i];
        }
    };

    const updateAst = (event: React.KeyboardEvent<HTMLElement>, children: AstNode[]): AstUpdate => {

        const sel = window.getSelection();
        const key = event.key;
        if (sel) {
            const range = sel.getRangeAt(0);
            const container = range.startContainer;
            const endContainer = range.endContainer;
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            if (key === 'Backspace') {
                event.preventDefault();
                const commonAncestor = range.commonAncestorContainer;
                if (commonAncestor.nodeName !== '#text') {
                    const ancestorChildNodes = processArray(Array.from(commonAncestor.childNodes) as (Node | Text)[], (i) => i === container, (j) => j === endContainer);
                    if (ancestorChildNodes.length > 0) {
                        const reversed = reverse(ancestorChildNodes);
                        for (const node of reversed)
                        {
                            const parent = node.parentElement;
                            if (parent) {
                                const index = Array.from(parent.childNodes).findIndex((c) => c === node);
                                const child = children[index];
                                const isStartNode = node === container;
                                const isEndNode = node === endContainer;
                                if (!isStartNode && !isEndNode)
                                {
                                    children.splice(index, 1);
                                }
                                else
                                {
                                    let start = isStartNode ? startOffset : 0;
                                    let end = isEndNode ? endOffset : (node.textContent || '').length;
                                    removeText(node, child, start, end);
                                }
                            }
                        }
                        return { 
                            type: 'removeSelected', 
                            nodes: children.map((c, ind) => Object.assign({}, c)) 
                        };
                    }
                } else {
                    const parent = container.parentElement;
                    if (parent) {
                        const parentId = parent.id;
                        const childIndex = children.findIndex((c) => c.Guid === parentId);
                        let child = children[childIndex];
                        if (child) {
                            removeText(container, child, startOffset, endOffset);
                            return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                                return ind === childIndex ? Object.assign({}, c) : c
                            }) };
                        } else {
                            const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                            child = children[index];
                            if (child) {
                                removeText(container, child, startOffset, endOffset);
                                return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
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
                            replaceText(container, child, startOffset, event.key);
                            return { type: 'insert', nodes: children.map((c, ind) => {
                                return ind === childIndex ? Object.assign({}, c) : c
                            }) };
                        } else {
                            const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                            child = children[index];
                            if (child) {
                                replaceText(container, child, startOffset, event.key);
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
        editorData,
        updateAst
      };
}