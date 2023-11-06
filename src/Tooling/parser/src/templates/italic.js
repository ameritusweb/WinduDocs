function createItalic(rule) {
    return `createElement("i", null, "${escapeStringForJs(rule.ITALIC)}")`;
}