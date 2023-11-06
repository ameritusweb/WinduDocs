import { MarkdownLexer } from '../src/markdown-lexer'
import { dslRules } from '../src/dsl-rules'
import { cleanupOutputDirectory, writeAllTokensToFile, writeTokensToFile } from '../src/file-utils';

beforeAll(() => {
    cleanupOutputDirectory();
});

afterAll(() => {
    writeAllTokensToFile();
});

describe('MarkdownLexer', () => {
    it('should tokenize a header', () => {
      const input = '##### Header 5';
      const lexer = new MarkdownLexer(input, dslRules);
      const tokens = lexer.tokenize();

      writeTokensToFile('header', tokens);

      expect(tokens).toEqual([
        { type: 'STARTHEADER', value: '' },
        { type: 'HEADERLEVEL', value: '5' },
        { type: 'HEADER', value: 'Header 5' },
        { type: 'ENDHEADER', value: ''}
      ]);
    });

    it('should tokenize bold text', () => {
        const input = 'This is **bold** text';
        const lexer = new MarkdownLexer(input, dslRules);
        const tokens = lexer.tokenize();

        writeTokensToFile('bold', tokens);

        expect(tokens).toEqual([
          { type: 'TEXT', value: 'This is ' },
          { type: 'STARTBOLD', value: '' },
          { type: 'BOLD', value: 'bold' },
          { type: 'ENDBOLD', value: '' },
          { type: 'TEXT', value: ' text' },
        ]);
      });
    
      it('should tokenize italic text', () => {
        const input = 'This is *italic* text';
        const lexer = new MarkdownLexer(input, dslRules);
        const tokens = lexer.tokenize();

        writeTokensToFile('italic', tokens);

        expect(tokens).toEqual([
          { type: 'TEXT', value: 'This is ' },
          { type: 'STARTITALIC', value: '' },
          { type: 'ITALIC', value: 'italic' },
          { type: 'ENDITALIC', value: '' },
          { type: 'TEXT', value: ' text' },
        ]);
      });
  
      it('should tokenize nested bold and italic text within bold text', () => {
          const input = '**This is ***bold and italic*** text**';
          const lexer = new MarkdownLexer(input, dslRules);
          const tokens = lexer.tokenize();

          writeTokensToFile('nested-bold-italic', tokens);

          expect(tokens).toEqual([
            { type: 'STARTBOLD', value: '' },
            { type: 'BOLD', value: 'This is ' },
            { type: 'BOLD_ITALIC', value: 'bold and italic' },
            { type: 'BOLD', value: ' text' },
            { type: 'ENDBOLD', value: '' },
          ]);
        });  
          // Test for links
          it('should tokenize a link', () => {
            const input = '[OpenAI](https://openai.com)';
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();

            writeTokensToFile('link', tokens);

            expect(tokens).toEqual([
              { type: 'STARTLINK', value: '' },
              { type: 'LINKTEXT', value: 'OpenAI' },
              { type: 'URL', value: 'https://openai.com' },
              { type: 'ENDLINK', value: '' },
            ]);
          });
        
          // Test for custom alerts
          it('should tokenize a custom alert', () => {
            const input = '!!! warning "Attention!" --strong --emphasis';
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();

            writeTokensToFile('custom-alert', tokens);

            expect(tokens).toEqual([
              { type: 'STARTCUSTOMALERT', value: '' },
              { type: 'TYPE', value: 'warning' },
              { type: 'TITLE', value: 'Attention!' },
              { type: 'MODIFIERS', value: '--strong' },
              { type: 'MODIFIERS', value: '--emphasis' },
              { type: 'ENDCUSTOMALERT', value: '' }
            ]);
          });
        
          // Test for a tabs group
          it('should tokenize a tabs group with two tabs', () => {
            const input = '=== tabs "Sample Tabs"\n=== tab "Tab 1"\nContent for tab 1\n=== tab "Tab 2"\nContent for tab 2\n===\n';
            const lexer = new MarkdownLexer(input, dslRules);
            const tokens = lexer.tokenize();

            writeTokensToFile('tabs', tokens);

            expect(tokens).toEqual([
              { type: 'STARTTABSGROUP', value: '' },
              { type: 'TABSGROUPTITLE', value: 'Sample Tabs' },
              { type: 'STARTTAB', value: '' },
              { type: 'TABTITLE', value: 'Tab 1' },
              { type: 'TAB', value: 'Content for tab 1' },
              { type: 'ENDTAB', value: '' },
              { type: 'STARTTAB', value: '' },
              { type: 'TABTITLE', value: 'Tab 2' },
              { type: 'TAB', value: 'Content for tab 2' },
              { type: 'ENDTAB', value: '' },
              { type: 'ENDTABSGROUP', value: '' }
            ]);
          });
  
          it('should tokenize a table with headers and rows', () => {
              const input = `| Header 1 | Header 2 | Header 3 |
          |:--------:|:--------:|:--------:|
          | Data 1   | Data 2   | Data 3   |
          | Data 4   | Data 5   | Data 6   |`;
          
              const lexer = new MarkdownLexer(input, dslRules);
              const tokens = lexer.tokenize();
          

              writeTokensToFile('table', tokens);

              // Adjust the expected tokens based on your specific token structure
              expect(tokens).toEqual(expect.arrayContaining([
                expect.objectContaining({ type: 'STARTTABLE', value: '' }),
                expect.objectContaining({ type: 'STARTHEADERROW', value: expect.any(String) }),
                expect.objectContaining({ type: 'HEADERCELL', value: expect.any(String) }),
                expect.objectContaining({ type: 'ENDHEADERROW', value: expect.any(String) }),
                expect.objectContaining({ type: 'ROWCELL', value: expect.any(String) }),
                expect.objectContaining({ type: 'ENDTABLE', value: '' })
              ]));
            });
          
            it('should recognize the --striped modifier for tables', () => {
              const input = `| Header 1 | Header 2 | Header 3 | --striped
          |:--------:|:--------:|:--------:|
          | Data 1   | Data 2   | Data 3   |
          | Data 4   | Data 5   | Data 6   |`;
          
              const lexer = new MarkdownLexer(input, dslRules);
              const tokens = lexer.tokenize();
          

              writeTokensToFile('table-striped', tokens);

              // Adjust the expected tokens based on your specific token structure
              expect(tokens).toEqual(expect.arrayContaining([
                expect.objectContaining({ type: 'STARTTABLE', value: '' }),
                expect.objectContaining({ type: 'STRIPEDMODIFIER', value: '--striped' }),
                expect.objectContaining({ type: 'STARTHEADERROW', value: expect.any(String) }),
                expect.objectContaining({ type: 'HEADERCELL', value: expect.any(String) }),
                expect.objectContaining({ type: 'ROWCELL', value: expect.any(String) }),
                expect.objectContaining({ type: 'ENDTABLE', value: '' })
              ]));
            });
          
            it('should tokenize feather icons with color and size', () => {
              const input = '--feather-alert-circle-blue-500-1';
          
              const lexer = new MarkdownLexer(input, dslRules);
              const tokens = lexer.tokenize();
          
              writeTokensToFile('feather-icon', tokens);

              // Define the expected tokens without considering the order
              const expectedTokens = [
                  expect.objectContaining({
                  type: 'ICONLIBRARY',
                  value: 'feather',
                  }),
                  expect.objectContaining({
                  type: 'ICONNAME',
                  value: 'alert-circle',
                  }),
                  expect.objectContaining({
                  type: 'ICONCOLOR',
                  value: 'blue-500',
                  }),
                  expect.objectContaining({
                  type: 'ICONSIZE',
                  value: '1',
                  }),
              ];
  
              // The test will pass if all objects in expectedTokens are found in received, regardless of order
              expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
            });
          
            it('should tokenize hero icons with color and size', () => {
              const input = '--hero-academic-cap-green-600-2';
          
              const lexer = new MarkdownLexer(input, dslRules);
              const tokens = lexer.tokenize();
          
              writeTokensToFile('hero-icon', tokens);

              // Define the expected tokens without considering the order
              const expectedTokens = [
                  expect.objectContaining({
                  type: 'ICONLIBRARY',
                  value: 'hero',
                  }),
                  expect.objectContaining({
                  type: 'ICONNAME',
                  value: 'academic-cap',
                  }),
                  expect.objectContaining({
                  type: 'ICONCOLOR',
                  value: 'green-600',
                  }),
                  expect.objectContaining({
                  type: 'ICONSIZE',
                  value: '2',
                  }),
              ];
  
              // The test will pass if all objects in expectedTokens are found in received, regardless of order
              expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
            });
  
            it('should tokenize a card with header and body', () => {
                const input = `=== card
=== header
This is my card header.
=== body
This is my card body.
===`;
                const lexer = new MarkdownLexer(input, dslRules); // Assuming the dslRules include the card definition with nested header and body
                const tokens = lexer.tokenize();
              

                writeTokensToFile('card', tokens);

                expect(tokens).toEqual([
                  expect.objectContaining({ type: 'STARTCARD', value: '' }),
                  expect.objectContaining({ type: 'STARTCARDHEADER', value: '' }),
                  expect.objectContaining({ type: 'CARDHEADER', value: 'This is my card header.' }),
                  expect.objectContaining({ type: 'ENDCARDHEADER', value: '' }),
                  expect.objectContaining({ type: 'STARTCARDBODY', value: '' }),
                  expect.objectContaining({ type: 'CARDBODY', value: 'This is my card body.' }),
                  expect.objectContaining({ type: 'ENDCARDBODY', value: '' }),
                  expect.objectContaining({ type: 'ENDCARD', value: '' })
                ]);
              });         
              
              it('should tokenize a toggle button', () => {
                const input = '--toggle-details-modal "Toggle Details"';
                const lexer = new MarkdownLexer(input, dslRules); // Assuming the dslRules include the toggle button definition
                const tokens = lexer.tokenize();
              

                writeTokensToFile('toggle-button', tokens);

                expect(tokens).toEqual([
                  expect.objectContaining({ type: 'STARTTOGGLEBUTTON', value: '' }),
                  expect.objectContaining({ type: 'TOGGLETYPE', value: 'details-modal' }),
                  expect.objectContaining({ type: 'TOGGLETARGET', value: 'Toggle Details' }),
                  expect.objectContaining({ type: 'ENDTOGGLEBUTTON', value: '' })
                ]);
              });

              it('Tokenizes simple bar chart', () => {
                const input = '--chart-simple-bar --data-source "{A1:B10}" --title "Sales Data" --subtitle "2023" --reference "Ref1"';
                const lexer = new MarkdownLexer(input, dslRules);
                const tokens = lexer.tokenize();
            
                writeTokensToFile('bar-chart', tokens);

                expect(tokens).toEqual([
                  { type: 'STARTCHART', value: ''},
                  { type: 'CHARTTYPE', value: 'simple-bar' },
                  { type: 'STARTSUMRANGE', value: '' },
                  { type: 'CELLREFERENCESTART', value: 'A1' },
                  { type: 'CELLREFERENCEEND', value: 'B10' },
                  { type: 'ENDSUMRANGE', value: '' },
                  { type: 'TITLE', value: 'Sales Data' },
                  { type: 'SUBTITLE', value: '2023' },
                  { type: 'REFERENCE', value: 'Ref1' },
                  { type: 'ENDCHART', value: ''}
                ]);
              });
            
              it('Tokenizes simple pie chart without optional modifiers', () => {
                const input = '--chart-simple-pie --data-source "{C1:D9}"';
                const lexer = new MarkdownLexer(input, dslRules);
                const tokens = lexer.tokenize();
            

                writeTokensToFile('pie-chart', tokens);

                expect(tokens).toEqual([
                  { type: 'STARTCHART', value: ''},
                  { type: 'CHARTTYPE', value: 'simple-pie' },
                  { type: 'STARTSUMRANGE', value: '' },
                  { type: 'CELLREFERENCESTART', value: 'C1' },
                  { type: 'CELLREFERENCEEND', value: 'D9' },
                  { type: 'ENDSUMRANGE', value: '' },
                  { type: 'ENDCHART', value: ''}
                ]);
              });

              it('should tokenize sum range expressions correctly', () => {
                const inputText = 'Total: {A1:A23}';
                const lexer = new MarkdownLexer(inputText, dslRules.filter(rule => rule.Name === 'SumRange'));
                const tokens = lexer.tokenize();
              
                const expectedTokens = [
                  { type: 'TEXT', value: 'Total: '},
                  { type: 'STARTSUMRANGE', value: '' },
                  { type: 'CELLREFERENCESTART', value: 'A1' },
                  { type: 'CELLREFERENCEEND', value: 'A23' },
                  { type: 'ENDSUMRANGE', value: '' }
                ];
              
                expect(tokens).toEqual(expectedTokens);
              });
    
                it('should tokenize an IF formula inside a table cell', () => {
                    const input = `{=IF(A1 > 10, "--bg-green-500", "--bg-red-500")}`;
                    const lexer = new MarkdownLexer(input, dslRules);
                    const tokens = lexer.tokenize();
                
                    expect(tokens).toEqual([
                        { type: 'STARTEXCELFORMULA', value: '' },
                        { type: 'FORMULATYPE', value: 'IF' }, // The 'IF' identifier
                        { type: 'CONDITION', value: 'A1 > 10' }, // The condition 'A1 > 10'
                        { type: 'TRUEVALUE', value: '--bg-green-500' }, // The true value '--bg-green-500'
                        { type: 'FALSEVALUE', value: '--bg-red-500' }, // The false value '--bg-red-500'
                        { type: 'ENDEXCELFORMULA', value: '' }
                    ]);
                });

                test('should tokenize a modal with detailed information', () => {
                    const input = `=== modal-details-modal
                Here is the **detailed information** that you can show or hide.
                ===
                `;
                
                    const lexer = new MarkdownLexer(input, dslRules); // Assuming the dslRules include the modal definition
                    const tokens = lexer.tokenize();
                

                    writeTokensToFile('modal', tokens);

                    expect(tokens).toEqual([
                        expect.objectContaining({ type: 'STARTMODAL', value: '' }),
                      expect.objectContaining({ type: 'MODAL', value: expect.stringContaining('Here') }),
                      expect.objectContaining({ type: 'BOLD', value: 'detailed information' }),
                      expect.objectContaining({ type: 'MODAL', value: expect.stringContaining('show or hide') }),
                      expect.objectContaining({ type: 'ENDMODAL', value: '' })
                    ]);
                  });

                  it('should tokenize a tree view correctly', () => {
                    // Sample input text following the tree view structure
                    const inputText = `=== tree-view
                │
                ├── src/
                │   ├── NodeServer/                # Node.js server related files
                │   │   ├── src/                   # Node.js source files
                │   │   ├── package.json           # Node.js project dependencies
                │   │   └── ...
                │   │
                │   └── ClientApp/                 # Frontend TypeScript/CSS/AJAX files
                │       └── ...
                │
                └── test/                          # Test files for backend and frontend
                └── LICENSE                        # License file
                ===`;
                
                    // Instantiate the lexer with the input text and the DSL rules for the tree view
                    const lexer = new MarkdownLexer(inputText, dslRules);
                
                    // Perform tokenization
                    const tokens = lexer.tokenize();
                

                    writeTokensToFile('tree-view', tokens);

                    // Define expected tokens
                    const expectedTokens = [
                      { type: 'STARTTREEVIEW', value: '' }, // The opening token for tree view
                      { type: 'TREENODECONTENT', value: 'src/' },
                      { type: 'TREENODECONTENT', value: 'NodeServer/' },
                      { type: 'TOOLTIP', value: 'Node.js server related files' },
                      { type: 'ENDTREEVIEW', value: '' } // The closing token for tree view
                    ];
                
                    // Check if the tokens produced by the lexer match the expected tokens
                    expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
                  });

                  it('should tokenize a code block with language specifier', () => {
                    const input = "```javascript\nconsole.log('Hello, world!');\n```";
                    // Instantiate the lexer with the input text and the DSL rules for the tree view
                    const lexer = new MarkdownLexer(input, dslRules);
                
                    // Perform tokenization
                    const tokens = lexer.tokenize();
                

                    writeTokensToFile('code-block', tokens);
                    expect(tokens).toEqual([
                        expect.objectContaining({ type: 'STARTCODEBLOCK', value: '' }),
                      expect.objectContaining({ type: 'LANGUAGE', value: 'javascript' }),
                      expect.objectContaining({ type: 'CODEBLOCK', value: expect.stringContaining('console.log(\'Hello, world!\');') }),
                      expect.objectContaining({ type: 'ENDCODEBLOCK', value: '' })
                    ]);
                  });
  });