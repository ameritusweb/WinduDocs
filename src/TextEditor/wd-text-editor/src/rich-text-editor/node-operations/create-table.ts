import { createNewAstNode, createTableCell } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createTable = (rows: number, columns: number): AstNode => {
    const tableNode = createNewAstNode('Table', 0, 1, null, []);
    
    
    const headerCells = Array.from({ length: columns }, (_, col) =>
        createTableCell(col, 3, `Header ${col + 1}`)
    );
    const headerRow = createNewAstNode('TableRow', 0, 2, null, headerCells);
    headerRow.Attributes.IsHeader = 'True';
    tableNode.Children.push(headerRow);

    
    for (let row = 0; row < rows; row++) {
        const rowCells = Array.from({ length: columns }, (_, col) =>
            createTableCell(col, 3, `Data ${row + 1}-${col + 1}`)
        );
        const tableRow = createNewAstNode('TableRow', row + 1, 2, null, rowCells);
        tableNode.Children.push(tableRow);
    }

    return tableNode;
};

export default createTable;