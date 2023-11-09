function createTabTitle(rule) {

    return `createElement("div", { "class": "tab tab-bordered" }, "${escapeStringForJs(rule.TABTITLE)}"`;
}

WD.createTabTitle = createTabTitle;