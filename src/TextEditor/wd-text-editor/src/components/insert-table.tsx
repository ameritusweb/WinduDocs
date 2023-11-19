import { useState } from "react";

interface InsertTableProps {
    onInsert: (rows: number, cols: number) => void;
}

export const InsertTable: React.FC<InsertTableProps> = ({ onInsert }) => {
    const [rows, setRows] = useState<number | string>(1);
    const [columns, setColumns] = useState<number | string>(1);
  
    const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? '' : Math.max(1, e.target.valueAsNumber);
        setRows(newValue);
      };
    
      const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? '' : Math.max(1, e.target.valueAsNumber);
        setColumns(newValue);
      };

    return (
      <div className="insert-table">
         <div className="input-with-label">
            <input
            type="number"
            min="1"
            placeholder=""
            value={rows}
            onChange={handleRowChange}
            />
            <span className="input-label">Rows</span>
        </div>
        <div className="input-with-label">
            <input
            type="number"
            min="1"
            placeholder=""
            value={columns}
            onChange={handleColumnChange}
            />
            <span className="input-label">Columns</span>
        </div>
        <button className="toolbar-button" onClick={() => onInsert(rows as number, columns as number)}>INSERT TABLE</button>
      </div>
    );
  };
  