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

      <button type="button" className="journey-orbit-btn" id="orbitToggleBtn">
        ◉ 360° View
      </button>
    </div>
  )
}
