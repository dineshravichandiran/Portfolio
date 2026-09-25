import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { initJourneyScene } from './journeyEngine'
import { sceneMilestones } from '../../data/journey'
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cleanup = initJourneyScene(canvas, ENGINE_MILESTONES)
    return cleanup
  }, [])

  return (
    <div className="journey-page">
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

      <div className="info-panel" id="infoPanel">
        <div className="info-meta" id="infoMeta" />
        <h2 id="infoTitle" />
        <div className="info-role" id="infoRole" />
        <p className="info-body" id="infoBody" />
        <div className="info-tags" id="infoTags" />
        <div className="info-nav">
          <button type="button" className="info-nav-btn" id="prevMilestoneBtn" aria-label="Previous milestone">
            ← Back
          </button>
          <span className="info-nav-counter" id="infoNavCounter" />
          <button type="button" className="info-nav-btn" id="nextMilestoneBtn" aria-label="Next milestone">
            Next →
          </button>
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
          <li>Smart India Hackathon (SIH) 2020 — National Winner, 10,000+ teams</li>
          <li>PTC Crowdstrike &amp; DigiCert Recovery Award</li>
          <li>PTC Performance &amp; Efficiency Award</li>
          <li>PTC SO&amp;S Quality Compliance Award</li>
        </ul>
      </div>
    </div>
  )
}
