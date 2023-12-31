import { incrementEnd } from '..';
import { cleanup } from '../../../utils/test-utils'

afterEach(() => {
    cleanup();
  });
  
  describe('incrementEnd', () => {
    it('increments the number at the end of the string', () => {
      expect(incrementEnd('item29')).toBe('item30');
    });
  
    it('returns the original string if there is no trailing number', () => {
      expect(incrementEnd('item')).toBe('item');
    });
  
    it('resets the number to 1 if it reaches MAX_SAFE_INTEGER', () => {
      expect(incrementEnd(`item${Number.MAX_SAFE_INTEGER}`)).toBe('item1');
    });
  });