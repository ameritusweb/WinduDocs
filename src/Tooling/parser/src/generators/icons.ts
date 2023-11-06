// fileReader.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import * as svgparser from 'svg-parser';
import { parseSvgAst } from './parse-svg';

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

async function readFile(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Error reading the file: ${(err as Error).message}`);
  }
}

export async function readSvgFiles(relativeDirectoryPath: string): Promise<string> {
  // Resolve the relative path to an absolute path based on the directory of the current script
  const directoryPath = path.join(__dirname, relativeDirectoryPath);

  try {
    const files = await fs.readdir(directoryPath, { recursive: true });
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    // If you're only returning one SVG file's content, consider what you want to do with each parsed content
    let svgFile = '';
    for (const file of svgFiles) {
      const content = await readFile(path.join(directoryPath, file));
      const ast = svgparser.parse(content);
      const result = parseSvgAst(ast);
      svgFile += `
        /// ${result.className}
        function create${result.name.substring(0, 1).toUpperCase() + result.name.substring(1)}() {
          return \`${result.element}\`
        }
        ///
      `
    }
    
    return svgFile; // This returns only the last SVG file content
  } catch (err) {
    throw new Error(`Error processing SVG files: ${(err as Error).message}`);
  }
}