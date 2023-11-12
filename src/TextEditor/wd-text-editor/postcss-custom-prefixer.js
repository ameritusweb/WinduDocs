import { createFilter } from '@rollup/pluginutils';

export function prefixSelector(selector, prefix) {
    return selector.split(/\s+/g)
        .map(cls => cls.startsWith('.') ? `.${prefix} ${cls}` : cls)
        .join(' ');
}

// Default export as a function
export default (opts = {}) => {
    const prefix = opts.prefix || 'custom-';
    // Define include and exclude patterns
    const include = opts.include || '**/*.css';
    const exclude = opts.exclude || [];

    const filter = createFilter(include, exclude);

    return {
        postcssPlugin: 'postcss-tailwind-prefixer',
        Once(root, { result }) {
            root.walkRules(rule => {
                 // Check if the current file should be processed
                if (filter(rule.source.input.file)) {
                    rule.selector = prefixSelector(rule.selector, prefix);
                }
            });
        }
    }
}

export const postcss = true;
