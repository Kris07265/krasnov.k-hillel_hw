import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@toast-ui/editor/dist/toastui-editor.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
