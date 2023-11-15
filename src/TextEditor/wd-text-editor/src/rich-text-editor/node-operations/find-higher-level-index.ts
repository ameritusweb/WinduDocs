import { AstNode } from "../../../components/wysiwyg/interface";

const findHigherlevelIndex = (nodes: AstNode[], higherLevelNodes: AstNode[]): number | null => {
    let index = 0;
    for (const higherLevelItem of higherLevelNodes) {
        if (higherLevelItem.Children === nodes) {
            return index;
        }
        index++;
    }
    return null;
}

export default findHigherlevelIndex;