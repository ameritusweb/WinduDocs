import { moveArray } from ".";

describe('moveArray function', () => {
    it('moves elements from source array to destination array', () => {
      const sourceArray = [1, 2, 3, 4, 5];
      const destinationArray = [10, 11, 12];
      const sliceStart = 1;
      const destinationIndex = 2;
      const sliceEnd = 4;
  
      moveArray(sourceArray, sliceStart, destinationArray, destinationIndex, sliceEnd);
  
      // Check if the destination array contains the moved elements
      expect(destinationArray).toEqual([10, 11, 2, 3, 4, 12]);
  
      // Check if the source array only contains the remaining elements
      expect(sourceArray).toEqual([1, 5]);
    });
  });