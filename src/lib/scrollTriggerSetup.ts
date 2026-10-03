import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Every scroll-triggered section computes its trigger positions as soon as
// it mounts, using whatever layout exists at that instant. Fonts and images
// that finish loading afterward reflow the page without anyone telling
// ScrollTrigger, so its cached positions go stale and an animation can end
// up permanently stuck at its hidden state, most visible on narrower
// viewports where late-loading fonts change how much text wraps. Refreshing
// once everything has actually finished loading recalculates every trigger
// against the real, settled layout.
//
// Imported by the dashboard page only, so gsap stays out of the first-load
// bundle (the intro gate doesn't use it). The dashboard can mount before or
// after the window "load" event, so handle both.
const refresh = () => ScrollTrigger.refresh()
if (document.readyState === 'complete') refresh()
else window.addEventListener('load', refresh, { once: true })
document.fonts?.ready?.then(refresh)
