function createTableRowCell(rule) {
    return `createElement("td", null, "${escapeStringForJs(rule.ROWCELL)}")`;
}