function createLink(rule) {
    return `createElement("a", { href:'${rule.URL}' }, '${rule.LINKTEXT}')`;
}