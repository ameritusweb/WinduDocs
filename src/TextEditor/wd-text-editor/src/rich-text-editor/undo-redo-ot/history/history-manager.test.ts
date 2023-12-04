import { HistoryManager } from "..";
import { mockOutputHtml } from "../../../__mocks__/editor-mocks";
import { AstOperation, IHistoryManager } from "../../../components/wysiwyg/interface";
import { toMockAst } from "../../../utils/test-utils";

describe('HistoryManager', () => {
    let historyManager: IHistoryManager = HistoryManager;

    beforeEach(() => {
        historyManager.clear();
    });
  
    it('initializes with empty undo and redo stacks', () => {
      
      expect((historyManager as typeof HistoryManager).stacksReadOnly()[0].length === 0).toBe(true);
      expect((historyManager as typeof HistoryManager).stacksReadOnly()[1].length === 0).toBe(true);
    });

    it('records an insertBefore operation', () => {

        
        expect(() => {
            historyManager.recordChildInsertBefore(
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            'A123',
            toMockAst({ Guid: 'B123'}),
            false);
        }).not.toThrow();

    });

    it('records an insertAfter operation', () => {

        
        expect(() => {
            historyManager.recordChildInsertAfter(
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            'A123',
            toMockAst({ Guid: 'B123'}),
            false);
        }).not.toThrow();

    });

    it('records a removeBefore operation', () => {

        
        expect(() => {
            historyManager.recordChildRemoveBefore(
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            'A123',
            toMockAst({ Guid: 'B123'}),
            false);
        }).not.toThrow();

    });

    it('records a removeAfter operation', () => {

        
        expect(() => {
            historyManager.recordChildRemoveAfter(
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            'A123',
            toMockAst({ Guid: 'B123'}),
            false);
        }).not.toThrow();

    });

    it('records a replace operation', () => {

        
        expect(() => {
            historyManager.recordChildReplace(
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            { targetParentId: '', nodeIndex: 0, offset: 0 },
            toMockAst({ Guid: 'A123'}),
            toMockAst({ Guid: 'B123'}),
            false);
        }).not.toThrow();

    });

    it('records a text update operation', () => {

        
        expect(() => {
            historyManager.recordChildTextUpdate(
            "Old Text",
            2,
            toMockAst({ Guid: 'A123'}),
            toMockAst({ Guid: 'B123'}),
            "R123",
            false);
        }).not.toThrow();

    });

    it('returns reverse operation for insertBefore', () => {
        const mockOperation: AstOperation<'insertBefore'> = 
        { 
            type: 'insertBefore', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'A123', newNode: toMockAst({ Guid: 'B123'})},
            timestamp: 3
        };
        const reverseOperation = historyManager.getReverseOperation(mockOperation);
        
      });

      it('returns reverse operation for insertAfter', () => {
        const mockOperation: AstOperation<'insertAfter'> = 
        { 
            type: 'insertAfter', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'A123', newNode: toMockAst({ Guid: 'B123'})},
            timestamp: 3
        };
        const reverseOperation = historyManager.getReverseOperation(mockOperation);
        
      });

      it('returns reverse operation for removeBefore', () => {
        const mockOperation: AstOperation<'removeBefore'> = 
        { 
            type: 'removeBefore', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'A123', targetNode: toMockAst({ Guid: 'B123'})},
            timestamp: 3
        };
        const reverseOperation = historyManager.getReverseOperation(mockOperation);
        
      });

      it('returns reverse operation for removeAfter', () => {
        const mockOperation: AstOperation<'removeAfter'> = 
        { 
            type: 'removeAfter', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'A123', targetNode: toMockAst({ Guid: 'B123'})},
            timestamp: 3
        };
        const reverseOperation = historyManager.getReverseOperation(mockOperation);
        
      });

      it('returns reverse operation for replace', () => {
        const mockOperation: AstOperation<'replace'> = 
        { 
            type: 'replace', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: {  oldNode: toMockAst({ Guid: 'A123'}), newNode: toMockAst({ Guid: 'B123'})},
            timestamp: 3
        };
        const reverseOperation = historyManager.getReverseOperation(mockOperation);
        
      });
  
    it('records an operation', () => {
        
        const mockOperation: AstOperation<'replace'> = 
            { 
                type: 'replace', 
                initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
                finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
                parentNodeId: '',
                targetNodeId: '',
                nodeIndex: 0,
                payload: { oldNode: toMockAst({ Guid: 'A134'}), newNode: toMockAst({ Guid: 'B123'})},
                timestamp: 3
            };
    
        
        historyManager.recordOperation(mockOperation);
    
        
        const [undoStack, redoStack] = (historyManager as typeof HistoryManager).stacksReadOnly();
        expect(undoStack.length).toBe(1);
        expect(undoStack[0]).toStrictEqual([
            {
              "type": "replace",
              "initialPosition": {
                "targetParentId": "",
                "nodeIndex": 0,
                "offset": 0
              },
              "finalPosition": {
                "targetParentId": "",
                "nodeIndex": 0,
                "offset": 0
              },
              "parentNodeId": "",
              "targetNodeId": "",
              "nodeIndex": 0,
              "payload": {
                "oldNode": {
                  "NodeName": "defaultName",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Guid": "A134",
                  "Depth": 0,
                  "TextContent": null,
                  "Children": []
                },
                "newNode": {
                  "NodeName": "defaultName",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Guid": "B123",
                  "Depth": 0,
                  "TextContent": null,
                  "Children": []
                }
              },
              "timestamp": 3
            }
          ]);
        expect(redoStack.length).toBe(0);
      });
  
    it('clears stacks', () => {
      
        
        const mockOperation: AstOperation<'replace'> = 
            { 
                type: 'replace', 
                initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
                finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
                parentNodeId: '',
                targetNodeId: '',
                nodeIndex: 0,
                payload: { oldNode: toMockAst({ Guid: 'A134'}), newNode: toMockAst({ Guid: 'B123'})},
                timestamp: 3
            };
    
        
        historyManager.recordOperation(mockOperation);
      
        historyManager.clear();

        
        const [undoStack, redoStack] = (historyManager as typeof HistoryManager).stacksReadOnly();
        expect(undoStack.length).toBe(0);
        expect(redoStack.length).toBe(0);
    });
  
    it('undoes an operation', () => {
      

      const mockOperation: AstOperation<'replace'> = 
      { 
          type: 'replace', 
          initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
          finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
          parentNodeId: '',
          targetNodeId: '',
          nodeIndex: 0,
          payload: { oldNode: toMockAst({ NodeName: 'Text', Guid: 'B123'}), newNode: toMockAst({ NodeName: 'Text', Guid: 'D123'})},
          timestamp: 3,
          rootChildId: 'R123'
      };

        
        historyManager.recordOperation(mockOperation);
        
        const res = historyManager.undo(toMockAst({
            NodeName: 'ParagraphBlock',
            Guid: 'C123',
            Children: [
                {
                    NodeName: 'Text',
                    Guid: 'D123'
                }
            ]
        }));
        expect(res).not.toBeNull();
        const [node, str] = res!;
        expect(node).toStrictEqual({
            NodeName: 'ParagraphBlock',
            Attributes: {},
            ChildIndex: 0,
            Guid: 'C123',
            Depth: 0,
            TextContent: null,
            Children: [
              {
                NodeName: 'Text',
                Attributes: {},
                ChildIndex: 0,
                Guid: 'B123',
                Depth: 0,
                TextContent: null,
                Children: []
              }
            ]
          });
        expect(str).toBe('R123');

        
        const [undoStack, redoStack] = (historyManager as typeof HistoryManager).stacksReadOnly();
        expect(undoStack.length).toBe(0);
        expect(redoStack.length).toBe(1);
    });
  
    it('redoes an operation', () => {

      const mockOperation: AstOperation<'replace'> = 
      { 
          type: 'replace', 
          initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
          finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
          parentNodeId: '',
          targetNodeId: '',
          nodeIndex: 0,
          payload: { oldNode: toMockAst({ NodeName: 'Text', Guid: 'B123'}), newNode: toMockAst({ NodeName: 'Text', Guid: 'D123'})},
          timestamp: 3,
          rootChildId: 'R123'
      };

        
        historyManager.recordOperation(mockOperation);
        
        const res = historyManager.undo(toMockAst({
            NodeName: 'ParagraphBlock',
            Guid: 'C123',
            Children: [
                {
                    NodeName: 'Text',
                    Guid: 'D123'
                }
            ]
        }));

        expect(res).not.toBeNull();

        const redoRes = historyManager.redo(res![0]);

      
        expect(redoRes).not.toBeNull();
        
        const [newAst, rootChildIds] = redoRes!;

        expect(newAst).toEqual({
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "C123",
            "Depth": 0,
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "B123",
                "Depth": 0,
                "TextContent": null,
                "Children": []
              }
            ]
          });
        expect(rootChildIds).toEqual("R123 ");

        
        const [undoStack, redoStack] = (historyManager as typeof HistoryManager).stacksReadOnly();
        expect(undoStack.length).toBe(1);
        expect(redoStack.length).toBe(0);
    });
  
    it('handles undo when undo stack is empty', () => {
      
      const res = historyManager.undo(toMockAst({
            NodeName: 'ParagraphBlock',
            Guid: 'C123',
            Children: [
                {
                    NodeName: 'Text',
                    Guid: 'D123'
                }
            ]
        }));
        expect(res).toBeNull();
    });
  
    it('handles redo when redo stack is empty', () => {
      
      const res = historyManager.redo(toMockAst({
            NodeName: 'ParagraphBlock',
            Guid: 'C123',
            Children: [
                {
                    NodeName: 'Text',
                    Guid: 'D123'
                }
            ]
        }));
        expect(res).toBeNull();
    });
  
    it('records and performs a transaction', () => {
      
      const mockOperations: [AstOperation<'replace'>, AstOperation<'insertBefore'>, AstOperation<'insertAfter'>] = [
        { 
            type: 'replace', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { oldNode: toMockAst({ NodeName: 'Text', Guid: 'B123'}), newNode: toMockAst({ NodeName: 'Text', Guid: 'D123'})},
            timestamp: 3,
            rootChildId: 'R123'
        },
        { 
            type: 'insertBefore', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'D123', newNode: toMockAst({ NodeName: 'Text', Guid: 'E123'})},
            timestamp: 3,
            rootChildId: 'R123'
        },
        { 
            type: 'insertAfter', 
            initialPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: '', nodeIndex: 0, offset: 0 },
            parentNodeId: '',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { siblingId: 'D123', newNode: toMockAst({ NodeName: 'Text', Guid: 'F123'})},
            timestamp: 3,
            rootChildId: 'R123'
        }
      ];
    
      
      historyManager.recordOperationsAsTransaction(mockOperations, historyManager);
    
      
      const [undoStack] = (historyManager as typeof HistoryManager).stacksReadOnly();
      expect(undoStack.length).toBe(1); 
      expect(undoStack[0].length).toBe(mockOperations.length);
    });
  
    it('restores cursor position after replace', () => {
        document.body.innerHTML = mockOutputHtml;
      
      const mockOperation: AstOperation<'replace'> = 
      { 
          type: 'replace', 
          initialPosition: { targetParentId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1', nodeIndex: 0, offset: 0 },
          finalPosition: { targetParentId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1', nodeIndex: 0, offset: 0 },
          parentNodeId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1',
          targetNodeId: '',
          nodeIndex: 0,
          payload: { oldNode: toMockAst({ NodeName: 'Text', Guid: 'B123'}), newNode: toMockAst({ NodeName: 'Text', Guid: 'D123'})},
          timestamp: 3,
          rootChildId: 'R123'
      };

        
        historyManager.recordOperation(mockOperation);

        historyManager.restoreCursorPosition();
    });

    it('restores cursor position after update', () => {
        document.body.innerHTML = mockOutputHtml;
        
        const mockOperation: AstOperation<'update'> = 
        { 
            type: 'update', 
            initialPosition: { targetParentId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1', nodeIndex: 0, offset: 0 },
            finalPosition: { targetParentId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1', nodeIndex: 0, offset: 0 },
            parentNodeId: 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1',
            targetNodeId: '',
            nodeIndex: 0,
            payload: { newTextContent: 'A123', newVersion: 'V2', offset: 2 },
            timestamp: 3,
            rootChildId: 'R123'
        };
  
          
          historyManager.recordOperation(mockOperation);
  
          historyManager.restoreCursorPosition();
      });
  
    
  });