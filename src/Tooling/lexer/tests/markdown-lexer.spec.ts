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
    // Add more tests for other markdown features...
  });