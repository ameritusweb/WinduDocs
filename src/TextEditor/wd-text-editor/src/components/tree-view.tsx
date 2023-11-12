import './tree-view.css';

export const TreeView = () => {
    return (
      <>
        <div className="border border-gray-200 rounded w-full max-w-[63rem] bg-white px-4 relative">
          <div className="tree-container min-h-[20px] p-[19px] pl-[0px] mb-[20px] bg-[#fbfbfb] border border-[#999] rounded-[4px] shadow-inner text-left">
            <ul className="list-none m-0 ml-[-4px] p-0">
              {/* Root Node */}
              <li className="relative pl-6">
                <span className="relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black">Root Node</span>
                <ul className="list-none m-0 p-0">
                  {/* Child Node 1 */}
                  <li className="relative pl-6">
                    <span className="relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black">Child Node 1</span>
                  </li>
                  {/* Child Node 2 */}
                  <li className="relative pl-6">
                    <span className="relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black">Child Node 2</span>
                    {/* Grandchild Node 1 */}
                    <ul className="list-none m-0 p-0">
                      <li className="relative pl-6">
                        <span className="relative inline-block rounded border border-gray-400 m-1 cursor-pointer p-[3px] px-[8px] hover:bg-[#eee] hover:border-[#94a0b4] hover:text-black">Grandchild Node 1</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }