import { AstNode } from "../../components/wysiwyg/interface";

const updateHigherLevelNodes = (childIndex: number, higherLevelChildren: AstNode[], children: AstNode[], newNodes: AstNode[] | null, insertAt?: string) => {

    // If no valid index is found, you might want to handle this case differently
    if (childIndex === -1 || childIndex === null) {
        console.error("No valid insertion index found for higher level nodes.");
        return null;
    }

    const higherLevelChild = higherLevelChildren[childIndex];
    higherLevelChild.Children = [... children];

    if (newNodes === null)
        return higherLevelChildren;

    let insertionIndex = 0;
    if (insertAt === 'end')
    {
        insertionIndex = higherLevelChild.Children.length;
    }

    // Insert the newNodes into the higherLevelChild Children array at the found index
    higherLevelChild.Children.splice(insertionIndex, 0, ...newNodes);

    // Return the updated array
    return higherLevelChildren;
};

export default updateHigherLevelNodes;