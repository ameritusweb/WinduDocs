declare var Prism: typeof import('prismjs');
import './prism/prism.js'
import './App.css'
import { CodeEditor } from './components/code-editor.js';

function App() {

  const answer = '';//Prism.highlight('const a = 2;', Prism.languages.javascript, 'javascript');
  return (
    <>
      <div>
            <div className="card w-96 bg-base-100 shadow-xl">
            <div className="tabs">
              <a className="tab tab-lifted">{answer}</a> 
              <a className="tab tab-lifted tab-active">Tab 2</a> 
              <a className="tab tab-lifted">Tab 3</a>
            </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Cookies!</h2>
          <div className="w-full">
            <h1>Code Editor</h1>
            <CodeEditor />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Deny</button>
          </div>
        </div>
      </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
