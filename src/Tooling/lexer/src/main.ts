import { dslRules } from "./dsl-rules";
import { MarkdownLexer } from "./markdown-lexer";

console.log("Hello, TypeScript with Nodemon!!");
const input = `=== card
=== header
This is my card header.
=== body
This is my card body.
===`;
                const lexer = new MarkdownLexer(input, dslRules); // Assuming the dslRules include the card definition with nested header and body
                const tokens = lexer.tokenize();
const aa = tokens;