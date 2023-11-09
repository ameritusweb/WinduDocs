const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

export const convertJSX = (relativePath: string) => {
    const filePath = path.join(__dirname, relativePath);
  const jsxCode = fs.readFileSync(filePath, 'utf8');
  
  const transformed = babel.transformSync(jsxCode, {
    plugins: [
      ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }]
    ],
  });

  return transformed.code;
}
