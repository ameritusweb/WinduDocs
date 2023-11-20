import { AstNode } from "./interface";
import Paragraph from "./paragraph";

export interface TableHeaderProps {
    pathIndices: number[];
    children: AstNode[];
}

const TableHeaderCell: React.FC<TableHeaderProps> = ({ pathIndices, children }) => <th>{children.map((child, index) => {
    const childPathIndices = [...pathIndices, index];
    switch (child.NodeName) {
        case 'ParagraphBlock':
            return <Paragraph key={child.Guid + (child.Version || '0')} id={child.Guid} pathIndices={childPathIndices} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <span {...props}></span>}/>;
        default:
            return null;
    }
})}</th>;

export default TableHeaderCell;