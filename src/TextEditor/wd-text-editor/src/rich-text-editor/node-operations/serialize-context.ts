import { AstContext } from "../../components/wysiwyg/interface";

const serializeContext = (context: AstContext | { [index: string]: boolean }): string => {

    const types = (context as AstContext).types.join("_");
    const names = Object.getOwnPropertyNames(context);
    const boolValues = names.map(n => (context as ({ [index: string]: boolean }))[n] ? '1' : 0).join('_');
    
    return `${types}_${boolValues}`;

}

export default serializeContext;