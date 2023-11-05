import { dslRules } from "./dsl-rules";
import { MarkdownLexer } from "./markdown-lexer";

console.log("Hello, TypeScript with Nodemon!!");
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
const aa = tokens;