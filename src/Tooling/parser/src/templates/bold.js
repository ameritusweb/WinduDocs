function createBold(rule) {
    return `createElement("b", null, "${escapeStringForJs(rule.BOLD)}")`;
}

WD.createBold = createBold;