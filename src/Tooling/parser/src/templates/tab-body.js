function createTabBody(rule) {

    return `createElement("div", null, "${escapeStringForJs(rule.TAB)}"`;
}

WD.createTabBody = createTabBody;