import { AstNode } from "../../components/wysiwyg/interface";

const findHigherlevelIndex = (nodes: AstNode[], higherLevelNodes: AstNode[]): number | null => {
    let index = 0;
    for (const higherLevelItem of higherLevelNodes) {
        if (higherLevelItem.Children.map((c) => c.Guid).join('') === nodes.map((n) => n.Guid).join('')) {
            return index;
        }
        index++;
    }
    return null;
}

export default findHigherlevelIndex;