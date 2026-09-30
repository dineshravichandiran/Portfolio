import { useEffect, useRef, useState } from 'react'
import type { initIntroGlobe } from '../three/introGlobeEngine'
import { playEnterSound } from '../../lib/sound'
import { profile } from '../../data/profile'
import './IntroGate.css'

export const INTRO_SESSION_KEY = 'portfolio-intro-seen'
export const INTRO_DISMISSED_EVENT = 'portfolio-intro-dismissed'
const SESSION_KEY = INTRO_SESSION_KEY

type Phase = 'idle' | 'entering' | 'exiting'

const [firstName, ...restName] = profile.name.split(' ')
const lastName = restName.join(' ')

export default function IntroGate() {
  const [mounted, setMounted] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== '1'
    } catch {
      return true
    }
  })
  const [phase, setPhase] = useState<Phase>('idle')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ReturnType<typeof initIntroGlobe> | null>(null)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    // Three.js is the single heaviest thing in the whole bundle — loading it
    // as a dynamic import moves that parse/eval cost off the initial
    // critical path (and out of the main JS chunk entirely) instead of
    // blocking first paint on every visit just to draw the globe.
    import('../three/introGlobeEngine').then(({ initIntroGlobe }) => {
      if (cancelled) return
      engineRef.current = initIntroGlobe(canvas)
    })
    return () => {
      cancelled = true
      engineRef.current?.cleanup()
    }
  }, [mounted])

  if (!mounted) return null

  function handleEnter() {
    if (phase !== 'idle') return
    playEnterSound()
    setPhase('entering')
    engineRef.current?.enter(() => {
      setPhase('exiting')
      window.dispatchEvent(new Event(INTRO_DISMISSED_EVENT))
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // Private-browsing / storage-blocked — the gate just replays next load.
      }
      window.setTimeout(() => setMounted(false), 450)
    })
  }

  return (
    <div className={`intro-gate ${phase === 'entering' ? 'is-entering' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}>
      <div className="intro-gate-flash" />
      <div className="intro-gate-video-wrap">
        <div className="intro-gate-video-box">
          <video
            className="intro-gate-bg-video"
            src="/media/intro-hero-desk.mp4"
            poster="/media/intro-hero-desk-poster.jpg"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>
        <div className="intro-gate-caption">
          <div className="intro-gate-name">
            <span className="intro-gate-name-wrap">
              <span className="intro-gate-name-text">
                {firstName} <span className="intro-gate-name-accent">{lastName}</span>
              </span>
              <span className="intro-gate-name-bar" aria-hidden="true" />
            </span>
          </div>
          <div className="intro-gate-role">{profile.role}</div>
        </div>
      </div>
      <div className="intro-gate-content">
        <div
          className="intro-gate-globe"
          role="button"
          tabIndex={0}
          aria-label="Click the globe to enter the portfolio"
          onClick={handleEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleEnter()
            }
          }}
        >
          <canvas ref={canvasRef} />
          <div className="intro-gate-ring" />
        </div>
        <div className="intro-gate-text">
          <div className="intro-gate-cue">
            <svg className="intro-gate-cue-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 4.1 12 6" />
              <path d="m5.1 8-2.9-.8" />
              <path d="m6 12-1.9 2" />
              <path d="M7.2 2.2 8 5.1" />
              <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
            </svg>
            Click the globe to enter
          </div>
        </div>
      </div>
    </div>
  )
}
