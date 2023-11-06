function createTabTitle(rule) {

    return `createElement("div", { "className": "tab tab-bordered" }, "${escapeStringForJs(rule.TABTITLE)}"`;
}