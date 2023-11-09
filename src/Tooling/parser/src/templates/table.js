function createTable(rule) {
    
    var head = `createElement("thead", {}, ${createTableHeaderRow(rule.HEADERROW)})`;

    var body = `createElement("tbody", {}, ${createTableRow(rule)})`;

    var table = `createElement("table", { class: "table table-zebra" }, ${head}, ${body})`
    
    return `
    createElement("div", { class: "overflow-x-auto" }, ${table})
  `;
}

WD.createTable = createTable;