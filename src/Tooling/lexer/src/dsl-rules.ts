import { DSLRule } from './interfaces';

// Your DSL rules
export const dslRules: DSLRule[] = [ 
    {
        "Name": "Header",
        "StartsWith": "^(?=#{1,6} )", // Lookahead to ensure space follows hash signs
        "EndsWith": "(?=\n|$)",       // Lookahead for newline or end of string
        "TokenRules": [
            {
                "Name": "HeaderLevel",
                "Pattern": "^(#)(#{1,5})",           // This will match a sequence of '#' at the start of the line
                "CountOccurrences": 1,    // This is a special property to indicate that we want to count the occurrences of the matched pattern
                "IsRequired": true
              }
        ],
        "Content": {
            "StartDelimiter": "[ ]",
            "EndDelimiter": "",
          "ContentType": "Header"
        }
      },      
      {
        "Name": "BoldItalic",
        "StartsWith": "\\*\\*\\*", // BoldItalic starts with '***'
        "EndsWith": "\\*\\*\\*",   // BoldItalic ends with '***'
        "TokenRules": [],
        "Content": {
          "ContentType": "BoldItalic"
        }
      },
      {
        "Name": "Bold",
        "StartsWith": "(?<!\\*)\\*\\*(?!\\*)", // Bold starts with '**' not preceded or followed by another '*'
        "EndsWith": "(?<!\\*)\\*\\*(?!\\*)",   // Bold ends with '**' not preceded or followed by another '*'
        "TokenRules": [],
        "Content": {
          "ContentType": "Bold"
        }
      },      
      {
        "Name": "Italic",
        "StartsWith": "\\*",  // Italic starts with '*'
        "EndsWith": "\\*",    // Italic ends with '*'
        "TokenRules": [],
        "Content": {
          "ContentType": "Italic"
        }
      },
      {
        "Name": "Link",
        "StartsWith": "\\[", // Link starts with '['
        "EndsWith": "\\)",   // Link ends with ')'
        "TokenRules": [
            {
                "Name": "LinkText",
                "Pattern": "([^\\]]+)", // Captures text within brackets without including them
                "IsRequired": true
              },
              {
                "Name": "Url",
                "Pattern": "(?<=\\]\\()[^\\)]+", // Captures URL within parentheses without including them
                "IsRequired": true
              }
        ]
      },      
      {
        "Name": "CustomAlert",
        "StartsWith": "!!!",
        "EndsWith": "\n",
        "TokenRules": [
          {
            "Name": "AlertType",
            "Pattern": "(info|warning|error)",
            "IsRequired": true
          },
          {
            "Name": "Title",
            "Pattern": "(?<=\")[^\"]+(?=\")",
            "IsRequired": false
          },
          {
            "Name": "Modifiers",
            "Pattern": "--[a-z]+",
            "IsRequired": false,
            "AllowMultiple": true
          }
        ]
      },
      {
        "Name": "Table",
        "StartsWith": "^\\|(?=([^\\n\\|]*\\|)+[\\w-\\s]*\\n[\\s]*\\|(:?-+:?\\|)+\\n)", // A table starts with a pipe symbol at the beginning of a line
        "EndsWith": "\\n(?=\\n|$)", // A table ends with a newline followed by either another newline or the end of the input
        "IsTokenizable": false,
        "TokenRules": [
          {
            "Name": "StripedModifier",
            "Pattern": "--striped(?=\\n)", // Captures the --striped modifier following the header delimiter row
            "IsRequired": false
          },
          {
              "Name": "InlineXLSJSXModifier",
              "Pattern": "--with-xls-jsx", // Modifier to indicate a table or tree view supports XLS-JSX
              "IsRequired": false
          },
        ],
        "Content": {
          "ContentType": "TableContent",
          "StartDelimiter": "", // No specific start delimiter needed for table content
          "EndDelimiter": "",   // No specific end delimiter needed for table content
          "DslRules": [
            {
              "Name": "HeaderRow",
              "StartsWith": "(?=([\\w-\\s]+(\\|))+[^\\|]+\\|(:?-+:?\\|)+\\n)", // Header row starts with a pipe
              "EndsWith": "(?<=\\|(:?-+:?\\|)+)\\n",    // Header row ends with a newline
              "ExcludeEnding": true,
              "TokenRules": [
                {
                  "Name": "HeaderCell",
                  "Pattern": "([^\\|\\n]+)\\|", // Captures the content of each header cell
                  "MatchCaptureGroup": 1,
                  "IsRequired": true,
                  "AllowMultiple": true
                }
              ]
            },
            {
              "Name": "Row",
              "StartsWith": "^\\|", // Row starts with a pipe
              "EndsWith": "\\n",    // Row ends with a newline
              "TokenRules": [
                {
                  "Name": "RowCell",
                  "Pattern": "([^\\|\\n]+)\\|", // Captures the content of each row cell
                  "MatchCaptureGroup": 1,
                  "IsRequired": true,
                  "AllowMultiple": true
                }
              ]
            }
          ]
        }
      },           
      {
        "Name": "TabsGroup",
        "StartsWith": "=== tabs",
        "EndsWith": "\\n(===(?! tab)\\n|$)", // Ends before '===' followed by newline or end of input
        "TokenRules": [
          {
            "Name": "TabsGroupTitle",
            "Pattern": "(?<=\")[^\"]+(?=\")", // Captures the title of the tabs group
            "IsRequired": false
          }
        ],
        "Content": {
            "StartDelimiter": "\n",
            "EndDelimiter": "",
            "ContentType": "TabsGroupContent",
            "DslRules": [
                {
                    "Name": "Tab",
                    "StartsWith": "=== tab",
                    "EndsWith": "\\n(?=\\s*=== (tab\\n|tab\\s|\\n)|$)", // Ends before '===' followed by newline or end of input
                    "TokenRules": [
                      {
                        "Name": "TabTitle",
                        "Pattern": "(?<=\")[^\"]+(?=\")", // Captures the title of the individual tab
                        "IsRequired": true
                      }
                    ],
                    "Content": {
                      "StartDelimiter": "\\n",
                      "EndDelimiter": "\\n(?=\\s*===($|\\s|\\s*tab\\s*\"))", // Ends before '===' followed by newline or end of input
                      "ContentType": "TabContent"
                    }
                  }
            ]
        }
      },
      {
        "Name": "Icon",
        "StartsWith": "--(?=(feather|hero))", // Starts with -- and a positive lookahead for 'feather' or 'hero'
        "EndsWith": "(?=\\s|$)", // Ends with whitespace or end of the line
        "TokenRules": [
          {
            "Name": "IconLibrary",
            "Pattern": "(feather|hero)", // Captures the icon library (feather or hero)
            "IsRequired": true
          },
          {
            "Name": "IconColor",
            "Pattern": "-([a-z]+-[0-9]{3})", // Captures the tailwind color class (e.g., blue-500)
            "Substring": 1,
            "IsRequired": true
          },
          {
            "Name": "IconSize",
            "Pattern": "-([1-9]|1[0-9]|20)", // Captures the icon size (1 to 20 representing 1rem to 20rem)
            "Substring": 1,
            "IsRequired": true
          },
          {
            "Name": "IconName",
            "Pattern": "-([a-z-]+)", // Captures the icon name using kebab-case
            "Substring": 1,
            "IsRequired": true
          }
        ]
      },
      {
        "Name": "ToggleButton",
        "StartsWith": "--(?=(toggle-))",
        "EndsWith": "$",
        "TokenRules": [
          {
            "Name": "ToggleType",
            "Pattern": "(?<=(toggle-))([a-zA-Z0-9-]+)",
            "IsRequired": true
          },
          {
            "Name": "ToggleTarget",
            "Pattern": "\"([^\"]+)\"",
            "MatchCaptureGroup": 1,
            "IsRequired": true
          }
        ]
      },
      {
        "Name": "Modal",
        "StartsWith": "=== modal",
        "EndsWith": "\n[\\s]*===",
        "TokenRules": [
            {
                "Name": "ModalType",
                "Pattern": "(-[a-z|A-Z|0-9|-]+)[\\s]*\n",
                "MatchCaptureGroup": 1,
                "IsRequired": true
              }
        ],
        "Content": {
          "StartDelimiter": "\n",
          "EndDelimiter": "",
          "ContentType": "ModalContent"
        }
      },
      {
        "Name": "Card",
        "StartsWith": "^=== card",
        "EndsWith": "\\n[\\s]*===(?! (body|header))",
        "TokenRules": [],
        "Content": {
          "StartDelimiter": "\n",
          "EndDelimiter": "",
          "ContentType": "CardContent",
          "DslRules": [
            {
              "Name": "CardHeader",
              "StartsWith": "=== header[\\s]*\\n",
              "EndsWith": "\\n[\\s]*(?=(=== body))",
              "TokenRules": [],
              "Content": {
                "StartDelimiter": "\\n",
                "EndDelimiter": "\\n===",
                "ContentType": "CardHeaderContent",
                "DslRules": [] // Nested DSL rules for content within the header can be added here if needed
              }
            },
            {
              "Name": "CardBody",
              "StartsWith": "=== body[\\s]*\\n",
              "EndsWith": "",
              "TokenRules": [],
              "Content": {
                "StartDelimiter": "",
                "EndDelimiter": "\\n===",
                "ContentType": "CardBodyContent",
                "DslRules": [] // Nested DSL rules for content within the body can be added here if needed
              }
            }
          ]
        }
      },
      {
        "Name": "TreeView",
        "StartsWith": "^=== tree-view\\n",
        "EndsWith": "\\n[\\s]*===",
        "TokenRules": [
            {
                "Name": "InlineXLSJSXModifier",
                "Pattern": "--with-xls-jsx", // Modifier to indicate a table or tree view supports XLS-JSX
                "IsRequired": false
            }
        ],
        "Content": {
          "StartDelimiter": "",
          "EndDelimiter": "",
          "ContentType": "TreeViewContent",
          "DslRules": [
            {
              "Name": "TreeNode",
              "StartsWith": "", // The TreeNode does not have a specific start pattern, it's a continuation of the tree
              "EndsWith": "\\n",   // The TreeNode does not have a specific end pattern, it's determined by the next node or end of tree
              "TokenRules": [
                {
                  "Name": "Indentation",
                  "Pattern": "([│|├|└]+)",
                  "CountOccurrences": 1,
                  "IsRequired": true
                },
                {
                  "Name": "TreeNodeContent",
                  "Pattern": "──[\\s]+([^#\\n]+)", // Captures the content of the tree node excluding the hash and newlines
                  "MatchCaptureGroup": 1,
                  "Trim": true,
                  "IsRequired": true
                },
                {
                  "Name": "Tooltip",
                  "Pattern": "#[\\s](.*)$", // Captures the tooltip content after the hash
                  "MatchCaptureGroup": 1,
                  "IsRequired": false
                }
              ]
            }
          ]
        }
      },
      {
        "Name": "ExcelFormula",
        "StartsWith": "{=",
        "EndsWith": "}",
        "TokenRules": [
          {
            "Name": "FormulaType",
            "Pattern": "(IF)",
            "IsRequired": true
          },
          {
            "Name": "Condition",
            "Pattern": "\\(([A-Z]+[0-9]+\\s*>\\s*[0-9]+)\\,",
            "MatchCaptureGroup": 1,
            "IsRequired": true
          },
          {
            "Name": "TrueValue",
            "Pattern": "\\s*\"([^\"]+)\"[\\s]*\\,",
            "MatchCaptureGroup": 1,
            "IsRequired": true
          },
          {
            "Name": "FalseValue",
            "Pattern": "\\s*\"([^\"]+)\"[\\s]*\\)",
            "MatchCaptureGroup": 1,
            "IsRequired": true
          }
        ]
      },
      {
        "Name": "SumRange",
        "StartsWith": "\\{", // SumRange starts with '{'
        "EndsWith": "\\}",   // SumRange ends with '}'
        "TokenRules": [
          {
            "Name": "CellReferenceStart",
            "Pattern": "[A-Z]+\\d+(?=\\:)", // Matches the starting cell reference of a range
            "IsRequired": true
          },
          {
            "Name": "CellReferenceEnd",
            "Pattern": "(?<=\\:)[A-Z]+\\d+", // Matches the ending cell reference of a range
            "IsRequired": true
          }
        ]
      },
      {
        "Name": "Chart",
        "StartsWith": "--chart-(?=(simple-(bar|pie|line)))", // Matches the chart type at the beginning
        "EndsWith": "$", // Assumes chart definitions are on a single line
        "TokenRules": [
          {
            "Name": "ChartType",
            "Pattern": "simple-(bar|pie|line)",
            "IsRequired": true
          },
          {
            "Name": "DataSource",
            "Pattern": '--data-source "(\\{[A-Z][0-9]+:[A-Z][0-9]+\\})"',
            "MatchCaptureGroup": 1,
            "IsTokenizable": true,
            "IsRequired": true
          },
          {
            "Name": "Title",
            "Pattern": '--title "([^"]+)"',
            "MatchCaptureGroup": 1,
            "IsRequired": false
          },
          {
            "Name": "Subtitle",
            "Pattern": '--subtitle "([^"]+)"',
            "MatchCaptureGroup": 1,
            "IsRequired": false
          },
          {
            "Name": "Reference",
            "Pattern": '--reference "([^"]+)"',
            "MatchCaptureGroup": 1,
            "IsRequired": false
          }
        ]
      },
      {
          "Name": "CodeBlock",
          "StartsWith": "^```\\s*", // Matches the start of a code block with an optional language identifier
          "EndsWith": "\\n[\\s]*(```\\n|$)",            // Matches the end of a code block
          "TokenRules": [
            {
              "Name": "Language",
              "Pattern": "[\\s]*(\\w+)", // Matches the language identifier
              "MatchCaptureGroup": 1,
              "IsRequired": false
            }
          ],
          "Content": {
            "ContentType": "CodeContent",
            "StartDelimiter": "\\n",          // The content starts after the newline following the opening backticks
            "EndDelimiter": "(?=\\n?```)", // The content ends at the newline preceding the closing backticks
            // No nested DSL rules needed as syntax highlighting is handled by ColorCode library
            "DslRules": []
          }
      }  
];
