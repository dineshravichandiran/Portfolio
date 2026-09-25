import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/index.css'
import App from './App.tsx'

gsap.registerPlugin(ScrollTrigger)

// Every scroll-triggered section computes its trigger positions as soon as
// it mounts, using whatever layout exists at that instant. Fonts and images
// that finish loading afterward reflow the page without anyone telling
// ScrollTrigger, so its cached positions go stale and an animation can end
// up permanently stuck at its hidden state — most visible on narrower
// viewports where late-loading fonts change how much text wraps. Refreshing
// once everything has actually finished loading recalculates every trigger
// against the real, settled layout.
window.addEventListener('load', () => ScrollTrigger.refresh())
document.fonts?.ready?.then(() => ScrollTrigger.refresh())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
