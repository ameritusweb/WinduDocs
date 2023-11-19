import { AstNode, ITextBlock } from "../../components/wysiwyg/interface";

class TextBlock implements ITextBlock {
    guid: string;
    index: number;
    textContent: string;

    constructor(guid: string, index: number, textContent: string) {
        this.guid = guid;
        this.index = index;
        this.textContent = textContent;
    }
}

const processTextContent = (textContent: string, parentId: string, index: number): ITextBlock[] => {
    return textContent.split('\n')
        .filter(part => part.trim() !== '')
        .map((part) => {
            return new TextBlock(parentId, index, part);
        });
};


const processAst = async (markdownAst: AstNode): Promise<[TextBlock[][], Map<string, number[]>]> => {
    const lines: TextBlock[][] = [];
    let currentLine: TextBlock[] = [];
    const guidMap = new Map<string, number[]>();

    async function processNode(node: AstNode, index: number, parentId: string): Promise<void> {
        if (!node) return;

        switch (node.NodeName) {
            case "CodeInline":
            case "Text":
                if (node.TextContent) {
                    if (node.TextContent.includes("\n")) {
                        if (currentLine.length > 0) {
                            lines.push(currentLine);
                            currentLine = [];
                        }
                        // If the text content includes newlines, process each line separately.
                        const textBlocks = processTextContent(node.TextContent, parentId, index);
                        let pushedLine: boolean = false;
                        textBlocks.forEach((block, i) => {
                            currentLine.push(block);
                            if (!pushedLine)
                                guidMap.set(`${block.guid} ${index}`, [lines.length, currentLine.length - 1]);
                            lines.push(currentLine);
                            pushedLine = true;
                            currentLine = [];
                        });
                    } else {
                        // If there are no newlines, handle the text content directly.
                        const block = new TextBlock(parentId, index, node.TextContent);
                        currentLine.push(block);
                        guidMap.set(`${block.guid} ${index}`, [lines.length, currentLine.length - 1]);
                    }
                }
                break;
            case "BlankLine":
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                currentLine.push(new TextBlock(node.Guid, 0, ""));
                guidMap.set(`${node.Guid} 0`, [lines.length, currentLine.length - 1]);
                lines.push(currentLine);
                currentLine = [];
                break;
            case "HeadingBlock":
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                for (const [childIndex, child] of node.Children.entries()) {
                    await processNode(child, childIndex, node.Guid);
                }
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                break;
            case "ListBlock":
                await processList(node);
                break;
            case "Table":
                await processTable(node);
                break;
            case "FencedCodeBlock":
                await processFencedCodeBlock(node);
                break;
            case "ParagraphBlock":
                for (const [childIndex, child] of node.Children.entries()) {
                    await processNode(child, childIndex, 'para_' + node.Guid);
                }
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                break;
            default:
                for (const [childIndex, child] of node.Children.entries()) {
                    await processNode(child, childIndex, node.Guid);
                }
                break;
        }
    }

    async function processList(listNode: AstNode): Promise<void> {
        for (const listItem of listNode.Children) {
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }

            for (const [childIndex, child] of listItem.Children.entries()) {
                await processNode(child, childIndex, listItem.Guid);
            }

            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    async function processTable(tableNode: AstNode): Promise<void> {
        for (const row of tableNode.Children) {
            for (const cell of row.Children) {
                for (const [paragraphIndex, paragraph] of cell.Children.entries()) {
                    await processNode(paragraph, paragraphIndex, cell.Guid);
                }
            }

            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    async function processFencedCodeBlock(codeBlockNode: AstNode): Promise<void> {
        for (const [lineIndex, line] of codeBlockNode.Children.entries()) {
            currentLine.push(new TextBlock(codeBlockNode.Guid, lineIndex, line.TextContent || '\n'));
            guidMap.set(`${codeBlockNode.Guid} ${lineIndex}`, [lines.length, currentLine.length - 1]);
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    await processNode(markdownAst, -1, '');

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return [lines, guidMap];
}

export default processAst;