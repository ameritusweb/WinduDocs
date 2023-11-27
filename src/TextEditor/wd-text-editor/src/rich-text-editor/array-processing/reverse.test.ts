import { reverse } from ".";

describe('reverse', () => {
    it('yields elements in reverse order', () => {
      const inputArray = [1, 2, 3, 4, 5];
      const reversed = reverse(inputArray);
  
      for (let i = inputArray.length - 1; i >= 0; i--) {
        expect(reversed.next().value).toBe(inputArray[i]);
      }
  
      // Check if the generator is done
      expect(reversed.next().done).toBe(true);
    });
  });