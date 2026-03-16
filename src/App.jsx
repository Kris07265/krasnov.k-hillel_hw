import MarkdownEditor from "./components/MarkdownEditor.jsx";


function App() {

  return (
      <MarkdownEditor onContentChange={console.log}/>
  )
}

export default App
