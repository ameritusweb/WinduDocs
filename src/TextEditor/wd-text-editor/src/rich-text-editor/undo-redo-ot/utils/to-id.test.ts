import { toId } from '..';
import { cleanup } from '../../../utils/test-utils'

afterEach(() => {
    cleanup();
  });
  
  describe('toId', () => {
    it('handles a null value', () => {
      expect(toId(null)).toBe(null);
    });
  });