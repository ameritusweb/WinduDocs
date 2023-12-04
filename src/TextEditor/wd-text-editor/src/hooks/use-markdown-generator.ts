import { AstNode } from "../components/wysiwyg/interface";

export const useMarkdownGenerator = () => {

    const convertTableToMarkdown = (tableNode: AstNode, depth: number): string => {
        let markdownTable = '';
        let headerRow = '';
        let dividerRow = '';
        let dataRows: string[] = [];
      
        
        const headerCells = tableNode.Children[0].Children;
        headerRow = headerCells.map(cell => cell.Children.map(child => convertToMarkdown(child, depth)).join('')).join(' | ');
        dividerRow = headerCells.map(() => '---').join(' | ');
      
        
      
        tableNode.Children.slice(1).forEach(row => {
          const rowData = row.Children.map(cell => cell.Children.map(child => convertToMarkdown(child, depth)).join('')).join(' | ');
          dataRows.push(`${rowData} |`);
        });
      
        markdownTable = `| ${headerRow} |\n| ${dividerRow} |\n${dataRows.join('\n')}`;
      
        return markdownTable;
      }

      const convertToMarkdown = (node: AstNode, depth: number): string => {
        switch (node.NodeName) {
          case 'MarkdownDocument':
            return node.Children.map(child => convertToMarkdown(child, depth)).join('\n');
          case 'ParagraphBlock':
            return node.Children.map(child => convertToMarkdown(child, depth)).join('');
          case 'Text':
            return node.TextContent || '';
          case 'Strong':
            const childContent = node.Children.map(child => convertToMarkdown(child, depth)).join('');
            if (childContent.startsWith('*') && childContent.endsWith('*')) {
                
                return `**_${childContent.substring(1, childContent.length - 1)}_**`;
            }
            return `**${childContent}**`;
        
          case 'Emphasis':
            const strongChildContent = node.Children.map(child => convertToMarkdown(child, depth)).join('');
            if (strongChildContent.startsWith('**') && strongChildContent.endsWith('**')) {
                
                return `**_${strongChildContent.substring(2, strongChildContent.length - 2)}_**`;
            }
            return `*${strongChildContent}*`;
          case 'CodeInline':
            return `\`${node.TextContent}\``;
          case 'HeadingBlock':
            const level = node.Attributes.Level ? parseInt(node.Attributes.Level) : 1;
            return `${'#'.repeat(level)} ${node.Children.map(child => convertToMarkdown(child, depth)).join('')}`;
            case 'ListBlock':
              const isOrdered = node.Attributes.IsOrdered === 'True';
              return node.Children.map((child: AstNode, index: number) => 
                `${'   '.repeat(depth)}${isOrdered ? `${index + 1}.` : '-'} ${convertToMarkdown(child, depth + 1)}`
              ).join('\n');
            case 'ListItemBlock':
              return node.Children.map(child => convertToMarkdown(child, depth)).join('\n');
          case 'Link':
            return `[${node.Children.map(child => convertToMarkdown(child, depth)).join('')}](${node.Attributes.Url || ''})`;
          case 'Table':
            return convertTableToMarkdown(node, depth);
          case 'FencedCodeBlock':
            const language = node.Attributes.Language || '';
            return `\`\`\`${language}
${node.TextContent}
\`\`\``;
          case 'BlankLine':
            return '';
          case 'ThematicBreakBlock':
            return '---';
          case 'QuoteBlock':
            const quoteContent = node.Children.map(paragraphNode => {
                
                const paragraphText = paragraphNode.Children.map(child => convertToMarkdown(child, depth)).join('');
        
                
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