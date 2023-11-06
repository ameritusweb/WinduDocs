import { ASTNode, Rule, Token } from "../interfaces";

export class ASTFactory {
    private rules: Rule[];
    private ruleLookup: { [tokenType: string]: Rule } = {};
    private contextRules: { [contextType: string]: Rule[] } = {};
    
    constructor(rules: Rule[]) {
      this.rules = rules;
      this.initializeContextRules(rules);
      // Initialize the rule lookup table
        this.rules.forEach(rule => {
            this.ruleLookup[rule.Name.toUpperCase()] = rule;
            this.ruleLookup[`START${rule.Name.toUpperCase()}`] = rule;
            this.ruleLookup[`END${rule.Name.toUpperCase()}`] = rule;
        });
    }

    private initializeContextRules(rules: Rule[], parentName: string = ''): void {
        rules.forEach(rule => {
            if (rule.Content) {
                const contextType = parentName ? `${parentName}.${rule.Name}` : rule.Name;
                this.contextRules[contextType.toUpperCase()] = rule.Content.DslRules || [];
            
                // Recursively initialize context rules for nested DSL rules
                if (rule.Content.DslRules) {
                    this.initializeContextRules(rule.Content.DslRules, contextType);
                }
            }
        });
      }

    private matchRule(token: Token, context?: string): Rule | undefined {
        // If we are in a context, only match against rules that are valid in this context
        if (context) {
          let match = this.contextRules[context.toUpperCase()]?.find(rule => 
            rule.Name.toUpperCase() === token.type.replace('START', '').replace('END', '')
          );
          if (!match) {
            return this.ruleLookup[token.type];
          }
          else
          {
            return match;
          }
        }
        // If we're not in a context, match against top-level rules
        return this.ruleLookup[token.type];
      }
    
  
    private createNode(token: Token, rule: Rule): ASTNode {
      const node: ASTNode = {} as ASTNode;
      rule.TokenRules.forEach(tokenRule => {
        // The token name in all caps is the property name
        node[tokenRule.Name.toUpperCase()] = null; // Initialize with null or appropriate value
      });
      node.children = [];
      node["TYPE"] = rule.Name;
      return node;
    }
  
    public buildAST(tokens: Token[]): ASTNode {
      const root: ASTNode = { TYPE: 'root', children: [] };
      const stack: { node: ASTNode; context?: string; rule?: Rule }[] = [{ node: root }];
  
      tokens.forEach(token => {
        const currStack = stack[stack.length - 1];
        const current = currStack.node;
        if (token.type === 'TEXT') {
          current.children?.push({ 'TYPE': 'Text', 'TEXT': token.value });
          return;
        }
        if (token.type.startsWith('START')) {
          const rule = this.matchRule(token, currStack.context);
          if (!rule) 
            throw new Error(`No matching rule for token: ${token.type} in context: ${currStack.context}`);
          const newNode = this.createNode(token, rule);
          (stack[stack.length - 1].node.children as ASTNode[]).push(newNode);
          stack.push({ node: newNode, context: rule.Name.toUpperCase(), rule }); // Push the new node onto the stack
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