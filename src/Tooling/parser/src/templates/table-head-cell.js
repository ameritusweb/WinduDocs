function createTableHeadCell(rule) {
    return `createElement("th", null, "${escapeStringForJs(rule.HEADERCELL)}")`;
}