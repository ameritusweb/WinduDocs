
        AST = {"TYPE":"root","children":[{"HEADERLEVEL":"5","children":[],"TYPE":"Header","HEADER":"Header 5"},{"TYPE":"Text","TEXT":"This is "},{"children":[],"TYPE":"Bold","BOLD":"bold"},{"TYPE":"Text","TEXT":" text"},{"TYPE":"Text","TEXT":"This is "},{"children":[],"TYPE":"Italic","ITALIC":"italic"},{"TYPE":"Text","TEXT":" text"},{"children":[{"children":[],"TYPE":"BoldItalic","BOLDITALIC":"bold and italic"},{"TYPE":"Text","TEXT":" text"}],"TYPE":"Bold","BOLD":"This is "},{"LINKTEXT":"OpenAI","URL":"https://openai.com","children":[],"TYPE":"Link"},{"TYPE":"CustomAlert","TITLE":"Attention!","MODIFIERS":["--strong","--emphasis"],"children":[]},{"TABSGROUPTITLE":"Sample Tabs","children":[{"TABTITLE":"Tab 1","children":[],"TYPE":"Tab","TAB":"Content for tab 1"},{"TABTITLE":"Tab 2","children":[],"TYPE":"Tab","TAB":"Content for tab 2"}],"TYPE":"TabsGroup"},{"STRIPEDMODIFIER":null,"INLINEXLSJSXMODIFIER":null,"children":[{"HEADERCELL":[" Header 1 "," Header 2 "," Header 3 "],"children":[],"TYPE":"HeaderRow"},{"ROWCELL":[" Data 1   "," Data 2   "," Data 3   "],"children":[],"TYPE":"Row"},{"ROWCELL":[" Data 4   "," Data 5   "," Data 6   "],"children":[],"TYPE":"Row"}],"TYPE":"Table"},{"STRIPEDMODIFIER":"--striped","INLINEXLSJSXMODIFIER":null,"children":[{"HEADERCELL":[" Header 1 "," Header 2 "," Header 3 "],"children":[],"TYPE":"HeaderRow"},{"ROWCELL":[" Data 1   "," Data 2   "," Data 3   "],"children":[],"TYPE":"Row"},{"ROWCELL":[" Data 4   "," Data 5   "," Data 6   "],"children":[],"TYPE":"Row"}],"TYPE":"Table"},{"ICONLIBRARY":"feather","ICONCOLOR":"blue-500","ICONSIZE":"1","ICONNAME":"alert-circle","children":[],"TYPE":"Icon"},{"ICONLIBRARY":"hero","ICONCOLOR":"green-600","ICONSIZE":"2","ICONNAME":"academic-cap","children":[],"TYPE":"Icon"},{"children":[{"children":[],"TYPE":"CardHeader","CARDHEADER":"This is my card header."},{"children":[],"TYPE":"CardBody","CARDBODY":"This is my card body."}],"TYPE":"Card"},{"TOGGLETYPE":"details-modal","TOGGLETARGET":"Toggle Details","children":[],"TYPE":"ToggleButton"},{"CHARTTYPE":"simple-bar","DATASOURCE":null,"TITLE":"Sales Data","SUBTITLE":"2023","REFERENCE":"Ref1","children":[{"CELLREFERENCESTART":"A1","CELLREFERENCEEND":"B10","children":[],"TYPE":"SumRange"}],"TYPE":"Chart"},{"CHARTTYPE":"simple-pie","DATASOURCE":null,"TITLE":null,"SUBTITLE":null,"REFERENCE":null,"children":[{"CELLREFERENCESTART":"C1","CELLREFERENCEEND":"D9","children":[],"TYPE":"SumRange"}],"TYPE":"Chart"},{"MODALTYPE":"-details-modal","children":[{"children":[],"TYPE":"Bold","BOLD":"detailed information"},{"TYPE":"Text","TEXT":" that you can show or hide."}],"TYPE":"Modal","MODAL":" \n                Here is the "},{"INLINEXLSJSXMODIFIER":null,"children":[{"INDENTATION":"1","TREENODECONTENT":null,"TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"1","TREENODECONTENT":"src/","TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"2","TREENODECONTENT":"NodeServer/","TOOLTIP":"Node.js server related files","children":[],"TYPE":"TreeNode"},{"INDENTATION":"3","TREENODECONTENT":"src/","TOOLTIP":"Node.js source files","children":[],"TYPE":"TreeNode"},{"INDENTATION":"3","TREENODECONTENT":"package.json","TOOLTIP":"Node.js project dependencies","children":[],"TYPE":"TreeNode"},{"INDENTATION":"3","TREENODECONTENT":"...","TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"2","TREENODECONTENT":null,"TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"2","TREENODECONTENT":"ClientApp/","TOOLTIP":"Frontend TypeScript/CSS/AJAX files","children":[],"TYPE":"TreeNode"},{"INDENTATION":"2","TREENODECONTENT":"...","TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"1","TREENODECONTENT":null,"TOOLTIP":null,"children":[],"TYPE":"TreeNode"},{"INDENTATION":"1","TREENODECONTENT":"test/","TOOLTIP":"Test files for backend and frontend","children":[],"TYPE":"TreeNode"},{"INDENTATION":"1","TREENODECONTENT":"LICENSE","TOOLTIP":"License file","children":[],"TYPE":"TreeNode"}],"TYPE":"TreeView"},{"LANGUAGE":"javascript","children":[],"TYPE":"CodeBlock","CODEBLOCK":"console.log('Hello, world!');"}]};

        WD = {};

        
            function createRoot(rule) {

    let childrenStrings = rule.children.map(WD[`create${rule.TYPE}`]).join(", ");

    return `createElement("div", { "class": "root" }, ${childrenStrings})`;
}

WD.createRoot = createRoot;
            
            function createBold(rule) {
    return `createElement("b", null, "${escapeStringForJs(rule.BOLD)}")`;
}

WD.createBold = createBold;
            
            function createItalic(rule) {
    return `createElement("i", null, "${escapeStringForJs(rule.ITALIC)}")`;
}

WD.createItalic = createItalic;
            
            function createCard(rule) {

    var title = `createElement("h2", { "class": "card-title" }, "${escapeStringForJs(rule.CARDHEADER)}")`;

    var p = `createElement("p", null, "${escapeStringForJs(rule.CARDBODY)}")`;

    var cardBody = `createElement("div", { "class": "card-body" }, ${title}, ${p})`;

    return `createElement("div", { "class": "card w-96 bg-base-100 shadow-xl" }, ${cardBody}`;
}

WD.createCard = createCard;
            
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
            
            function createTreeNode(rule) {

    var childContainer = null;

    if (rule.children)
    {
        let childrenStrings = rule.children.map(createTreeNode).join(", ");

        childContainer = `createElement("ul", { "class": "list-none m-0 p-0" }, ${childrenStrings})`;
    }

    var span = `createElement("span", { "class": "relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black" }, "${escapeStringForJs(rule.TREENODECONTENT)}")`;

    if (childContainer)
    {
        return `createElement("li", { "class": "relative pl-6", ${span}, ${childContainer} })`;
    }
    else
    {
        return `createElement("li", { "class": "relative pl-6", ${span} })`;
    }
}

WD.createTreeNode = createTreeNode;
            

        const o = createRoot(AST);

        modules.exports = o;
    