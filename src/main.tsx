
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

const redirect = new URLSearchParams(window.location.search).get('redirect')

if (redirect) {
  window.history.replaceState(
    null,
    '',
    import.meta.env.BASE_URL.replace(/\/$/, '') + redirect,
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
