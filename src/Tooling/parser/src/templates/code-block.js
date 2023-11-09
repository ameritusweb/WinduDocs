function createCodeBlock(rule) {

    var code = `createHighlightedElement("${rule.CODEBLOCK}", "${rule.LANGUAGE}")`;
    var pre = `createElement("pre", null, ${code})`;

    return `createElement("div", { "class": "mockup-code", ${pre} })`;
}

WD.createCodeBlock = createCodeBlock;