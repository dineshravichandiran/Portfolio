import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import { credentials } from '../../data/credentials'

const certifications = credentials.filter((c) => c.type === 'Certification')

const FAN_ROTATE_DEG = 14
const FAN_OFFSET_X = 160
const FAN_OFFSET_Y = 10

const TIER_COLOR: Record<string, string> = {
  Fundamentals: 'var(--color-accent)',
  Specialist: 'var(--color-ok)',
}

function BadgeIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Certifications() {
  const [active, setActive] = useState(Math.floor(certifications.length / 2))
  const [entered, setEntered] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  function step(delta: number) {
    setActive((prev) => ((prev + delta) % certifications.length + certifications.length) % certifications.length)
  }

  function pick(i: number) {
    setActive(i)
  }

  // A single React-owned "entered" flag drives the fan-in/out — combined
  // into the same transform/opacity each card already computes below —
  // instead of a separate GSAP tween fighting React for the same
  // properties (transform, opacity) on every render.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setEntered(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // Scroll the mouse wheel over the deck to browse cards, in addition to
  // clicking a card or the left/right arrows below — purely manual, no
  // auto-advance.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 4) return
      e.preventDefault()
      step(e.deltaY > 0 ? 1 : -1)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="11 — Certifications" title="Certified specializations." />

      <div
        ref={stageRef}
        className="relative h-[400px] sm:h-[420px] flex items-center justify-center mb-8"
        style={{ perspective: '1200px' }}
      >
        {certifications.map((c, i) => {
          const offset = i - active
          const isActive = offset === 0
          const hidden = Math.abs(offset) > 1
          const [org, year] = c.issuer.split(' · ')
          const tierColor = c.tier ? TIER_COLOR[c.tier] ?? 'var(--color-accent)' : 'var(--color-accent)'
          return (
            <button
              key={c.title}
              type="button"
              onClick={() => pick(i)}
              aria-label={`Bring "${c.title}" to front`}
              className="absolute w-[230px] sm:w-[260px] bg-panel border rounded-xl p-5 text-left cursor-pointer transition-[transform,filter,box-shadow,border-color,opacity] duration-500 ease-out flex flex-col"
              style={{
                transform: `translateX(${offset * FAN_OFFSET_X}px) translateY(${Math.abs(offset) * FAN_OFFSET_Y + (entered ? 0 : 40)}px) rotateY(${-offset * FAN_ROTATE_DEG}deg) scale(${(isActive ? 1.05 : 0.88) * (entered ? 1 : 0.85)})`,
                filter: isActive ? 'none' : 'blur(2px)',
                zIndex: 10 - Math.abs(offset),
                borderColor: isActive ? tierColor : 'var(--color-panel-border)',
                borderWidth: isActive ? '1.5px' : '1px',
                boxShadow: isActive
                  ? `0 22px 44px -14px color-mix(in srgb, ${tierColor} 45%, transparent)`
                  : '0 10px 24px -10px rgba(0, 0, 0, 0.5)',
                opacity: hidden || !entered ? 0 : isActive ? 1 : 0.55,
                pointerEvents: hidden || !entered ? 'none' : 'auto',
                transitionDelay: entered ? `${Math.abs(offset) * 80}ms` : '0ms',
              }}
            >
              <div className="flex items-center justify-between mb-3.5">
                <BadgeIcon color={tierColor} />
                {c.tier && (
                  <span
                    className="font-mono text-[0.6rem] font-bold uppercase tracking-wide"
                    style={{ color: tierColor }}
                  >
                    {c.tier}
                  </span>
                )}
              </div>

              <h4 className="text-[0.95rem] font-bold leading-snug mb-1.5">{c.title}</h4>
              <div className="text-xs font-semibold mb-3" style={{ color: tierColor }}>
                {org}
              </div>

              {c.tags && (
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] font-mono text-dim border border-panel-border-strong rounded-full px-1.75 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto font-mono text-[0.62rem] text-dim uppercase tracking-wide">
                Issued {year ?? org}
              </div>
            </button>
          )
        })}

        <div className="absolute right-2 sm:right-6 top-3 z-20 flex items-center gap-0.5 rounded-full border border-panel-border-strong bg-panel/80 backdrop-blur-sm px-1 py-1">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous certification"
            className="w-8 h-8 rounded-full text-text-secondary flex items-center justify-center cursor-pointer transition-colors hover:text-accent"
          >
            ←
          </button>
          <span className="w-px h-4 bg-panel-border-strong" aria-hidden="true" />
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next certification"
            className="w-8 h-8 rounded-full text-text-secondary flex items-center justify-center cursor-pointer transition-colors hover:text-accent"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {certifications.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => pick(i)}
            aria-label={`Show ${c.title}`}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
              i === active ? 'bg-accent' : 'bg-panel-border-strong hover:bg-panel-border-strong/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
