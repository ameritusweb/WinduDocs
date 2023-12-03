import { createNodeWithTypeAndKey } from ".";

describe('createNodeWithTypeAndKey', () => {
    it('creates a Text node', () => {
        const node = createNodeWithTypeAndKey('Text', 'some text');
        expect(node.NodeName).toBe('Text');
        expect(node.TextContent).toEqual('some text');
      });
    
      it('creates a Strong node', () => {
        const node = createNodeWithTypeAndKey('Strong', 'strong text');
        expect(node.NodeName).toBe('Strong');
        expect(node.Children[0].NodeName).toBe('Text');
        expect(node.Children[0].TextContent).toEqual('strong text');
      });
  
    it('creates an Emphasis node', () => {
      const node = createNodeWithTypeAndKey('Emphasis', 'emphasized text');
      expect(node.NodeName).toBe('Emphasis');
      expect(node.Children[0].NodeName).toBe('Text');
      expect(node.Children[0].TextContent).toEqual('emphasized text');
    });
  
    it('creates a Strong + Emphasis node', () => {
      const node = createNodeWithTypeAndKey('Strong + Emphasis', 'strong emphasized text');
      expect(node.NodeName).toBe('Strong');
      expect(node.Children[0].NodeName).toBe('Emphasis');
      expect(node.Children[0].Children[0].NodeName).toBe('Text');
      expect(node.Children[0].Children[0].TextContent).toEqual('strong emphasized text');
    });
  
    // Add more tests for additional cases if needed
  });
  