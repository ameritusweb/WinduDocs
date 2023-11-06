function createTable(rule) {
    
    var head = `createElement("thead", {}, ${createTableHeaderRow(rule.HEADERROW)})`;

    var body = `createElement("tbody", {}, ${createTableRow(rule)})`;

    var table = `createElement("table", { className: "table table-zebra" }, ${head}, ${body})`
    
    return `
    createElement("div", { className: "overflow-x-auto" }, ${table})
  `;
}