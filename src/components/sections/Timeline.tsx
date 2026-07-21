import { Link } from 'react-router-dom'
import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { useScrollActive } from '../../hooks/useScrollActive'
import { useSpotlight } from '../../hooks/useSpotlight'
import { milestones, type JourneyMilestone } from '../../data/journey'

function MilestoneCard({ m, scrolling, delayMs }: { m: JourneyMilestone; scrolling: boolean; delayMs: number }) {
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
        className={`glass-panel spotlight-card ${scrolling ? 'glow-active' : ''} border border-panel-border rounded-lg p-6 sm:p-7`}
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
  const scrolling = useScrollActive()

  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="07 — Career Journey" title="Timeline." />

      <Link
        to="/journey"
        className={`glass-panel ${scrolling ? 'glow-active' : ''} inline-flex items-center gap-2 mb-14 px-5 py-2.5 rounded-full text-sm font-semibold border border-panel-border-strong text-text hover:border-accent transition-colors`}
      >
        ↗ Experience this in 3D
      </Link>

      <div className="relative pl-8 sm:pl-12">
        <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-panel-border-strong to-panel-border" />

        {reversed.map((m, i) => (
          <MilestoneCard key={m.id} m={m} scrolling={scrolling} delayMs={i * 90} />
        ))}
      </div>
    </div>
  )
}
