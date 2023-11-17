import { AstNode } from "./interface";
import Paragraph from "./paragraph";

export interface TableHeaderProps {
    children: AstNode[];
}

const TableHeaderCell: React.FC<TableHeaderProps> = ({ children }) => <th>{children.map((child) => {
    switch (child.NodeName) {
        case 'ParagraphBlock':
            return <Paragraph key={child.Guid + (child.Version || '0')} id={child.Guid} version={child.Version || 'V0'} content={child.Children} higherLevelContent={{ content: children }} render={props => <span {...props}></span>}/>;
        default:
            return null;
    }
})}</th>;

export default TableHeaderCell;