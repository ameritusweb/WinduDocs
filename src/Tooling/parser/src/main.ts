import hljs from 'highlight.js';
import { readSvgFiles, writeFile } from './generators/icons';
import * as fs from 'fs/promises';

console.log("Hello, TypeScript with Nodemon!!");

async function main() {
  const strOut = await readSvgFiles('..\\..\\src\\icons');
  await writeFile('..\\..\\src\\templates\\icon.js', strOut);
}

main();

/*
const highlightedCode = hljs.highlight(
    '<span>Hello World!</span>',
    { language: 'javascript' }
  );
*/
  