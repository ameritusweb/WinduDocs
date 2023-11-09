function createTabsGroup(rule) {

    let childrenStrings = rule.children.map(createTab).join(", ");

    var tabsGroup = `createElement("div", { "class": "tabs" }, ${childrenStrings})`;

    var tabBody = createTabBody();

    var cardBody = `createElement("div", { "class": "card-body" }, ${tabsGroup}, ${tabBody})`;

    return `createElement("div", { "class": "card w-96 bg-base-100 shadow-xl" }, ${cardBody}`;
}

WD.createTabsGroup = createTabsGroup;