function createCard(rule) {

    var title = `createElement("h2", { "class": "card-title" }, "${escapeStringForJs(rule.CARDHEADER)}")`;

    var p = `createElement("p", null, "${escapeStringForJs(rule.CARDBODY)}")`;

    var cardBody = `createElement("div", { "class": "card-body" }, ${title}, ${p})`;

    return `createElement("div", { "class": "card w-96 bg-base-100 shadow-xl" }, ${cardBody}`;
}

WD.createCard = createCard;