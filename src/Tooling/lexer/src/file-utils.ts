// fileUtils.ts
import fs from 'fs';
import path from 'path';

// This array will hold all tokens from all test runs.
const allTokens: any[] = [];

/**
 * Writes tokens to a JSON file and appends to the allTokens array.
 *
 * @param {string} fileName - The name of the file to write.
 * @param {any[]} tokens - The tokens to write to the file.
 */
export const writeTokensToFile = (fileName: string, tokens: any[]): void => {
  const outputPath = path.join(__dirname, '../output', `${fileName}.json`);

  // Ensure the output directory exists
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  // Write the tokens to a JSON file
  fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));

  // Append tokens to allTokens array for later use
  allTokens.push(...tokens);
};

/**
 * Writes all tokens to a single JSON file after all tests have completed.
 */
export const writeAllTokensToFile = (): void => {
  const outputPath = path.join(__dirname, '../output', 'all.json');

  // Write the allTokens array to the all.json file
  fs.writeFileSync(outputPath, JSON.stringify(allTokens, null, 2));

  // Clear the allTokens array to prepare for the next test run
  allTokens.length = 0;
};

export const cleanupOutputDirectory = (): void => {
    const outputPath = path.join(__dirname, '../output');
    if (fs.existsSync(outputPath)) {
      fs.rmdirSync(outputPath, { recursive: true });
    }
  };
