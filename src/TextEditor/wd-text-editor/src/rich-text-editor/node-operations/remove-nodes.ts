import { AstNode } from "../../components/wysiwyg/interface";

const removeNodes = (root: AstNode, nodeIdsToRemove: string[]): AstNode | null => {
    if (nodeIdsToRemove.includes(root.Guid)) return null;

    const updatedChildren = root.Children.reduce((acc: AstNode[], child) => {
        const updatedChild = removeNodes(child, nodeIdsToRemove);
        return updatedChild ? [...acc, updatedChild] : acc;
    }, []);

    return { ...root, Children: updatedChildren };
}