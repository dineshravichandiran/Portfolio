import { Link } from 'react-router-dom'
import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import { milestones } from '../../data/journey'

export default function Timeline() {
  const reversed = [...milestones].reverse()

  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="07 — Career Journey" title="Timeline." />

      <Link
        to="/journey"
        className="inline-flex mb-10 px-5 py-2.5 rounded-full text-sm font-semibold border border-panel-border-strong text-text hover:border-accent transition-colors"
      >
        Experience this in 3D ↗
      </Link>

      <div className="flex flex-col gap-10">
        {reversed.map((m) => (
          <div key={m.id} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 sm:gap-8">
            <div
              className={`font-mono text-sm ${m.current ? 'text-ok font-semibold' : 'text-dim'}`}
            >
              {m.year}
            </div>
            <div>
              <div className="text-lg font-bold">{m.company}</div>
              <div className="text-text-secondary text-sm mb-3">
                {m.role}
                {m.location && ` · ${m.location}`}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
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
          </div>
        ))}
      </div>
    </div>
  )
}
