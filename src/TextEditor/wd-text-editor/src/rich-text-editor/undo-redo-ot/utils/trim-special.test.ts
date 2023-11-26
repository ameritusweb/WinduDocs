import { act, cleanup, render, screen, userEvent } from '../../../utils/test-utils'
import trimSpecial, { TrimOptions } from './trim-special';

afterEach(() => {
    cleanup();
  });
  
describe('TrimSpecial', async () => {
    it('trims string from the start', () => {
        const options: TrimOptions = { startString: 'Hello ' };
        const result = trimSpecial('Hello World', options);
        expect(result).toBe('World');
      });
    
      it('trims string from the end', () => {
        const options: TrimOptions = { endString: ' World' };
        const result = trimSpecial('Hello World', options);
        expect(result).toBe('Hello');
      });
    
      it('extracts substring using regex', () => {
        const options: TrimOptions = { extractRegex: /Wo(.*)ld/ };
        trimSpecial('Hello World', options);
        expect(options.extraction).toBe('World');
      });
    
      it('combines start and end trimming', () => {
        const options: TrimOptions = { startString: 'Hello ', endString: ' World' };
        const result = trimSpecial('Hello Wonderful World', options);
        expect(result).toBe('Wonderful');
      });
})