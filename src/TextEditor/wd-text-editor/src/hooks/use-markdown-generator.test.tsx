import { renderHook, toMockAst } from "../utils/test-utils";
import { useMarkdownGenerator } from "./use-markdown-generator";

describe('useMarkdownGenerator', () => {  
    it('converts a text node to Markdown', () => {

        const { result } = renderHook(() => useMarkdownGenerator());

      const textNode = toMockAst({ NodeName: 'Text', TextContent: 'Hello world' });
      expect(result.current.convertToMarkdown(textNode, 0)).toBe('Hello world');
    });
  
    it('converts a strong text node to Markdown', () => {

        const { result } = renderHook(() => useMarkdownGenerator());

      const strongNode = toMockAst({
        NodeName: 'Strong',
        Children: [{ NodeName: 'Text', TextContent: 'Bold text' }]
      });
      expect(result.current.convertToMarkdown(strongNode, 0)).toBe('**Bold text**');
    });
  
    it('converts a heading block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const headingNode = toMockAst({
        NodeName: 'HeadingBlock',
        Attributes: { Level: '2' },
        Children: [{ NodeName: 'Text', TextContent: 'Heading' }]
        });
        expect(result.current.convertToMarkdown(headingNode, 0)).toBe('## Heading');
    });

    it('converts a link to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const linkNode = toMockAst({
        NodeName: 'Link',
        Attributes: { Url: 'https://example.com' },
        Children: [{ NodeName: 'Text', TextContent: 'Example' }]
        });
        expect(result.current.convertToMarkdown(linkNode, 0)).toBe('[Example](https://example.com)');
    });

    it('converts an emphasis text node to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const emphasisNode = toMockAst({
          NodeName: 'Emphasis',
          Children: [{ NodeName: 'Text', TextContent: 'Italic text' }]
        });
        expect(result.current.convertToMarkdown(emphasisNode, 0)).toBe('*Italic text*');
      });
    
      it('converts a fenced code block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const codeNode = toMockAst({
          NodeName: 'FencedCodeBlock',
          Attributes: { Language: 'javascript' },
          TextContent: 'const a = 10;'
        });
        const expectedMarkdown = `\`\`\`javascript\nconst a = 10;\n\`\`\``;
        expect(result.current.convertToMarkdown(codeNode, 0)).toBe(expectedMarkdown);
      });

      it('converts a table to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const tableNode = toMockAst({
            "NodeName": "Table",
            "Children": [
              {
                "NodeName": "TableRow",
                "Attributes": {
                  "IsHeader": "True"
                },
                "Children": [
                  {
                    "NodeName": "TableCell",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "TextContent": "Header 1"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "NodeName": "TableCell",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "TextContent": "Header 2",
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "NodeName": "TableRow",
                "Attributes": {
                  "IsHeader": "False"
                },
                "Children": [
                  {
                    "NodeName": "TableCell",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "TextContent": "Row 1 "
                          },
                          {
                            "NodeName": "Strong",
                            "Children": [
                              {
                                "NodeName": "Text",
                                "TextContent": "test",
                                "Children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "NodeName": "TableCell",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "TextContent": "Data 1 "
                          },
                          {
                            "NodeName": "Emphasis",
                            "Children": [
                              {
                                "NodeName": "Text",
                                "TextContent": "test",
                                "Children": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          });
        // Provide the expected Markdown for the table structure
        expect(result.current.convertToMarkdown(tableNode, 0)).toBe('| Header 1 | Header 2 |\n| --- | --- |\nRow 1 **test** | Data 1 *test* |');
      });
    
      it('converts a blank line to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const blankLineNode = toMockAst({ NodeName: 'BlankLine' });
        expect(result.current.convertToMarkdown(blankLineNode, 0)).toBe('');
      });

      it('converts a markdown document to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const document = toMockAst({
            "NodeName": "MarkdownDocument",
            "Children": [
              {
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "TextContent": "This is a paragraph with both ",
                      },
                      {
                        "NodeName": "Strong",
                        "Children": [
                          {
                            "NodeName": "Emphasis",
                            "Children": [
                              {
                                "NodeName": "Text",
                                "TextContent": "bold and italic"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "NodeName": "Text",
                        "TextContent": " text"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "TextContent": "This is another paragraph."
                  }
                ]
              }
            ]
        });
        expect(result.current.convertToMarkdown(document, 0)).toBe('**This is a paragraph with both **_bold and italic_** text**This is another paragraph.');
      })
    
      it('converts a thematic break block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const thematicBreakNode = toMockAst({ NodeName: 'ThematicBreakBlock' });
        expect(result.current.convertToMarkdown(thematicBreakNode, 0)).toBe('---');
      });
    
      it('converts a quote block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const quoteBlockNode = toMockAst({
            "NodeName": "QuoteBlock",
            "Children": [
              {
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "NodeName": "Text",
                    "TextContent": "This is a blockquote."
                  }
                ]
              },
              {
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "NodeName": "Text",
                    "TextContent": "It can span"
                  }
                ]
              }
            ]
          });
        // Provide the expected Markdown for the quote block structure
        expect(result.current.convertToMarkdown(quoteBlockNode, 0)).toBe('> This is a blockquote.\n> It can span');
      });

      it('converts nested strong in emphasis text to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const emphasisNode = toMockAst({
          NodeName: 'Emphasis',
          Children: [
            { NodeName: 'Strong', Children: [{ NodeName: 'Text', TextContent: 'Bold and Italic' }] }
          ]
        });
        expect(result.current.convertToMarkdown(emphasisNode, 0)).toBe('**_Bold and Italic_**');
      });
     
      it('converts inline code to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const codeNode = toMockAst({ NodeName: 'CodeInline', TextContent: 'const x = 10;' });
        expect(result.current.convertToMarkdown(codeNode, 0)).toBe('`const x = 10;`');
      });

      it('converts an ordered list block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const listNode = toMockAst({
          NodeName: 'ListBlock',
          Attributes: { IsOrdered: 'True' },
          Children: [{ NodeName: 'ListItemBlock', Children: [{ NodeName: 'Text', TextContent: 'Item 1' }] }]
        });
        expect(result.current.convertToMarkdown(listNode, 0)).toBe('1. Item 1');
      });
      
      it('converts an unordered list block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const listNode = toMockAst({
          NodeName: 'ListBlock',
          Attributes: { IsOrdered: 'False' },
          Children: [{ NodeName: 'ListItemBlock', Children: [{ NodeName: 'Text', TextContent: 'Item 1' }] }]
        });
        expect(result.current.convertToMarkdown(listNode, 0)).toBe('- Item 1');
      });
      
      it('converts a list item block to Markdown', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const listItemNode = toMockAst({
          NodeName: 'ListItemBlock',
          Children: [{ NodeName: 'Text', TextContent: 'List item content' }]
        });
        expect(result.current.convertToMarkdown(listItemNode, 0)).toBe('List item content');
      });

      it('ignores non-registered nodes', () => {
        const { result } = renderHook(() => useMarkdownGenerator());
        const listItemNode = toMockAst({
          NodeName: 'FakeNode',
        });
        expect(result.current.convertToMarkdown(listItemNode, 0)).toBe('');
      });
  });