import { useEffect, useRef, useState } from 'react'
import { initIntroGlobe } from '../three/introGlobeEngine'
import { playEnterSound } from '../../lib/sound'
import { profile } from '../../data/profile'
import './IntroGate.css'

const SESSION_KEY = 'portfolio-intro-seen'

type Phase = 'idle' | 'entering' | 'exiting'

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

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    engineRef.current = initIntroGlobe(canvas)
    return () => engineRef.current?.cleanup()
  }, [mounted])

  if (!mounted) return null

  function handleEnter() {
    if (phase !== 'idle') return
    playEnterSound()
    setPhase('entering')
    engineRef.current?.enter(() => {
      setPhase('exiting')
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
        <div className="intro-gate-name">{profile.name}</div>
        <div className="intro-gate-role">{profile.role}</div>
        <div className="intro-gate-cue">Click the globe to enter</div>
      </div>
    </div>
  )
}
