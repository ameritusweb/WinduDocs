export const ContextMenu: React.FC = () => {

    const handleClick = () => {
        window.postMessage('', '*');
    };

    return <div id="customContextMenu" className="custom-context-menu">
        <ul>
            <li><a href="#" id="inspectOption" onClick={handleClick}>Inspect</a></li>
        </ul>
    </div>
};
