import { AstNode } from "./interface";
import Paragraph from "./paragraph";

export interface TableHeaderProps {
    children: AstNode[];
}

const TableHeaderCell: React.FC<TableHeaderProps> = ({ children }) => <th>{children.map((child) => {
    switch (child.NodeName) {
        case 'ParagraphBlock':
            return <Paragraph key={child.Guid} id={child.Guid} content={child.Children} higherLevelContent={{ content: children }} render={props => <span {...props}></span>}/>;
        default:
            return null;
    }
})}</th>;

export default TableHeaderCell;