import { ASTNode, Rule, Token } from "../interfaces";

export class ASTFactory {
    private rules: Rule[];
    
    constructor(rules: Rule[]) {
      this.rules = rules;
    }
  
    private matchRule(token: Token): Rule | undefined {
      return this.rules.find(rule => rule.Name.toUpperCase() === token.type.replace('START', '').replace('END', ''));
    }
  
    private createNode(token: Token, rule: Rule): ASTNode {
      const node: ASTNode = {};
      rule.TokenRules.forEach(tokenRule => {
        // The token name in all caps is the property name
        node[tokenRule.Name.toUpperCase()] = null; // Initialize with null or appropriate value
      });
      // The DSL rule content's token is the uppercase name of the DSL rule
      if (rule.Content.ContentType.toUpperCase() === token.type) {
        node[rule.Content.ContentType.toUpperCase()] = token.value;
      }
      return node;
    }
  
    public buildAST(tokens: Token[]): ASTNode {
      const root: ASTNode = { CHILDREN: [] };
      const stack: { node: ASTNode; rule?: Rule }[] = [{ node: root }];
  
      tokens.forEach(token => {
        if (token.type.startsWith('START')) {
          const rule = this.matchRule(token);
          if (!rule) throw new Error(`No matching rule for token: ${token.type}`);
          const newNode = this.createNode(token, rule);
          stack[stack.length - 1].node.CHILDREN.push(newNode);
          stack.push({ node: newNode, rule }); // Push the new node onto the stack
        } else if (token.type.startsWith('END')) {
          stack.pop(); // Pop the node from the stack as we've ended this nesting
        } else {
          // Non-start/end tokens add properties to the current node
          const current = stack[stack.length - 1].node;
          const rule = this.matchRule(token);
          if (rule && rule.Content.ContentType.toUpperCase() === token.type) {
            current[rule.Content.ContentType.toUpperCase()] = token.value;
          }
        }
      });
  
      return root;
    }
  }