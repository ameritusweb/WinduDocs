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
      const node: ASTNode = {} as ASTNode;
      rule.TokenRules.forEach(tokenRule => {
        // The token name in all caps is the property name
        node[tokenRule.Name.toUpperCase()] = null; // Initialize with null or appropriate value
      });
      node["TYPE"] = rule.Name;
      // The DSL rule content's token is the uppercase name of the DSL rule
      // if (rule.Name.toUpperCase() === token.type) {
      //   node[rule.Name.toUpperCase()] = token.value;
      // }
      return node;
    }
  
    public buildAST(tokens: Token[]): ASTNode {
      const root: ASTNode = { TYPE: 'root', children: [] };
      const stack: { node: ASTNode; rule?: Rule }[] = [{ node: root }];
  
      tokens.forEach(token => {
        if (token.type === 'TEXT') {
          const currStack = stack[stack.length - 1];
          const current = currStack.node;
          current.children?.push({ 'TYPE': 'Text', 'TEXT': token.value });
          return;
        }
        if (token.type.startsWith('START')) {
          const rule = this.matchRule(token);
          if (!rule) throw new Error(`No matching rule for token: ${token.type}`);
          const newNode = this.createNode(token, rule);
          (stack[stack.length - 1].node.children as ASTNode[]).push(newNode);
          stack.push({ node: newNode, rule }); // Push the new node onto the stack
        } else if (token.type.startsWith('END')) {
          stack.pop(); // Pop the node from the stack as we've ended this nesting
        } else {
          // Non-start/end tokens add properties to the current node
          const currStack = stack[stack.length - 1];
          const current = currStack.node;
          if (current.hasOwnProperty(token.type)) {
            current[token.type] = token.value;
          }
          else {
            const rule = currStack.rule;
            if (rule && rule.Name.toUpperCase() === token.type) {
              current[rule.Name.toUpperCase()] = token.value;
            }
          }
        }
      });
  
      return root;
    }
  }