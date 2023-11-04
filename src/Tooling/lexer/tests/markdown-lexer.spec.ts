import { MarkdownLexer } from '../src/markdown-lexer'
import { dslRules } from '../src/dsl-rules'

describe('MarkdownLexer', () => {
    it('should tokenize a header', () => {
      const input = '# Header 1';
      const lexer = new MarkdownLexer(input, dslRules);
      const tokens = lexer.tokenize();
      expect(tokens).toEqual([
        { type: 'HEADER', value: ' Header 1' },
      ]);
    });
  
    it('should tokenize bold text', () => {
      const input = 'This is **bold** text';
      const lexer = new MarkdownLexer(input, dslRules);
      const tokens = lexer.tokenize();
      expect(tokens).toEqual([
        { type: 'TEXT', value: 'This is ' },
        { type: 'BOLD', value: 'bold' },
        { type: 'TEXT', value: ' text' },
      ]);
    });
  
    it('should tokenize italic text', () => {
      const input = 'This is *italic* text';
      const lexer = new MarkdownLexer(input, dslRules);
      const tokens = lexer.tokenize();
      expect(tokens).toEqual([
        { type: 'TEXT', value: 'This is ' },
        { type: 'ITALIC', value: 'italic' },
        { type: 'TEXT', value: ' text' },
      ]);
    });

    it('should tokenize nested bold and italic text within bold text', () => {
        const input = '**This is ***bold and italic*** text**';
        const lexer = new MarkdownLexer(input, dslRules);
        const tokens = lexer.tokenize();
        expect(tokens).toEqual([
          { type: 'BOLD', value: 'This is ' },
          { type: 'BOLD_ITALIC', value: 'bold and italic' },
          { type: 'BOLD', value: ' text' },
        ]);
      });  
        // Test for links
        it('should tokenize a link', () => {
          const input = '[OpenAI](https://openai.com)';
          const lexer = new MarkdownLexer(input, dslRules);
          const tokens = lexer.tokenize();
          expect(tokens).toEqual([
            { type: 'LINKTEXT', value: 'OpenAI' },
            { type: 'URL', value: 'https://openai.com' },
          ]);
        });
      
        // Test for custom alerts
        it('should tokenize a custom alert', () => {
          const input = '!!! warning "Attention!" --strong --emphasis';
          const lexer = new MarkdownLexer(input, dslRules);
          const tokens = lexer.tokenize();
          expect(tokens).toEqual([
            { type: 'TYPE', value: 'warning' },
            { type: 'TITLE', value: 'Attention!' },
            { type: 'MODIFIERS', value: '--strong' },
            { type: 'MODIFIERS', value: '--emphasis' },
          ]);
        });
      
        // Test for a tabs group
        it('should tokenize a tabs group with two tabs', () => {
          const input = '=== tabs "Sample Tabs"\n=== tab "Tab 1"\nContent for tab 1\n=== tab "Tab 2"\nContent for tab 2\n===\n';
          const lexer = new MarkdownLexer(input, dslRules);
          const tokens = lexer.tokenize();
          expect(tokens).toEqual([
            { type: 'TABSGROUPTITLE', value: 'Sample Tabs' },
            { type: 'TABTITLE', value: 'Tab 1' },
            { type: 'TAB', value: 'Content for tab 1' },
            { type: 'TABTITLE', value: 'Tab 2' },
            { type: 'TAB', value: 'Content for tab 2' },
          ]);
        });

        it('should tokenize a table with headers and rows', () => {
            const input = `| Header 1 | Header 2 | Header 3 |
        |:--------:|:--------:|:--------:|
        | Data 1   | Data 2   | Data 3   |
        | Data 4   | Data 5   | Data 6   |`;
        
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();
        
            // Adjust the expected tokens based on your specific token structure
            expect(tokens).toEqual([
              expect.objectContaining({ type: 'HEADERROW', value: expect.any(String) }),
              expect.objectContaining({ type: 'ROW', value: expect.any(String) }),
              expect.objectContaining({ type: 'ROW', value: expect.any(String) }),
            ]);
          });
        
          it('should recognize the --striped modifier for tables', () => {
            const input = `| Header 1 | Header 2 | Header 3 | --striped
        |:--------:|:--------:|:--------:|
        | Data 1   | Data 2   | Data 3   |
        | Data 4   | Data 5   | Data 6   |`;
        
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();
        
            // Adjust the expected tokens based on your specific token structure
            expect(tokens).toEqual([
              expect.objectContaining({ type: 'STRIPEDMODIFIER', value: '--striped' }),
              expect.objectContaining({ type: 'HEADERROW', value: expect.any(String) }),
              expect.objectContaining({ type: 'ROW', value: expect.any(String) }),
              expect.objectContaining({ type: 'ROW', value: expect.any(String) }),
            ]);
          });
        
          it('should tokenize feather icons with color and size', () => {
            const input = '--feather-alert-circle-blue-500-1';
        
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();
        
            // Define the expected tokens without considering the order
            const expectedTokens = [
                expect.objectContaining({
                type: 'ICONLIBRARY',
                value: 'feather',
                }),
                expect.objectContaining({
                type: 'ICONNAME',
                value: 'alert-circle',
                }),
                expect.objectContaining({
                type: 'ICONCOLOR',
                value: 'blue-500',
                }),
                expect.objectContaining({
                type: 'ICONSIZE',
                value: '1',
                }),
            ];

            // The test will pass if all objects in expectedTokens are found in received, regardless of order
            expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
          });
        
          it('should tokenize hero icons with color and size', () => {
            const input = '--hero-academic-cap-green-600-2';
        
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();
        
            // Define the expected tokens without considering the order
            const expectedTokens = [
                expect.objectContaining({
                type: 'ICONLIBRARY',
                value: 'hero',
                }),
                expect.objectContaining({
                type: 'ICONNAME',
                value: 'academic-cap',
                }),
                expect.objectContaining({
                type: 'ICONCOLOR',
                value: 'green-600',
                }),
                expect.objectContaining({
                type: 'ICONSIZE',
                value: '2',
                }),
            ];

            // The test will pass if all objects in expectedTokens are found in received, regardless of order
            expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
          });
  });