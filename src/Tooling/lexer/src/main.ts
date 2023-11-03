import { dslRules } from "./dsl-rules";
import { MarkdownLexer } from "./markdown-lexer";

console.log("Hello, TypeScript with Nodemon!!");
const input = '**This is ***bold and italic*** text**';
        const lexer = new MarkdownLexer(input, dslRules);
        const tokens = lexer.tokenize();
const aa = tokens;