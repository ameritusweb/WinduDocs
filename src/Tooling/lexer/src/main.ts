import { dslRules } from "./dsl-rules";
import { MarkdownLexer } from "./markdown-lexer";

console.log("Hello, TypeScript with Nodemon!!");
const input = `| Header 1 | Header 2 | Header 3 | --striped
        |:--------:|:--------:|:--------:|
        | Data 1   | Data 2   | Data 3   |
        | Data 4   | Data 5   | Data 6   |`;
        
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();
const aa = tokens;