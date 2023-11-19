import { AstNode, ITextBlock } from "../../components/wysiwyg/interface";

class TextBlock implements ITextBlock {
    guid: string;
    textContent: string;

    constructor(guid: string, textContent: string) {
        this.guid = guid;
        this.textContent = textContent;
    }
}

const processAst = (markdownAst: AstNode): TextBlock[][] => {
    const lines: TextBlock[][] = [];
    let currentLine: TextBlock[] = [];

    function processNode(node: AstNode): void {
        if (!node) return;

        switch (node.NodeName) {
            case "CodeInline":
            case "Text":
                if (node.TextContent?.includes("\n")) {
                    const parts = node.TextContent.split('\n');
                    for (const part of parts) {
                        if (part.trim() !== '') {
                            currentLine.push(new TextBlock(node.Guid, part));
                        }

                        if (currentLine.length > 0)
                            lines.push(currentLine);
                        currentLine = [];
                    }
                } else if (node.TextContent) {
                    currentLine.push(new TextBlock(node.Guid, node.TextContent));
                }
            break;
            case "BlankLine":
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                currentLine.push(new TextBlock(node.Guid, ""));
                lines.push(currentLine);
                currentLine = [];
                break;
            case "HeadingBlock":
                if (currentLine.length > 0)
                {
                    lines.push(currentLine);
                    currentLine = [];
                }
                node.Children.forEach(child => processNode(child));
                lines.push(currentLine);
                currentLine = [];
                break;
            case "ParagraphBlock":
                node.Children.forEach(child => processNode(child));
                break;
            case "ListBlock":
                processList(node);
                break;
            case "Table":
                processTable(node);
                break;
            case "FencedCodeBlock":
                processFencedCodeBlock(node);
                break;
            default:
                node.Children.forEach(child => processNode(child));
                break;
        }
    }

    function processList(listNode: AstNode): void {
        listNode.Children.forEach((listItem: AstNode) => {
            // Check if there's any content in the current line before processing the list item
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }

            listItem.Children.forEach((child: AstNode) => processNode(child));

            // Add the current line to lines after processing each list item
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
        });
    }

    function processTable(tableNode: AstNode): void {
        tableNode.Children.forEach((row: AstNode) => {
            row.Children.forEach((cell: AstNode) => {
                cell.Children.forEach((paragraph: AstNode) => {
                    // Process each paragraph in the cell but keep them on the same line
                    processNode(paragraph);
                });
            });

            // Once all cells in a row are processed, start a new line
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
        });
    }

    function processFencedCodeBlock(codeBlockNode: AstNode): void {
        codeBlockNode.Children.forEach((line: AstNode) => {
            currentLine.push(new TextBlock(line.Guid, line.TextContent || '\n'));
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
        });
    }

    processNode(markdownAst);

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines;
}

export default processAst;