// Helper function to convert kebab-case to camelCase
function kebabToCamelCase(string: string) {
    return string.replace(/(-\w)/g, (match) => match[1].toUpperCase());
  }
  
  export function parseSvgAst(ast: any): any {
    let isRoot = false;
    if (ast.type !== 'element') {
        if (ast.type === 'root') {
            ast = ast.children[0];
            isRoot = true;
        }
        else
        {
            return null;
        }
    }
  
    let props = {...ast.properties};
    props = Object.keys(props).reduce((newProps: any, key: string) => {
      // Convert kebab-case to camelCase for all attributes
      const camelKey = kebabToCamelCase(key);
      newProps[camelKey] = props[key];
      return newProps;
    }, {});
  
    // React doesn't use 'class' as an attribute name
    if (props.class) {
      props.className = props['class'];
      delete props['class'];
    }
  
    const children = (ast.children || []).map(parseSvgAst).filter(Boolean);
  
    const childrenStr = children.length ? children.join(", ") : 'null';

    const propsStr = JSON.stringify(props);
   
    if (isRoot)
    {
        return { "className": props.className, "name": kebabToCamelCase((props.className as string).split(' ')[1]), "element": `createElement('${ast.tagName}', ${propsStr}, ${childrenStr})` };
    }
    else
    {
    // Create the React element with the tagName, props, and children
        return `createElement('${ast.tagName}', ${propsStr}, ${childrenStr})`;
    }
  }