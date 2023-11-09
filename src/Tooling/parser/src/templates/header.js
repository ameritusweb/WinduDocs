function createHeader(rule) {
    return `createElement("h${rule.HEADERLEVEL}", null, "${rule.HEADER}")`;
}

WD.createHeader = createHeader;