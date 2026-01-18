import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App' // ✅ no extension

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)