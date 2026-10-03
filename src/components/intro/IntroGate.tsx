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
  // The poster paints first. The video then starts on the visitor's first
  // interaction, or a few seconds after load, whichever comes first, so its
  // first frame never delays the first meaningful paint.
  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => {
    if (videoReady) return
    let timer = 0
    const go = () => {
      window.clearTimeout(timer)
      cleanup()
      setVideoReady(true)
    }
    const events = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart'] as const
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, go))
      window.removeEventListener('load', arm)
    }
    const arm = () => {
      timer = window.setTimeout(go, 3500)
    }
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }))
    if (document.readyState === 'complete') arm()
    else window.addEventListener('load', arm, { once: true })
    return () => {
      window.clearTimeout(timer)
      cleanup()
    }
  }, [videoReady])
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Set the globe up once (idempotent) so both the idle warm-up below and an
  // early click go through the same path.
  const enginePromiseRef = useRef<Promise<ReturnType<typeof initIntroGlobe>> | null>(null)
  function ensureEngine() {
    if (!enginePromiseRef.current) {
      const canvas = canvasRef.current
      if (!canvas) return Promise.reject(new Error('intro canvas missing'))
      // Three.js is the heaviest thing in the bundle; as a dynamic import it
      // stays out of the main chunk, and it only starts after first paint.
      enginePromiseRef.current = import('../three/introGlobeEngine').then(({ initIntroGlobe }) => {
        const engine = initIntroGlobe(canvas)
        engineRef.current = engine
        return engine
      })
    }
    return enginePromiseRef.current
  }

  useEffect(() => {
    if (!mounted) return
    let cancelled = false
    const warmUp = () => {
      if (!cancelled) void ensureEngine()
    }
    // Wait for the page to finish loading, then for an idle moment, so the
    // poster, text and fonts paint before the globe's JS competes with them.
    const schedule = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
      if (w.requestIdleCallback) w.requestIdleCallback(warmUp, { timeout: 2000 })
      else window.setTimeout(warmUp, 300)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', schedule)
      engineRef.current?.cleanup()
      engineRef.current = null
      enginePromiseRef.current = null
    }
    // ensureEngine only reads refs, so it is safe to leave out of the deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  if (!mounted) return null

  function handleEnter() {
    if (phase !== 'idle') return
    playEnterSound()
    setPhase('entering')
    // If the visitor clicks before the idle warm-up ran, this loads it now.
    void ensureEngine().then((engine) =>
      engine.enter(() => {
        setPhase('exiting')
        window.dispatchEvent(new Event(INTRO_DISMISSED_EVENT))
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // Private-browsing / storage-blocked — the gate just replays next load.
        }
        window.setTimeout(() => setMounted(false), 450)
      }),
    )
  }

  return (
    <div className={`intro-gate ${phase === 'entering' ? 'is-entering' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}>
      <div className="intro-gate-flash" />
      <div className="intro-gate-video-wrap">
        <div className="intro-gate-video-box">
          <video
            className="intro-gate-bg-video"
            src={videoReady ? '/media/intro-hero-desk.mp4' : undefined}
            poster="/media/intro-hero-desk-poster.webp"
            preload="none"
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
