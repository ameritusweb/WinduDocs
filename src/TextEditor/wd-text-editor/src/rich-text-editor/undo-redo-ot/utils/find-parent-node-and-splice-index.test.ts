import { findParentNodeAndSpliceIndex } from "..";
import { toMockAst } from "../../../utils/test-utils";

describe('findParentNodeAndSpliceIndex', () => {
    it('finds the correct parent and index for insertBefore', () => {
      // Create a mock AST structure
      const mockRoot = toMockAst({
        Guid: 'root',
        Children: [
          { Guid: 'child1', Children: [] },
          { Guid: 'child2', Children: [
              { Guid: 'grandchild1', Children: [] }
            ]
          }
        ]
      });
  
      // Test the function with different cases
      const [parent, index] = findParentNodeAndSpliceIndex(mockRoot, 'grandchild1', true);
      
      // Assert the results
      expect(parent).toEqual(mockRoot.Children[1]); // Expect parent to be 'child2'
      expect(index).toBe(0); // Expect index to be 0 for 'insertBefore' true
    });

    it('finds the correct parent and index for insertAfter', () => {
        // Create a mock AST structure
        const mockRoot = toMockAst({
          Guid: 'root',
          Children: [
            { Guid: 'child1', Children: [] },
            { Guid: 'child2', Children: [
                { Guid: 'grandchild1', Children: [] }
              ]
            }
          ]
        });
    
        // Test the function with different cases
        const [parent, index] = findParentNodeAndSpliceIndex(mockRoot, 'grandchild1', false);
        
        // Assert the results
        expect(parent).toEqual(mockRoot.Children[1]); // Expect parent to be 'child2'
        expect(index).toBe(1); // Expect index to be 1 for 'insertBefore' false
      });
  
    // Add more test cases as needed
  });