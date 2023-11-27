import { getCursorOffset } from ".";
import { generateKey } from "../node-operations";

describe('getCursorOffset', () => {
    it('calculates the correct offset', () => {
      const previousBlocks = [
        { guid: generateKey(), index: 0, textContent: 'Hello' },
        { guid: generateKey(), index: 1, textContent: 'World' },
        // Add more ITextBlock objects as needed
      ];
      const initialOffset = 5;
      const expectedOffset = 15; // Adjust based on your test case
  
      const result = getCursorOffset(previousBlocks, initialOffset);
      expect(result).toBe(expectedOffset);
    });
  });