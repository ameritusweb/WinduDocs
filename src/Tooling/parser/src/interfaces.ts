export type Token = {
    type: string;
    value: string;
  };
  
export type Rule = {
    Name: string;
    TokenRules: { Name: string; Pattern: string; CountOccurrences?: number; IsRequired?: boolean, AllowMultiple?: boolean; }[];
    Content: { ContentType: string, DslRules: Rule[] };
  };
  
export type ASTNode = {
    [key: string]: any;
    TYPE: string;
    children?: ASTNode[];
  };
  
export interface FunctionMappings {
    [key: string]: string;
  }