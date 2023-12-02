import { vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import { AstNode } from './interface';
import ParagraphContainer from './paragraph-container'

afterEach(() => {
    cleanup();
  });
  
describe('ParagraphContainer', async () => {
    it('shows UtilityContainer on focus', async () => {
        const renderParagraph = vi.fn().mockReturnValue(<p>Test Paragraph</p>);
        const { container } = render(<ParagraphContainer renderParagraph={renderParagraph} paragraphId="B123456-123456" />);
    
        const sectionElement = container.querySelector('#section_B123456-123456');
        expect(sectionElement).not.toBe(null);
        await act(async () => {
            fireEvent.focus(sectionElement!);
        });
        const utilityContainer = sectionElement?.querySelector('.utility-container');
        expect(utilityContainer).not.toBe(null);
    
        await act(async () => {
            const del = await screen.findByTitle('Delete');
            expect(del).toBeTruthy();
            await userEvent.click(del);
        });
    
        await act(async () => {
          const cut = await screen.findByTitle('Cut');
          expect(cut).toBeTruthy();
          await userEvent.click(cut);
        });
    
        await act(async () => {
          const copy = await screen.findByTitle('Copy');
          expect(copy).toBeTruthy();
          await userEvent.click(copy);
        });
    
        await act(async () => {
          const paste = await screen.findByTitle('Paste');
          expect(paste).toBeTruthy();
          await userEvent.click(paste);
        });
    
        await act(async () => {
          if (sectionElement) 
            await fireEvent.blur(sectionElement);
        });
      });

      it('shows rendered paragraph', async () => {
        const renderParagraph = vi.fn().mockReturnValue(<p>Test Paragraph</p>);
        const { container } = render(<ParagraphContainer renderParagraph={renderParagraph} paragraphId="B123456-123456" />);
    
        const sectionElement = container.querySelector('#section_B123456-123456');
        expect(sectionElement).not.toBe(null);
        
        const matchingElements = screen.getAllByText((content) => content.includes('Test Paragraph'));
        expect(matchingElements.length).toBe(1);
      });
})