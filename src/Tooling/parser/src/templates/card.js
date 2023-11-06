function createCard(rule) {

    var title = `createElement("h2", { "className": "card-title" }, "${escapeStringForJs(rule.CARDHEADER)}")`;

    var p = `createElement("p", null, "${escapeStringForJs(rule.CARDBODY)}")`;

    var cardBody = `createElement("div", { "className": "card-body" }, ${title}, ${p})`;

    return `createElement("div", { "className": "card w-96 bg-base-100 shadow-xl" }, ${cardBody}`;
}