export type TrimOptions = {
    startString?: string;
    endString?: string;
    extractRegex?: RegExp;
    extraction?: string;
};

const trimSpecial = (input: string, options: TrimOptions): string => {
    
    if (options.extractRegex) {
        const match = input.match(options.extractRegex);
        if (match && match[0]) {
            options.extraction = match[0];
        }
    }

    
    if (options.startString && input.startsWith(options.startString)) {
        input = input.substring(options.startString.length);
    }

    
    if (options.endString && input.endsWith(options.endString)) {
        input = input.substring(0, input.length - options.endString.length);
    }

    return input;
}

export default trimSpecial;