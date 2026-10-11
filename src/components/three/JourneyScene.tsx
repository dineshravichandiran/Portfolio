import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { initJourneyScene } from './journeyEngine'
import { sceneMilestones } from '../../data/journey'
import CustomCursor from '../layout/CustomCursor'
import './JourneyScene.css'

const ENGINE_MILESTONES = sceneMilestones.map((m) => ({
  name: m.company,
  year: m.year,
  role: m.role,
  meta: m.meta,
  body: m.body,
  tags: m.tags,
}))

export default function JourneyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cleanup = initJourneyScene(canvas, ENGINE_MILESTONES)
    return cleanup
  }, [])

  // The card starts collapsed at the top so the road stays visible; tapping the
  // bar opens the full text, and the grip lets anyone move it out of the way.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const bar = panel.querySelector<HTMLButtonElement>('#infoBarText')!
    const grip = panel.querySelector<HTMLButtonElement>('#infoGrip')!

    const sync = () => bar.setAttribute('aria-expanded', String(panel.hasAttribute('data-expanded')))
    const onToggle = () => {
      panel.toggleAttribute('data-expanded')
      sync()
    }
    bar.addEventListener('click', onToggle)
    const mo = new MutationObserver(sync)
    mo.observe(panel, { attributes: true, attributeFilter: ['data-expanded'] })

    let drag: { x: number; y: number; dx: number; dy: number; rect: DOMRect } | null = null
    const num = (v: string) => parseFloat(v) || 0
    const onDown = (e: PointerEvent) => {
      const cs = getComputedStyle(panel)
      drag = { x: e.clientX, y: e.clientY, dx: num(cs.getPropertyValue('--dx')), dy: num(cs.getPropertyValue('--dy')), rect: panel.getBoundingClientRect() }
      grip.setPointerCapture(e.pointerId)
      panel.classList.add('is-dragging')
    }
    const onMove = (e: PointerEvent) => {
      if (!drag) return
      const margin = 8
      let mx = e.clientX - drag.x
      let my = e.clientY - drag.y
      mx = Math.min(Math.max(mx, margin - drag.rect.left), window.innerWidth - margin - drag.rect.right)
      my = Math.min(Math.max(my, margin - drag.rect.top), window.innerHeight - margin - drag.rect.bottom)
      panel.style.setProperty('--dx', `${drag.dx + mx}px`)
      panel.style.setProperty('--dy', `${drag.dy + my}px`)
    }
    const onUp = () => {
      drag = null
      panel.classList.remove('is-dragging')
    }
    const onReset = () => {
      panel.style.removeProperty('--dx')
      panel.style.removeProperty('--dy')
    }
    grip.addEventListener('pointerdown', onDown)
    grip.addEventListener('pointermove', onMove)
    grip.addEventListener('pointerup', onUp)
    grip.addEventListener('pointercancel', onUp)
    grip.addEventListener('dblclick', onReset)

    return () => {
      bar.removeEventListener('click', onToggle)
      mo.disconnect()
      grip.removeEventListener('pointerdown', onDown)
      grip.removeEventListener('pointermove', onMove)
      grip.removeEventListener('pointerup', onUp)
      grip.removeEventListener('pointercancel', onUp)
      grip.removeEventListener('dblclick', onReset)
    }
  }, [])

  return (
    <div className="journey-page">
      <CustomCursor />
      <div className="journey-loader" id="journeyLoader">
        <div className="journey-loader-text">Loading the Journey</div>
        <div className="journey-loader-bar" />
      </div>

      <canvas ref={canvasRef} />

      <Link to="/" className="journey-back-link">
        ← Back to Portfolio
      </Link>

      <button type="button" id="orbitToggleBtn" className="journey-orbit-toggle">
        ◉ 360° View
      </button>

      <div className="info-panel" id="infoPanel" ref={panelRef} role="region" aria-label="Career milestone">
        <div className="info-bar">
          <button
            type="button"
            className="info-grip"
            id="infoGrip"
            aria-label="Drag to move this card. Double-tap to put it back."
            title="Drag to move"
          >
            <span aria-hidden="true">⋮⋮</span>
          </button>
          <button type="button" className="info-bar-text" id="infoBarText" aria-controls="infoDetails" aria-expanded="false">
            <span className="info-nav-counter" id="infoNavCounter" />
            <span className="info-bar-main">
              <h2 id="infoTitle" />
              <span className="info-role" id="infoRole" />
            </span>
            <span className="info-read" aria-hidden="true">
              <span className="info-read-closed">
                <span className="info-read-label">Read </span>▾
              </span>
              <span className="info-read-open">
                <span className="info-read-label">Hide </span>▴
              </span>
            </span>
          </button>
          <div className="info-nav-btns">
            <button type="button" className="info-nav-btn" id="prevMilestoneBtn" aria-label="Previous milestone">
              ‹
            </button>
            <button type="button" className="info-nav-btn" id="nextMilestoneBtn" aria-label="Next milestone">
              ›
            </button>
          </div>
        </div>
        <div className="info-details" id="infoDetails">
          <div className="info-meta" id="infoMeta" />
          <p className="info-body" id="infoBody" />
          <div className="info-tags" id="infoTags" />
        </div>
      </div>

      <div className="secret-panel" id="secretPanel">
        <button type="button" className="secret-close-btn" id="secretCloseBtn" aria-label="Close">
          ✕
        </button>
        <div className="secret-meta">🏆 Hidden Trophy Case</div>
        <h2>You noticed it.</h2>
        <p className="secret-body">A few wins that don't fit on a roadside sign:</p>
        <ul className="secret-list">
          <li>Smart India Hackathon (SIH) 2020: National Winner, 10,000+ teams</li>
          <li>Crowdstrike &amp; DigiCert Recovery Award</li>
          <li>Performance &amp; Efficiency Award</li>
          <li>Quality Compliance Award</li>
        </ul>
      </div>
    </div>
  )
}
