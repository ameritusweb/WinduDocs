import { DSLRule } from './interfaces';

// Your DSL rules
export const dslRules: DSLRule[] = [ 
    {
        "Name": "Header",
        "StartsWith": "^#{1,6}(?= )", // Lookahead to ensure space follows hash signs
        "EndsWith": "(?=\n|$)",       // Lookahead for newline or end of string
        "TokenRules": [],
        "Content": {
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
            "Name": "Type",
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
        "StartsWith": "^\\|", // A table starts with a pipe symbol at the beginning of a line
        "EndsWith": "\\n(?=\\n|$)", // A table ends with a newline followed by either another newline or the end of the input
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
            {
            "Name": "HeaderRow",
            "Pattern": "^\\s*([^\\n\\|]+[ ]*\\|)+([^\\|]+\\|)((:?-+:?\\s*\\|)+)[ ]*\\n", // Captures the header row followed by the header delimiter row
            "TrimS": true,
            "IsRequired": true
          },
          {
            "Name": "Row",
            "Pattern": "^\\s*\\|*([^\\n\\|]+[ ]*\\|)+([^\\|]*)|$", // Captures a single table row
            "Trim": true,
            "IsRequired": false,
            "AllowMultiple": true
          }
        ],
        "Content": {
          "ContentType": "TableContent",
          "DslRules": [
            {
              "Name": "TableCell",
              "StartsWith": "(?<=\\|)", // Cell content starts after a pipe
              "EndsWith": "(?=\\|)",    // Cell content ends before a pipe
              "TokenRules": [
                {
                  "Name": "CellContent",
                  "Pattern": "[^\\|]+", // Captures the content of a single cell
                  "IsRequired": true
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
        "EndsWith": "\n===",
        "TokenRules": [
            {
                "Name": "ModalType",
                "Pattern": "(-[a-zA-Z0-9-]+)",
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
                  "Pattern": "^(│   )*",
                  "CaptureGroup": "indentation",
                  "Transform": "countMatches", // Custom property that indicates a transformation to count matches of the capture group
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
      }
];