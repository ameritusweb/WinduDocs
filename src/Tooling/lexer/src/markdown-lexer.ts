import { DSLRule, IMarkdownLexer, StateHandler, StateHandlers, Token, TokenRule } from "./interfaces";

// The lexer class implements the IMarkdownLexer interface
export class MarkdownLexer implements IMarkdownLexer {
    input: string = '';
    position: number = 0;
    intermediatePosition: number = 0;
    tokens: Token[] = [];
    dsl: DSLRule[] = [];
    currentState: string = '';
    plainTextBuffer: string = '';
  
    // ... other properties
  states: StateHandlers;

  constructor(input: string, dsl: DSLRule[]) {
    // ... initialization
    this.input = input;
    this.position = 0;
    this.intermediatePosition = 0;
    this.tokens = [];
    this.dsl = dsl;
    this.currentState = this.dsl.find(rule => rule.isEntryPoint)?.Name || 'initial';
    this.states = {};
    this.plainTextBuffer = '';
    this.initializeStates();
  }

  advanceBy(n: number) {
    // Append the substring to the plainTextBuffer
    this.plainTextBuffer += this.input.substring(this.position, this.position + n);
    // Advance the position by n characters
    this.position += n;
  }

  // Method to transition to a new state
  transition(newState: string) {
    this.currentState = newState;
  }

  emitToken(type: string, value: string) {
    if (value) {
      this.tokens.push({ type, value });
      // If emitting a TEXT token, reset the plainTextBuffer as well
      if (type === 'TEXT') {
        this.plainTextBuffer = '';
      }
    }
  }

  emitAnyPlainText() {
    if (this.plainTextBuffer.length > 0) {
        // If there's accumulated plain text, emit it as a TEXT token
        this.emitToken('TEXT', this.plainTextBuffer);
        this.plainTextBuffer = ''; // Clear the plain text buffer
    }
  }

  // Initialize the state handlers based on the DSL
  initializeStates(): void {

    const defaultInitialStateHandler = () => {

        const matches = this.dsl
            .map(rule => ({
                pattern: new RegExp(rule.StartsWith, 'g'),
                rule,
                match: null
            } as any))
            .filter(rule => {
                rule.match = rule.pattern.exec(this.input.substring(this.position));
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
                    this.tokenizeIntermediateContent(intermediateContent, 0);
                }

                this.tokens.push({
                    type,
                    value: match[2] // The captured content without the markers
                });

                this.currentState = '' + state;

                intermediateContent = content.substring(match.index + match[0].length);
                if (intermediateContent) {
                    this.tokenizeIntermediateContent(intermediateContent, 0);
                }

                this.currentState = '' + state;
            
                // Replace the matched content with placeholders to avoid re-matching
                content = '';
                //content = content.substring(0, match.index) +
                //            replacement +
                //            content.substring(match.index + match[0].length);
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
            this.tokens.push({
              type: tokenRule.Name.toUpperCase(),
              value: tokenMatch[0] // Use the entire match
            });
            // Replace the matched token content with placeholders to prevent re-matching
            content = content.substring(0, tokenMatch.index) + '\0'.repeat(tokenMatch[0].length) + content.substring(tokenMatch.index + tokenMatch[0].length);
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
        let startPattern = new RegExp(rule.StartsWith, 'g');
        let inputSubstring = this.input.substring(this.position);
        let startMatch = startPattern.exec(inputSubstring);

        let positionDiff = 0;
        if (startMatch && startMatch.index === 0) {
            positionDiff = startMatch[0].length;
            this.position += positionDiff;
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
      if (content) {
        this.tokens.push({
          type: rule.Name.toUpperCase(),
          value: content
        });
      }

      // Update the lexer's position to after the matched content
      this.position = endMatch ? this.position + (content || '').length + endMatch[0].length : this.input.length;

      // Transition back to the initial state or to the next state as defined by the DSL
      this.transition('initial');
    };
  }

  tokenizeIntermediateContent(intermediate: string, positionStart: number) {
    this.intermediatePosition = positionStart;
    while (this.intermediatePosition < intermediate.length) {
        const handler: StateHandler = this.states[this.currentState];
        if (handler) {
          handler.call(this);
        } else {
          throw new Error(`State handler for state '${this.currentState}' not found.`);
        }
      }
  
      this.emitAnyPlainText();
  }
    
  // The tokenize method now safely calls the handler based on the current state
  tokenize(): Token[] {
    while (this.position < this.input.length) {
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
