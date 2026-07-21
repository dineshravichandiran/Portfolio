import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { useSpotlight } from '../../hooks/useSpotlight'
import { milestones, type JourneyMilestone } from '../../data/journey'

function TravelingBall({ trackRef }: { trackRef: RefObject<HTMLDivElement | null> }) {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onScroll() {
      const track = trackRef.current
      const ball = ballRef.current
      if (!track || !ball) return
      const rect = track.getBoundingClientRect()
      const focusLine = window.innerHeight * 0.4
      const progress = Math.min(1, Math.max(0, (focusLine - rect.top) / rect.height))
      ball.style.top = `${progress * 100}%`
      ball.style.opacity = rect.bottom > 0 && rect.top < window.innerHeight ? '1' : '0'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [trackRef])

  return (
    <div
      ref={ballRef}
      className="absolute left-[5px] sm:left-[7px] w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)] pointer-events-none transition-[top] duration-150 ease-out"
    />
  )
}

function MilestoneCard({ m, delayMs }: { m: JourneyMilestone; delayMs: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>()

  return (
    <Reveal delayMs={delayMs} className="relative pb-12 last:pb-0">
      <span
        className={`absolute -left-8 sm:-left-12 top-7 w-3.5 h-3.5 rounded-full ring-4 ring-bg ${
          m.current ? 'bg-ok shadow-[0_0_14px_var(--color-ok)] animate-pulse' : 'bg-panel-border-strong'
        }`}
      />

      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="spotlight-card border border-panel-border bg-panel rounded-lg p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`font-mono text-xs uppercase tracking-wide ${m.current ? 'text-ok' : 'text-accent'}`}>
            {m.year}
          </span>
          {m.current && (
            <span className="font-mono text-[0.65rem] text-ok border border-ok/35 bg-ok/10 rounded-full px-2.5 py-0.5 uppercase tracking-wide">
              Current
            </span>
          )}
        </div>

        <div className="text-xl sm:text-2xl font-bold tracking-tight mb-1">{m.company}</div>
        <div className="text-text-secondary text-sm mb-4">
          {m.role}
          {m.location && <span className="text-dim"> · {m.location}</span>}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {m.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-dim border border-panel-border-strong rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-text-secondary text-[0.92rem] leading-relaxed">{m.body}</p>
      </div>
    </Reveal>
  )
}

export default function Timeline() {
  const reversed = [...milestones].reverse()
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="07 — Career Journey" title="Timeline." />

      <Link
        to="/journey"
        className="inline-flex items-center gap-2 mb-14 px-5 py-2.5 rounded-full text-sm font-semibold border border-panel-border-strong text-text hover:border-accent transition-colors"
      >
        ↗ Experience this in 3D
      </Link>

      <div ref={trackRef} className="relative pl-8 sm:pl-12">
        <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-panel-border-strong" />
        <TravelingBall trackRef={trackRef} />

        {reversed.map((m, i) => (
          <MilestoneCard key={m.id} m={m} delayMs={i * 90} />
        ))}
      </div>
    </div>
  )
}
