import mappings from '../mappings/function-mappings.json';
import ast from '../ast/wd-ast.json';
import { JsBundler } from './js-bundler';
import * as fs from 'fs/promises';
import * as path from 'path';

function writeFile(relativePath: string, data: string): void {
    try {
      const absolutePath = path.join(__dirname, relativePath);
      fs.writeFile(absolutePath, data, 'utf8');
      console.log('File written successfully');
    } catch (err) {
      console.error('Error writing to the file:', err);
    }
  }

export const bundle = () => {

    const bundler = new JsBundler(ast, mappings);
    const bundle = bundler.bundleJsFunctions();
    const file = `
        AST = ${JSON.stringify(ast)};

        WD = {};

        ${bundle}

        const o = createRoot(AST);

        modules.exports = o;
    `;
    console.log(file);

    writeFile('..\\..\\src\\output\\bundle.js', file);
}