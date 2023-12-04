import { findParentNodeAndSpliceIndex } from "..";
import { toMockAst } from "../../../utils/test-utils";

describe('findParentNodeAndSpliceIndex', () => {
    it('finds the correct parent and index for insertBefore', () => {
      
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
  
      
      const [parent, index] = findParentNodeAndSpliceIndex(mockRoot, 'grandchild1', true);
      
      
      expect(parent).toEqual(mockRoot.Children[1]); 
      expect(index).toBe(0); 
    });

    it('finds the correct parent and index for insertAfter', () => {
        
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
    
        
        const [parent, index] = findParentNodeAndSpliceIndex(mockRoot, 'grandchild1', false);
        
        
        expect(parent).toEqual(mockRoot.Children[1]); 
        expect(index).toBe(1); 
      });
  
    
  });