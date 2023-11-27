import { findOffset } from ".";
import { ITextBlock } from "../../components/wysiwyg/interface";

describe('findOffset', () => {
  
    it('handles ArrowUp key correctly', () => {
     const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
     const mockProcessAst = [
      [
        { guid: 'key-1-1', index: 0, textContent: 'Hello ' },
        { guid: 'key-1-2', index: 1, textContent: 'World' },
      ],
      [
        { guid: 'key-2-1', index: 0, textContent: 'Welcome ' },
        { guid: 'key-2-2', index: 1, textContent: 'World' },
      ]
     ];

      const result = findOffset(mockEditorData, 1, 0, 'ArrowUp', mockProcessAst, 3);
      
      expect(result).not.toBeNull();
      expect(result!.offset).toBe(3);
      expect(result!.guid).toBe('key-1-1');
      expect(result!.index).toBe(0);
      expect(result!.textContent).toBe('Hello ');
      expect(mockEditorData.cursorOffsetReduction).toBe(0);
    });
  
    it('handles ArrowDown key correctly', () => {
     const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
     const mockProcessAst = [
      [
        { guid: 'key-1-1', index: 0, textContent: 'Hello ' },
        { guid: 'key-1-2', index: 1, textContent: 'World' },
      ],
      [
        { guid: 'key-2-1', index: 0, textContent: 'Welcome ' },
        { guid: 'key-2-2', index: 1, textContent: 'World' },
      ]
     ];

      const result = findOffset(mockEditorData, 0, 0, 'ArrowDown', mockProcessAst, 3);

      expect(result).not.toBeNull();
      expect(result!.offset).toBe(3);
      expect(result!.guid).toBe('key-2-1');
      expect(result!.index).toBe(0);
      expect(result!.textContent).toBe('Welcome ');
      expect(mockEditorData.cursorOffsetReduction).toBe(0);
    });

    it('handles cursor offset reduction on ArrowUp correctly', () => {
        const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
        const mockProcessAst = [
         [
           { guid: 'key-1-1', index: 0, textContent: 'H' },
           { guid: 'key-1-2', index: 1, textContent: 'W' },
         ],
         [
           { guid: 'key-2-1', index: 0, textContent: 'Welcome' },
           { guid: 'key-2-2', index: 1, textContent: 'World' },
         ]
        ];
   
         const result = findOffset(mockEditorData, 1, 0, 'ArrowUp', mockProcessAst, 10);
   
         expect(result).not.toBeNull();
         expect(result!.offset).toBe(1);
         expect(result!.guid).toBe('key-1-2');
         expect(result!.index).toBe(1);
         expect(result!.textContent).toBe('W');
         expect(mockEditorData.cursorOffsetReduction).toBe(8);
       });

    it('handles cursor offset reduction on ArrowDown correctly', () => {
        const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
        const mockProcessAst = [
         [
           { guid: 'key-1-1', index: 0, textContent: 'Hello ' },
           { guid: 'key-1-2', index: 1, textContent: 'World' },
         ],
         [
           { guid: 'key-2-1', index: 0, textContent: 'W' },
           { guid: 'key-2-2', index: 1, textContent: 'W' },
         ]
        ];
   
         const result = findOffset(mockEditorData, 0, 0, 'ArrowDown', mockProcessAst, 8);
   
         expect(result).not.toBeNull();
         expect(result!.offset).toBe(1);
         expect(result!.guid).toBe('key-2-2');
         expect(result!.index).toBe(1);
         expect(result!.textContent).toBe('W');
         expect(mockEditorData.cursorOffsetReduction).toBe(6);
       });

       it('handles the total offset being beyong the total length of all blocks', () => {
        const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
        const mockProcessAst = [
         [
           { guid: 'key-1-1', index: 0, textContent: 'Hello ' },
           { guid: 'key-1-2', index: 1, textContent: 'World' },
         ],
         [
           { guid: 'key-2-1', index: 0, textContent: 'W' },
           { guid: 'key-2-2', index: 1, textContent: 'W' },
         ]
        ];
   
         const result = findOffset(mockEditorData, 0, 0, 'ArrowDown', mockProcessAst, 80);
   
         expect(result).not.toBeNull();
         expect(result!.offset).toBe(1);
         expect(result!.guid).toBe('key-2-2');
         expect(result!.index).toBe(1);
         expect(result!.textContent).toBe('W');
         expect(mockEditorData.cursorOffsetReduction).toBe(78);
       });

       it('handles the process AST being empty', () => {
        const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
        const mockProcessAst: ITextBlock[][] = [];
   
         const result = findOffset(mockEditorData, 0, 0, 'ArrowDown', mockProcessAst, 80);
   
         expect(result).toBeNull();
       });
  });