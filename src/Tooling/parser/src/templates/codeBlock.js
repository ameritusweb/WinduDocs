function createCodeBlock(rule) {

    var code = `createHighlightedElement("${rule.CODEBLOCK}", "${rule.LANGUAGE}")`;
    var pre = `createElement("pre", null, ${code})`;

    return `createElement("div", { "className": "mockup-code", ${pre} })`;
}