import { DSLRule } from './interfaces'; // Assuming you have defined interfaces in a separate file

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
                    "EndsWith": "\\n(?=\\s*=== (tab\\n|\\n)|$)", // Ends before '===' followed by newline or end of input
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
      }      
];
