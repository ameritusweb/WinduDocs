function createElement(tag, props, ...children) {
    let html = `<${tag}`;
    for (const [attr, value] of Object.entries(props || {})) {
      if (attr !== "children") {
        html += ` ${attr}="${value}"`;
      }
    }
    html += '>';
    children.forEach(child => {
      html += typeof child === "string" ? child : child.join('');
    });
    html += `</${tag}>`;
    return html;
  }

  WD.Element = createElement;