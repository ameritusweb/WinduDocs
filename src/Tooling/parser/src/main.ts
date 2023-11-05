import hljs from 'highlight.js';

console.log("Hello, TypeScript with Nodemon!!");

const highlightedCode = hljs.highlight(
    '<span>Hello World!</span>',
    { language: 'javascript' }
  );

  