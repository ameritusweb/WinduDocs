import { DSLRule } from './interfaces'; // Assuming you have defined interfaces in a separate file

// Your DSL rules
export const dslRules: DSLRule[] = [ 
    {
        "Name": "Header",
        "StartsWith": "^#{1,6}(?= )", // Lookahead to ensure space follows hash signs
        "EndsWith": "(?=\n|$)",       // Lookahead for newline or end of string
        "TokenRules": [
          {
            "Name": "HeaderText",
            "Pattern": "^#{1,6} (.+)", // Captures the text after '#' symbols and a space until the end of the line or string
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "",        // No additional content delimiter needed
          "EndDelimiter": "(?=\n|$)", // Lookahead for newline or end of string
          "ContentType": "Header"
        }
      },      
      {
        "Name": "BoldItalic",
        "StartsWith": "\\*\\*\\*", // BoldItalic starts with '***'
        "EndsWith": "\\*\\*\\*",   // BoldItalic ends with '***'
        "TokenRules": [
          {
            "Name": "BoldItalicText",
            "Pattern": "\\*\\*\\*(.*?)\\*\\*\\*", // Captures text within triple asterisks
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\\*\\*\\*",
          "EndDelimiter": "\\*\\*\\*",
          "ContentType": "BoldItalic"
        }
      },
      {
        "Name": "Bold",
        "StartsWith": "(?<!\\*)\\*\\*(?!\\*)", // Bold starts with '**' not preceded or followed by another '*'
        "EndsWith": "(?<!\\*)\\*\\*(?!\\*)",   // Bold ends with '**' not preceded or followed by another '*'
        "TokenRules": [
          {
            "Name": "BoldText",
            "Pattern": "(?<!\\*)\\*\\*(.*?)(?<!\\*)\\*\\*(?!\\*)", // Captures text within double asterisks not part of triple asterisks
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\\*\\*",
          "EndDelimiter": "\\*\\*",
          "ContentType": "Bold"
        }
      },      
      {
        "Name": "Italic",
        "StartsWith": "\\*",  // Italic starts with '*'
        "EndsWith": "\\*",    // Italic ends with '*'
        "TokenRules": [
          {
            "Name": "ItalicText",
            "Pattern": "\\*(.*?)\\*", // Captures text within single asterisks
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\\*",
          "EndDelimiter": "\\*",
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
            "Pattern": "\\[([^\\]]+)\\]", // Captures text within brackets
            "IsRequired": true
          },
          {
            "Name": "Url",
            "Pattern": "\\]\\((http[s]?:\\/\\/[^\\)]+)\\)", // Captures URL within parentheses
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\\[",
          "EndDelimiter": "\\)",
          "ContentType": "Link"
        }
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
            "Pattern": "\".*?\"",
            "IsRequired": false
          },
          {
            "Name": "Modifiers",
            "Pattern": "--[a-z]+",
            "IsRequired": false,
            "AllowMultiple": true
          }
        ],
        "Content": {
          "StartDelimiter": "    ",
          "EndDelimiter": "\n",
          "ContentType": "String"
        }
      },
    {
        "Name": "TabsGroup",
        "StartsWith": "=== tabs",
        "EndsWith": "\n(?=\\s*=== tabs|$)", // Ends with a newline followed by either '=== tabs' or end of input
        "TokenRules": [
          {
            "Name": "TabsGroupTitle",
            "Pattern": "=== tabs \"(.*?)\"", // Captures the title of the tabs group
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\n",
          "EndDelimiter": "\n(?=\\s*=== tabs|$)", // Ends with a newline followed by either '=== tabs' or end of input
          "ContentType": "TabsGroupContent"
        }
      },
      {
        "Name": "Tab",
        "StartsWith": "=== tab",
        "EndsWith": "\n(?=\\s*=== tab|$)", // Ends with a newline followed by either '=== tab' or end of input
        "TokenRules": [
          {
            "Name": "TabTitle",
            "Pattern": "=== tab \"(.*?)\"", // Captures the title of the individual tab
            "IsRequired": true
          }
        ],
        "Content": {
          "StartDelimiter": "\n",
          "EndDelimiter": "\n(?=\\s*=== tab|$)", // Ends with a newline followed by either '=== tab' or end of input
          "ContentType": "TabContent"
        }
      }
];
