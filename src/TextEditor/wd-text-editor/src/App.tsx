declare const Prism: typeof import('prismjs');
import './prism/prism.js'
import './App.css'
import { CodeEditor } from './components/code-editor.js';

function App() {

  Prism.highlight('const a = 2;', Prism.languages.javascript, 'javascript');
  return (
    <>
      <div>
            <div className="card w-[60rem] h-[90rem] bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="w-full">
            <CodeEditor />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
