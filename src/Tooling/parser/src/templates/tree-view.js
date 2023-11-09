function createTreeView(rule) {

    var childContainer = null;

    if (rule.children)
    {
        let childrenStrings = rule.children.map(createTreeNode).join(", ");

        childContainer = `createElement("ul", { "class": "list-none m-0 p-0" }, ${childrenStrings})`;
    }

    var container = `createElement("div", { "class": "tree-container min-h-[20px] p-[19px] pl-[0px] mb-[20px] bg-[#fbfbfb] border border-[#999] rounded-[4px] shadow-inner text-left" }, ${childContainer})`;

    return `createElement("div", { "class": "border border-gray-200 rounded w-full max-w-[63rem] bg-white px-4 relative", ${container} })`;
}

WD.createTreeView = createTreeView;