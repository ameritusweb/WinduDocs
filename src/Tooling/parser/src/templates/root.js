function createRoot(rule) {

    let childrenStrings = rule.children.map(WD[`create${rule.TYPE}`]).join(", ");

    return `createElement("div", { "class": "root" }, ${childrenStrings})`;
}

WD.createRoot = createRoot;