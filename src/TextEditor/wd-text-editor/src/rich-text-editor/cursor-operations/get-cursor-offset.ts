import { ITextBlock } from "../../components/wysiwyg/interface";

const getCursorOffset = (previousBlocks: ITextBlock[], offset: number) => {
    return previousBlocks.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.textContent.length;
    }, offset);
}

export default getCursorOffset;