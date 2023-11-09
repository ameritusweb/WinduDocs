import * as fs from 'fs';
import * as path from 'path';
import { ASTNode, FunctionMappings } from '../interfaces';

export class JsBundler {
  private ast: ASTNode;
  private functionMappings: FunctionMappings;

  constructor(ast: ASTNode, functionMappings: FunctionMappings) {
    this.ast = ast;
    this.functionMappings = functionMappings;
  }

  public bundleJsFunctions(): string {
    const requiredFunctions: Set<string> = new Set();
    this.collectRequiredFunctions(this.ast, requiredFunctions);

    let bundle: string = '';

    // Read and append each required function to the bundle
    requiredFunctions.forEach((func) => {
      const fileName: string | undefined = this.functionMappings[func];
      if (fileName) {
        const filePath = path.join(__dirname, `..\\..\\src\\templates\\${fileName}`);
        if (filePath) {
            const functionContent: string = fs.readFileSync(filePath, 'utf-8');
            bundle += `
            ${functionContent}
            `;
        }
      }
      else
      {
        console.log(`must add ${func}`);
      }
    });

    return bundle;
  }

  private collectRequiredFunctions(node: ASTNode, requiredFunctions: Set<string>): void {
    if (node.TYPE) {
      requiredFunctions.add(node.TYPE);
    }

    if (node.children) {
      node.children.forEach((child) => {
        this.collectRequiredFunctions(child, requiredFunctions);
      });
    }
  }
}