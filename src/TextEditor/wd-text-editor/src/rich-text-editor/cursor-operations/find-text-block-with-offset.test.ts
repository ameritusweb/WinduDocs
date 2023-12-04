import { findTextBlockWithOffset } from ".";
import { generateKey } from "../node-operations";

describe('findTextBlockWithOffset', () => {
    it('finds the correct text block and offset', () => {
      const blocks = [
        { guid: generateKey(), index: 0, textContent: 'Hello ' },
        { guid: generateKey(), index: 1, textContent: 'World' },
        
      ];
      const totalOffset = 8;
      const expectedBlock = blocks[1];
      const expectedBlockOffset = 2;
      const expectedReduction = 0;
  
      const result = findTextBlockWithOffset(blocks, totalOffset);
      expect(result.block).toBe(expectedBlock);
      expect(result.blockOffset).toBe(expectedBlockOffset);
      expect(result.reduction).toBe(expectedReduction);
    });
  });