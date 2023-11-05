function createBoldItalic(rule) {
    var italic = createItalic({ 'ITALIC': rule.BOLDITALIC });
    return `createElement("b", null, ${italic})`;
}