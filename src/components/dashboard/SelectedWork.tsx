import { useEffect, useRef, useState } from 'react'
import { keyProjects } from '../../data/projects'

const SELECTED_TITLES = [
  'Enterprise SaaS Observability & Incident Response',
  'AIOps Alert Correlation & RCA Engine',
  'Kubernetes Self-Healing & Chaos Lab',
  'End-to-End DevSecOps CI Pipeline',
  'Personal Cloud/SRE Portfolio & 3D Career Journey',
]

const selected = SELECTED_TITLES.map((t) => keyProjects.find((p) => p.title === t)).filter(
  (p): p is (typeof keyProjects)[number] => Boolean(p),
)

export default function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = slideRefs.current.findIndex((el) => el === entry.target)
          if (idx !== -1) setActive(idx)
        })
      },
      { root: track, threshold: 0.6 },
    )
    slideRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-b border-panel-border py-14">
      <div className="container mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// Selected work</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Selected work.</h2>
        </div>
        <div className="font-mono text-sm text-dim tabular-nums flex items-center gap-2">
          <span className="text-text">{String(active + 1).padStart(2, '0')}</span>
          <span>/ {String(selected.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="container flex items-center gap-2 text-dim text-sm font-mono mb-6">
        <span>↓</span> scroll to explore
      </div>

      <div
        ref={trackRef}
        className="relative snap-y snap-mandatory overflow-y-auto h-[70vh] sm:h-[75vh] scroll-smooth border-y border-panel-border"
      >
        {selected.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            className="snap-start h-full flex items-center"
          >
            <div className="container max-w-[760px]">
              <div className="font-mono text-xs text-dim uppercase tracking-wide mb-3">{p.meta}</div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{p.title}</h3>
              <p className="text-text-secondary text-[0.95rem] sm:text-base leading-relaxed mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-dim border border-panel-border-strong rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-ok font-mono mb-6">↑ {p.impact}</div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {selected.map((p, i) => (
            <button
              key={p.title}
              type="button"
              aria-label={`Jump to ${p.title}`}
              onClick={() => slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                i === active ? 'bg-accent' : 'bg-panel-border-strong hover:bg-panel-border-strong/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
