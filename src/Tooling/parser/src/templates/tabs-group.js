function createTabsGroup(rule) {

    let childrenStrings = rule.children.map(createTab).join(", ");

    var tabsGroup = `createElement("div", { "className": "tabs" }, ${childrenStrings})`;

    var tabBody = createTabBody();

    var cardBody = `createElement("div", { "className": "card-body" }, ${tabsGroup}, ${tabBody})`;

    return `createElement("div", { "className": "card w-96 bg-base-100 shadow-xl" }, ${cardBody}`;
}