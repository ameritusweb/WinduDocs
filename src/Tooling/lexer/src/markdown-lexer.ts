import { DSLRule, IMarkdownLexer, StateHandler, StateHandlers, Token, TokenRule } from "./interfaces";

// The lexer class implements the IMarkdownLexer interface
export class MarkdownLexer implements IMarkdownLexer {
    inputStack: string[] = []; // Stack to manage multiple levels of input
    positionStack: number[] = []; // Stack to manage the corresponding positions
    tokens: Token[] = [];
    dsl: DSLRule[] = [];
    additionalDsl: DSLRule[] = [];
    stateStack: string[] = []; // Stack to manage the states
    currentState: string = '';
    plainTextBuffer: string = '';
  
    // ... other properties
  states: StateHandlers;

  constructor(input: string, dsl: DSLRule[]) {
    // ... initialization
    this.pushInput(input); // Push the initial input onto the stack
    this.tokens = [];
    this.dsl = dsl;
    this.currentState = this.dsl.find(rule => rule.isEntryPoint)?.Name || 'initial';
    this.stateStack.push(this.currentState);
    this.states = {};
    this.plainTextBuffer = '';
    this.initializeStates();
  }

  getLastState() {
    return this.stateStack[this.stateStack.length - 1];
  }

  pushInput(newInput: string) {
    this.inputStack.push(newInput);
    this.positionStack.push(0); // Reset the position for the new input
    this.stateStack.push(this.currentState);
    this.currentState = 'initial'; // Reset state when pushing new input context
  }

  popInput() {
    if (this.inputStack.length > 1) { // Ensure there's something to pop
      this.inputStack.pop();
      this.positionStack.pop();
      this.stateStack.pop();
    } else {
      throw new Error('Input stack underflow');
    }
  }

  // Method to get the current input from the stack
  getCurrentInput(): string {
    return this.inputStack[this.inputStack.length - 1];
  }

  // Method to get the current position from the stack
  getCurrentPosition(): number {
    return this.positionStack[this.positionStack.length - 1];
  }

  // Method to set the current position for the top input
  setCurrentPosition(newPosition: number) {
    this.positionStack[this.positionStack.length - 1] = newPosition;
  }

  addDsl(dsl: DSLRule[]) {
    dsl.forEach((rule) => {
        this.additionalDsl.unshift(rule);
        if (!this.states[rule.Name])
            this.states[rule.Name] = this.createStateHandler(rule);
    });
  }

  removeDsl(dsl: DSLRule[]) {
    this.additionalDsl = this.additionalDsl.slice(dsl.length);
  }

  advanceBy(n: number) {
    // Append the substring to the plainTextBuffer
    const input = this.getCurrentInput();
    let position = this.getCurrentPosition();
    this.plainTextBuffer += input.substring(position, position + n);
    // Advance the position by n characters
    this.setCurrentPosition(position + n);
  }

  // Method to transition to a new state
  transition(newState: string) {
    this.currentState = newState;
  }

  emitToken(type: string, value: string, cleanup?: () => void) {
    if (value) {
      this.tokens.push({ type, value });
      if (cleanup)
        cleanup();
    }
  }

  emitAnyPlainText() {
    if (this.plainTextBuffer.length > 0) {
        const tokenType = this.getLastState() !== 'initial' ? this.getLastState().toUpperCase() : 'TEXT';
        // If there's accumulated plain text, emit it as a TEXT token
        this.emitToken(tokenType, this.plainTextBuffer, () => { this.plainTextBuffer = '';  });
    }
  }

  // Initialize the state handlers based on the DSL
  initializeStates(): void {

    const defaultInitialStateHandler = () => {

        const input = this.getCurrentInput();
        let position = this.getCurrentPosition();
        const domainSpecificLang = [...this.dsl, ...this.additionalDsl];
        const matches = domainSpecificLang
            .map(rule => ({
                pattern: new RegExp(rule.StartsWith, 'g'),
                rule,
                match: null
            } as any))
            .filter(rule => {
                rule.match = rule.pattern.exec(input.substring(position));
                return rule.match !== null;
            });

            // Find the closest match (smallest index)
            if (matches.length > 0)
            {
                const minIndexMatch = matches.reduce((min, rule) => rule.match.index < min.match.index ? rule : min, matches[0]);
                
                if (minIndexMatch.match.index > 0) {
                    // Advance by the minimum index found and consume those characters
                    this.advanceBy(minIndexMatch.match.index);
                } else {
                    this.emitAnyPlainText();

                    // Handle the token match
                    this.transition(minIndexMatch.rule.Name);
                    return;
                }
            } else {
                // If no match is found, consume characters until the next potential match
                this.advanceBy(1);
            }
    };

    this.dsl.forEach(rule => {
        if (!this.states[rule.Name])
            this.states[rule.Name] = this.createStateHandler(rule);
    });

    // Set the initial state handler, using the default if none is defined in the DSL
    if (!this.states['initial'])
        this.states['initial'] = defaultInitialStateHandler;

  }

  createStateHandler(rule: DSLRule) {
    // Helper method to handle overlapping patterns
    const handleOverlappingPatterns = (content: string): string => {
        const pattern = /(\*{1,3})(.*?)\1/g;
        let match;

        // This will hold the intermediate content that's not part of any matches
        let intermediateContent = '';
      
        while ((match = pattern.exec(content))) {
          let type = null;
          let replacement;
      
          switch (match[1].length) {
            case 3:
              type = 'BOLD_ITALIC';
              replacement = '\0'.repeat(match[0].length);
              break;
            case 2:
              type = 'BOLD';
              replacement = '\0'.repeat(match[0].length);
              break;
            case 1:
              type = 'ITALIC';
              replacement = '\0'.repeat(match[0].length);
              break;
          }
      
          if (type !== null) {

                // Process the content before the current match
                intermediateContent = content.substring(0, match.index);
                let state = '' + this.currentState;
                if (intermediateContent) {
                    // Process this intermediate content, which may include smaller patterns
                    // You would need a function that tokenizes the intermediate content and updates the tokens array
                    this.pushInput(intermediateContent);
                    this.tokenize();
                    this.popInput();
                }

                this.tokens.push({
                    type,
                    value: match[2] // The captured content without the markers
                });

                this.currentState = '' + state;

                intermediateContent = content.substring(match.index + match[0].length);
                if (intermediateContent) {
                    this.pushInput(intermediateContent);
                    this.tokenize();
                    this.popInput();
                }

                this.currentState = '' + state;
            
                content = '\0'.repeat(content.length);
            }
        }
      
        return content;
      };      

    // Helper method to apply token rules
    const applyTokenRules = (content: string, tokenRules: TokenRule[]): string => {
      tokenRules.forEach(tokenRule => {
        let tokenPatternString = tokenRule.Escapable ? `(?<!\\\\)${tokenRule.Pattern}` : tokenRule.Pattern;
        let tokenPattern = new RegExp(tokenPatternString, 'g');
        let tokenMatch;

        while ((tokenMatch = tokenPattern.exec(content))) {
          if (tokenRule.Name) {
            let value = tokenMatch[0];
            if (!value)
            {
                break;
            }
            if (tokenRule.Substring) {
                value = value.substring(tokenRule.Substring);
            }
            let val = value.replace(/\0/g, '');
            val = tokenRule.Trim ? val.replace(/\0/g, '').trim() : val;
            this.tokens.push({
              type: tokenRule.Name.toUpperCase(),
              value: tokenRule.TrimS ? ((val.match('([^\r\n\t]+\\n[^\r\n\t]+)') || [''])[0]) : val
            });
            // Replace the matched token content with placeholders to prevent re-matching
            content = content.substring(0, tokenMatch.index) + '\0'.repeat(tokenMatch[0].length) + content.substring(tokenMatch.index + tokenMatch[0].length);
            if (!tokenRule.AllowMultiple) {
                break;
              }
              else
              {
                tokenPattern.lastIndex = 0;
              }
            }
        }
      });

      return content;
    };

    // Helper method to unescape tokens
    const unescapeTokens = (tokens: Token[]): Token[] => {
      return tokens.map(token => {
        let unescapedValue = token.value.replace(/\0+/g, ' ').replace(/\\(.)/g, '$1');
        return { type: token.type, value: unescapedValue };
      });
    };

    return () => {
       // Identify the start of the rule's pattern
       const input = this.getCurrentInput();
       let position = this.getCurrentPosition();
        let startPattern = new RegExp(rule.StartsWith, 'g');
        let inputSubstring = input.substring(position);
        let startMatch = startPattern.exec(inputSubstring);

        let positionDiff = 0;
        if (startMatch && startMatch.index === 0) {
            positionDiff = startMatch[0].length;
            this.setCurrentPosition(position + positionDiff);
        } else {
            this.transition('initial');
            return;
        }

      // Capture content until the end of the rule's pattern
      let endPattern = new RegExp(rule.EndsWith, 'g');
      inputSubstring = inputSubstring.substring(positionDiff);
      let endMatch = endPattern.exec(inputSubstring);
      let content = inputSubstring.slice(0, endMatch ? endMatch.index : undefined);

      // Process the content for overlapping patterns
      content = handleOverlappingPatterns(content);

      // Apply the token rules to the remaining content
      content = applyTokenRules(content, rule.TokenRules);

      // Unescape any escaped characters in the tokens we've collected so far
      this.tokens = unescapeTokens(this.tokens);

      // If there is any content left, create a token for it
      if (rule.Content && content && !this.isNullString(content)) {

        const initialLength = content.length;

        if (rule.Content.StartDelimiter) {
            let startPattern = new RegExp(rule.Content.StartDelimiter, 'g');
            let startMatch = startPattern.exec(content);
            if (startMatch)
            {
                content = content.substring(startMatch.index + startMatch[0].length).trimStart();
            }

            this.setCurrentPosition(this.getCurrentPosition() + (initialLength - content.length));
        }

        if (rule.Content.EndDelimiter) {
            let endPattern = new RegExp(rule.Content.EndDelimiter, 'g');
            endMatch = endPattern.exec(content);
            if (endMatch)
                content = content.substring(0, endMatch.index);
        }

        if (rule.Content.DslRules) {
            
            this.addDsl(rule.Content.DslRules);
            this.pushInput(content);
            this.tokenize();
            this.popInput();
            this.removeDsl(rule.Content.DslRules);
        }
        else {
            this.tokens.push({
            type: rule.Name.toUpperCase(),
            value: content
            });
        }
      }

      // Update the lexer's position to after the matched content
      position = endMatch ? this.getCurrentPosition() + (content || '').length + endMatch[0].length : this.getCurrentInput().length;
      this.setCurrentPosition(position);

      // Transition back to the initial state or to the next state as defined by the DSL
      this.transition('initial');
    };
  }

  isNullString(str: string) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== '\0') {
          return false;
        }
      }
      return true;
  }
    
    // The tokenize method now safely calls the handler based on the current state
    tokenize(): Token[] {
        const input = this.getCurrentInput();
        while (this.getCurrentPosition() < input.length) {
            const handler: StateHandler = this.states[this.currentState];
            if (handler) {
                handler.call(this);
            } else {
                throw new Error(`State handler for state '${this.currentState}' not found.`);
            }
        }

        this.emitAnyPlainText();

        return this.tokens;
    }
  }
