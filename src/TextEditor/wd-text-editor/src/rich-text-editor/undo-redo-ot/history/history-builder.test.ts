import { vi } from "vitest";
import { IHistoryManagerRecorder } from "../../../components/wysiwyg/interface";
import { cleanup, toMockAst } from "../../../utils/test-utils";
import HistoryBuilder from "./history-builder";

describe('HistoryBuilder', () => {
    let historyBuilder: HistoryBuilder = {} as HistoryBuilder;

    const mockHistoryManager: IHistoryManagerRecorder = {
        recordChildReplace: vi.fn(),
        recordChildTextUpdate: vi.fn(),
        recordOperation: vi.fn(),
        recordOperationsAsTransaction: vi.fn(),
        recordChildInsertBefore: vi.fn(),
        recordChildInsertAfter: vi.fn(),
        recordChildRemoveBefore: vi.fn(),
        recordChildRemoveAfter: vi.fn(),
    };

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });
  
    beforeEach(() => {
      historyBuilder = new HistoryBuilder();
    });
  
    it('adds an insert before command', () => {
      const siblingNode = toMockAst({
        NodeName: 'Text', 
        Guid: 'sibling-id' 
      });
      const newNode = toMockAst({
        NodeName: 'Text',
        TextContent: 'SiblingText'
      });
  
      historyBuilder.addInsertBeforeCommand(siblingNode, newNode);

      historyBuilder.applyTo(mockHistoryManager);
  
      
      expect(historyBuilder.getCommands()).toContainEqual({
        type: 'insertBefore',
        siblingId: 'sibling-id',
        oldNode: null,
        newNode
      });
    });

    it('adds a remove before command', () => {
        const siblingNode = toMockAst({
          NodeName: 'Text', 
          Guid: 'sibling-id' 
        });
        const newNode = toMockAst({
          NodeName: 'Text',
          TextContent: 'SiblingText'
        });
    
        historyBuilder.addRemoveBeforeCommand(siblingNode, newNode);

        historyBuilder.applyTo(mockHistoryManager);
    
        
        expect(historyBuilder.getCommands()).toContainEqual({
          type: 'removeBefore',
          siblingId: 'sibling-id',
          oldNode: null,
          newNode
        });
      });

    it('adds an insert after command', () => {
        const siblingNode = toMockAst({
          NodeName: 'Text', 
          Guid: 'sibling-id' 
        });
        const newNode = toMockAst({
          NodeName: 'Text',
          TextContent: 'SiblingText'
        });
    
        historyBuilder.addInsertAfterCommand(siblingNode, newNode);

        historyBuilder.applyTo(mockHistoryManager);
    
        
        expect(historyBuilder.getCommands()).toContainEqual({
          type: 'insertAfter',
          siblingId: 'sibling-id',
          oldNode: null,
          newNode
        });
      });

      it('adds an remove after command', () => {
        const siblingNode = toMockAst({
          NodeName: 'Text', 
          Guid: 'sibling-id' 
        });
        const newNode = toMockAst({
          NodeName: 'Text',
          TextContent: 'SiblingText'
        });
    
        historyBuilder.addRemoveAfterCommand(siblingNode, newNode);

        historyBuilder.applyTo(mockHistoryManager);
    
        
        expect(historyBuilder.getCommands()).toContainEqual({
          type: 'removeAfter',
          siblingId: 'sibling-id',
          oldNode: null,
          newNode
        });
      });

      it('adds a replace command', () => {
        const oldNode = toMockAst({
          NodeName: 'Text', 
          Guid: 'old-id' 
        });
        const newNode = toMockAst({
          NodeName: 'Text',
          TextContent: 'NewText'
        });
    
        historyBuilder.addReplaceCommand(oldNode, newNode);

        historyBuilder.applyTo(mockHistoryManager);
    
        
        expect(historyBuilder.getCommands()).toContainEqual({
          type: 'replace',
          siblingId: null,
          oldNode,
          newNode
        });
      });
  });