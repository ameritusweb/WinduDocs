// Interface for a single token rule within a DSL rule
export interface TokenRule {
    Name: string;
    Pattern: string;
    IsRequired: boolean;
    AllowMultiple?: boolean; // Optional property for rules that can appear multiple times
    Escapable?: boolean;
  }
  
  // Interface for the content specification within a DSL rule
  export interface ContentSpecification {
    StartDelimiter: string;
    EndDelimiter: string;
    ContentType: 'String' | 'TabsGroupContent' | 'TabContent' | 'Bold' | 'Italic' | 'BoldItalic' | 'Link' | 'Header'; // Expand with more content types as needed
  }
  
  // Interface for an entire DSL rule
  export interface DSLRule {
    Name: string;
    StartsWith: string;
    EndsWith: string;
    TokenRules: TokenRule[];
    Content: ContentSpecification;
    isEntryPoint?: boolean; // Optional property to indicate the entry point for the lexer
    Escapable?: boolean; // Optional property to indicate if the token can be escaped
  }
  
  // Interface for the token objects the lexer will produce
  export interface Token {
    type: string;
    value: string;
  }

  export type StateHandler = () => void;
export type StateHandlers = {
  [key: string]: StateHandler;
};
  
  // Interface for the lexer itself
  export interface IMarkdownLexer {
    input: string;
    position: number;
    tokens: Token[];
    dsl: DSLRule[];
    currentState: string;
    plainTextBuffer: string;
    tokenize(): Token[];
    states: StateHandlers;
  }