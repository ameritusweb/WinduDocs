declare const Prism: typeof import('prismjs');
import './prism/prism.js'
import './tailwind.css'
import './App.css'
import { WysiwygToolbar } from './components/wysiwyg-toolbar';
import RichTextEditor from './components/wysiwyg/rich-text-editor.js';
import useConsoleToasts from './hooks/use-console-toasts.js';
import { ToastContainer } from 'react-toastify';
import { astContext, astHigherLevelContext } from './components/ast-mapping.js';
import ast from './test/ast.json';
import { useSafeStringify } from './hooks/use-safe-stringify.js';

declare global {
  interface Window { astContext: typeof astContext; safeStringify: (value: object) => string, mapToMock: (value: Map<string, number[]>) => string, astHigherLevelContext: typeof astHigherLevelContext; }
}

function App() {

  useConsoleToasts();
  const { safeStringify, mapToMock } = useSafeStringify();
  
  if (import.meta.env.MODE === 'development') {
    window.astContext = astContext;
    window.astHigherLevelContext = astHigherLevelContext;
    window.safeStringify = safeStringify;
    window.mapToMock = mapToMock;
  }

  Prism.highlight('const a = 2;', Prism.languages.javascript, 'javascript');
  return (
    <>
    <WysiwygToolbar />
      <div style={{backgroundColor: 'rgba(200, 200, 200, 0.3)'}}>
        <div className="card inline-flex m-12 w-[60rem] h-[90rem] bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="w-full">
              <RichTextEditor ast={ast} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
