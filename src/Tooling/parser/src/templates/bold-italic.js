function createBoldItalic(rule) {
    var italic = createItalic({ 'ITALIC': escapeStringForJs(rule.BOLDITALIC) });
    return `createElement("b", null, ${italic})`;
}