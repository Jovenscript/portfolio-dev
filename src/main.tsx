import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.tsx'

// Rolagem inercial (Lenis) — offset dos anchors casa com a topbar.
// Respeita quem usa "reduzir movimento" no sistema.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ autoRaf: true, anchors: { offset: -86 } })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
