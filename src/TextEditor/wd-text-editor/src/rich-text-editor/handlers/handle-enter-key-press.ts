import { AstNode } from "../../components/wysiwyg/interface";
import { moveArray } from "../array-processing";
import { createNewAstNode, findHigherlevelIndex, splitNode } from "../node-operations";

const handleEnterKeyPress = (container: Node, children: AstNode[], higherLevelChildren: AstNode[], range: Range, startOffset: number, higherLevelId?: string) => {
    const commonAncestor = range.commonAncestorContainer;
    if (commonAncestor.nodeName !== '#text') {

    } 
    else
    {
        const parent = container.parentElement;
        if (parent) {
            if (startOffset === 0)
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const child = children[childIndex];
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                moveArray(children, childIndex, newPara.Children, 0);
                                const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank, newPara);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        }
                    }
                }
            } 
            else if (startOffset === container.textContent?.length)
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const child = children[childIndex];
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                            else if (higherLevelId) {
                                const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                if (higherLevelIndex) {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const child = children[childIndex];
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                const [node1, node2] = splitNode(child, startOffset);
                                children.splice(childIndex, 1, node1, node2);
                                const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                moveArray(children, childIndex + 1, newPara.Children, 0);
                                higherLevelChildren.splice(higherLevelIndex + 1, 0, newPara);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        }
                    }
                }
            }
        }
    }
};

export default handleEnterKeyPress;