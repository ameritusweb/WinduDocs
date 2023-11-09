function createTableHeaderRow(rule) {

    var childrenStr = rule.children.map(createTableHeadCell()).join(", ");

    return `createElement("tr", null, "${childrenStr}")`;
}

WD.createTableHeaderRow = createTableHeaderRow;