function createTableRow(rule) {

    var childrenStr = rule.children.map(createTableRowCell()).join(", ");

    return `createElement("tr", null, "${childrenStr}")`;
}