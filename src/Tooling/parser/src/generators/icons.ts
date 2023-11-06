// fileReader.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import * as svgparser from 'svg-parser';

async function readFile(relativeFilePath: string): Promise<string> {
  const filePath = path.join(__dirname, relativeFilePath);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Error reading the file: ${(err as Error).message}`);
  }
}

async function readSvgFiles(directoryPath: string): Promise<string> {
  try {
    const files = await fs.readdir(directoryPath);
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    const svgFile: string = '';
    for (const file of svgFiles) {
      const content = await readFile(path.join(directoryPath, file));
      const ast = svgparser.parse(content);
    }
    
    return svgFile;
  } catch (err) {
    throw new Error(`Error processing SVG files: ${(err as Error).message}`);
  }
}