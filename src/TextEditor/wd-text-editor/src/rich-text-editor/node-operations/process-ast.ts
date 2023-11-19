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

const processAst = async (markdownAst: AstNode): Promise<TextBlock[][]> => {
    const lines: TextBlock[][] = [];
    let currentLine: TextBlock[] = [];

    async function processNode(node: AstNode, index: number, parentId: string): Promise<void> {
        if (!node) return;

        switch (node.NodeName) {
            case "CodeInline":
            case "Text":
                if (node.TextContent?.includes("\n")) {
                    const parts = node.TextContent.split('\n');
                    for (const part of parts) {
                        if (part.trim() !== '') {
                            currentLine.push(new TextBlock(parentId, index, part));
                        }

                        if (currentLine.length > 0) {
                            lines.push(currentLine);
                            currentLine = [];
                        }
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }
                } else if (node.TextContent) {
                    currentLine.push(new TextBlock(parentId, index, node.TextContent));
                }
                break;
            case "BlankLine":
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                currentLine.push(new TextBlock(node.Guid, 0, ""));
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

    return lines;
}

export default processAst;