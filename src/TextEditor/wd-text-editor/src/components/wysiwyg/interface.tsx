export interface AstNodeAttributes {
    Level?: string;
    Url?: string;
    Title?: string;
    IsHeader?: string;
    IsOrdered?: string;
    Language?: string;
  }

export interface AstNode {
    NodeName: string;
    Attributes: AstNodeAttributes;
    ChildIndex: number;
    Guid: string;
    Depth: number;
    TextContent: string | null;
    Children: AstNode[];
  }

  export interface HigherLevelProps {
    id?: string;
    content: AstNode[];
    updater?: (nodes: AstNode[]) => void;
  }