import { vi } from 'vitest';
import { cleanup } from '../../utils/test-utils'
import { generateKey } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('generate-key', () => {
    it('generates a valid key', () => {
        const key = generateKey();
        const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        expect(key).toMatch(guidRegex);
      });
  })