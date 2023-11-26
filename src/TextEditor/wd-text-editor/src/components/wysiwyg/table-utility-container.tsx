export interface TableUtilityContainerProps {
    show: boolean;
    onAddRow: () => void;
    onAddColumn: () => void;
}

const TableUtilityContainer: React.FC<TableUtilityContainerProps> = ({ show, onAddRow, onAddColumn }) => {
    return (
        <div className={`${show ? 'opacity-100 pointer-events-auto z-[100]' : 'overflow-hidden h-2 opacity-0 pointer-events-none'} table-utility-container absolute top-[0rem] right-[-1rem] p-0 flex flex-col gap-2.5`}>
            <div title="Add Row" className="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100" onClick={onAddRow}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

</div>
            <div title="Add Column" className="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100" onClick={onAddColumn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <g transform="rotate(90 12 12)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </g>
</svg>
</div>
        </div>
    );
};

export default TableUtilityContainer;