import { AstNode } from "../components/wysiwyg/interface";

export const useMarkdownGenerator = () => {

    const convertTableToMarkdown = (tableNode: AstNode): string => {
        if (tableNode.NodeName !== 'Table') {
          return '';
        }
      
        let markdownTable = '';
        let headerRow = '';
        let dividerRow = '';
        let dataRows = '';
      
        // Assuming the first row is always the header
        const headerCells = tableNode.Children[0].Children;
        headerRow = headerCells.map(cell => cell.Children.map(convertToMarkdown).join('')).join(' | ');
        dividerRow = headerCells.map(() => '---').join(' | ');
      
        // Process data rows
        tableNode.Children.slice(1).forEach(row => {
          const rowData = row.Children.map(cell => cell.Children.map(convertToMarkdown).join('')).join(' | ');
          dataRows += `${rowData}\n`;
        });
      
        markdownTable = `| ${headerRow} |\n| ${dividerRow} |\n${dataRows}`;
      
        return markdownTable;
      }

      const convertToMarkdown = (node: AstNode): string => {
        switch (node.NodeName) {
          case 'MarkdownDocument':
            return node.Children.map(convertToMarkdown).join('\n');
          case 'ParagraphBlock':
            return node.Children.map(convertToMarkdown).join('');
          case 'Text':
            return node.TextContent || '';
          case 'Strong':
            const childContent = node.Children.map(convertToMarkdown).join('');
            if (childContent.startsWith('*') && childContent.endsWith('*')) {
                // This handles the case where the emphasis tag is inside the strong tag
                return `**_${childContent.substring(1, childContent.length - 1)}_**`;
            }
            return `**${childContent}**`;
        
          case 'Emphasis':
            const strongChildContent = node.Children.map(convertToMarkdown).join('');
            if (strongChildContent.startsWith('**') && strongChildContent.endsWith('**')) {
                // This handles the case where the strong tag is inside the emphasis tag
                return `**_${strongChildContent.substring(2, strongChildContent.length - 2)}_**`;
            }
            return `*${strongChildContent}*`;
          case 'CodeInline':
            return `\`${node.TextContent}\``;
          case 'HeadingBlock':
            const level = node.Attributes.Level ? parseInt(node.Attributes.Level) : 1;
            return `${'#'.repeat(level)} ${node.Children.map(convertToMarkdown).join('')}`;
          case 'ListBlock':
            const isOrdered = node.Attributes.IsOrdered === 'True';
            return node.Children.map((child: AstNode, index: number) => 
              `${isOrdered ? `${index + 1}.` : '-'} ${convertToMarkdown(child)}`
            ).join('\n');
          case 'ListItemBlock':
            return node.Children.map(convertToMarkdown).join('');
          case 'Link':
            return `[${node.TextContent || ''}](${node.Attributes.Url || ''})`;
          case 'Table':
            return convertTableToMarkdown(node);
          case 'FencedCodeBlock':
            const language = node.Attributes.Language || '';
            return `\`\`\`${language}
${node.TextContent}
\`\`\`\n`;
          case 'BlankLine':
            return '\n';
          case 'ThematicBreakBlock':
            return '---';
          case 'QuoteBlock':
            const quoteContent = node.Children.map(paragraphNode => {
                // Flatten the text content of the paragraph node
                const paragraphText = paragraphNode.Children.map(convertToMarkdown).join('');
        
                // Split the paragraph by newlines and prepend each line with '>'
                return paragraphText.split('\n').map(line => `> ${line}`).join('\n');
            }).join('\n');
        
            return `${quoteContent}`;
          default:
            return '';
        }
      }

      return {
        convertToMarkdown
      };
}