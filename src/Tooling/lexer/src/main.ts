import { dslRules } from "./dsl-rules";
import { MarkdownLexer } from "./markdown-lexer";

const input = `=== modal-details-modal
                Here is the **detailed information** that you can show or hide.
                ===
                `;
                const lexer = new MarkdownLexer(input, dslRules); // Assuming the dslRules include the modal definition
                const tokens = lexer.tokenize();
                
console.log('complete');
/*
import * as fs from 'fs/promises';
import * as path from 'path';

// Function to write data to a file in a relative directory
export async function writeFile(relativePath: string, data: string): Promise<void> {
  try {
    const absolutePath = path.join(__dirname, relativePath);
    await fs.writeFile(absolutePath, data, 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing to the file:', err);
  }
}

console.log("Hello, TypeScript with Nodemon!!");


writeFile('..\\output\\dsl-rules.json', JSON.stringify(dslRules, null, 2));
*/