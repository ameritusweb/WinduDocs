// Interface for a single token rule within a DSL rule
export interface TokenRule {
    Name: string;
    Pattern: string;
    IsRequired: boolean;
    Transform?: string;
    CaptureGroup?: string;
    MatchCaptureGroup?: number;
    CountOccurrences?: number;
    IsTokenizable?: boolean;
    AllowMultiple?: boolean; // Optional property for rules that can appear multiple times
    Trim?: boolean;
    TrimS?: boolean;
    Escapable?: boolean;
    Substring?: number;
  }
  
  // Interface for the content specification within a DSL rule
  export interface ContentSpecification {
    StartDelimiter?: string;
    EndDelimiter?: string;
    ContentType: 'String' | 'TabsGroupContent' | 'TabContent' | 'CodeContent' | 'TableContent' | 'FormulaContent' | 'TreeViewContent' | 'CardContent' | 'CardBodyContent' | 'CardHeaderContent' | 'ModalContent' | 'Bold' | 'Italic' | 'BoldItalic' | 'Link' | 'Header'; // Expand with more content types as needed
    DslRules?: DSLRule[];
    }
  
  // Interface for an entire DSL rule
  export interface DSLRule {
    Name: string;
    StartsWith: string;
    EndsWith: string;
    TokenRules: TokenRule[];
    Content?: ContentSpecification;
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
    inputStack: string[];
    positionStack: number[];
    tokens: Token[];
    dsl: DSLRule[];
    currentState: string;
    plainTextBuffer: string;
    tokenize(): Token[];
    states: StateHandlers;
  }