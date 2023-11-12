declare const Prism: typeof import('prismjs');
import './prism/prism.js'
import './tailwind.css'
import './App.css'
import { WysiwygToolbar } from './components/wysiwyg-toolbar';
import { WysiwygEditor } from './components/wysiwyg-editor.js';

function App() {

  Prism.highlight('const a = 2;', Prism.languages.javascript, 'javascript');
  return (
    <>
    <WysiwygToolbar />
      <div style={{backgroundColor: 'rgba(200, 200, 200, 0.3)'}}>
        <div className="card inline-flex m-12 w-[60rem] h-[90rem] bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="w-full">
              <WysiwygEditor />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
