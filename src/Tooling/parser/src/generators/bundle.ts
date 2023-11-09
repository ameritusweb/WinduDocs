import mappings from '../mappings/function-mappings.json';
import ast from '../ast/wd-ast.json';
import { JsBundler } from './js-bundler';

export const bundle = () => {

    const bundler = new JsBundler(ast, mappings);
    const bundle = bundler.bundleJsFunctions();
    const file = `
        AST = ${ast};

        WD = {};

        ${bundle}

        const o = createRoot(AST);
    `;
    console.log(file);
}