export type Token = {
    type: string;
    value: string;
  };
  
export type Rule = {
    Name: string;
    TokenRules: { Name: string; Pattern: string; CountOccurrences?: number; IsRequired?: boolean }[];
    Content: { ContentType: string };
  };
  
export type ASTNode = {
    [key: string]: any;
    TYPE: string;
    children?: ASTNode[];
  };