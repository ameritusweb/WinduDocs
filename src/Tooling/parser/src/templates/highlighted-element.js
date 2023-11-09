function createHighlightedElement(codeBlock, language) {

    var code = getHighlightedCode(codeBlock, language);

    // Parse highlighted code with jsdom
  const dom = new JSDOM(`<!DOCTYPE html><body>${code}</body>`);
  const document = dom.window.document;

  // Function to recursively convert HTML nodes to createElement calls
  function convertNodeToCreateElement(node) {
    if (node.nodeType === dom.window.Node.TEXT_NODE) {
      // Text node, just return the text
      return JSON.stringify(node.textContent);
    } else if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
      // Element node, convert to createElement call
      const tagName = node.tagName.toLowerCase();
      const props = Array.from(node.attributes).reduce((props, attr) => {
        props[attr.name] = attr.value;
        return props;
      }, {});

      const children = Array.from(node.childNodes).map(convertNodeToCreateElement);
      return `createElement("${tagName}", ${JSON.stringify(props)}, ${children.join(', ')})`;
    }
    return '';
  }

  // Convert the body's first child (which should be the pre tag from highlight.js)
  const createElementCode = convertNodeToCreateElement(document.body.firstChild);

  return createElementCode;

}

WD.createHighlightedElement = createHighlightedElement;