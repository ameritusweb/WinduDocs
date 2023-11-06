function createTreeNode(rule) {

    var childContainer = null;

    if (rule.children)
    {
        let childrenStrings = rule.children.map(createTreeNode).join(", ");

        childContainer = `createElement("ul", { "className": "list-none m-0 p-0" }, ${childrenStrings})`;
    }

    var span = `createElement("span", { "className": "relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black" }, "${escapeStringForJs(rule.TREENODECONTENT)}")`;

    if (childContainer)
    {
        return `createElement("li", { "className": "relative pl-6", ${span}, ${childContainer} })`;
    }
    else
    {
        return `createElement("li", { "className": "relative pl-6", ${span} })`;
    }
}