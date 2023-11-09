import hljs from 'highlight.js';
import { readSvgFiles, writeFile } from './generators/icons';
import * as fs from 'fs/promises';
import { parseDsl } from './generators/parse-dsl';
import { convertJSX } from './generators/convert-jsx.js';

console.log("Hello, TypeScript with Nodemon!!");

const jsx = convertJSX('..\\..\\src\\jsx\\link.jsx');

console.log(jsx);
//parseDsl();

/*
async function main() {
  const strOut = await readSvgFiles('..\\..\\src\\icons');
  await writeFile('..\\..\\src\\templates\\icon.js', strOut);
}

main();
*/
/*
const highlightedCode = hljs.highlight(
    '<span>Hello World!</span>',
    { language: 'javascript' }
  );
*/
  