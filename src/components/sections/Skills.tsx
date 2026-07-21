import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { useSpotlight } from '../../hooks/useSpotlight'
import { platforms, toolCategories, type ToolBadge } from '../../data/skills'

function Badge({ b }: { b: ToolBadge }) {
  const { ref, onMouseMove } = useSpotlight<HTMLSpanElement>()
  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card inline-flex items-center gap-1.75 bg-panel border rounded-full px-3.5 py-1.5 text-[0.82rem] ${
        b.learning ? 'border-warn/40 text-warn' : 'border-panel-border text-text-secondary'
      }`}
    >
      {b.icon && <img src={b.icon} alt="" className="w-3.5 h-3.5" />}
      {b.label}
    </span>
  )
}

export default function Skills() {
  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="03 — Platforms I Support" title="Enterprise PLM, IIoT & AR." />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 mb-14">
        {platforms.map((p, i) => (
          <Reveal key={p.title} delayMs={i * 60}>
            <SpotlightCard className="bg-panel border border-panel-border rounded-md p-5.5 h-full">
              <div className="font-mono text-xs text-accent mb-2.5 flex gap-2 items-center">
                {p.marker}
                {p.soon && (
                  <span className="text-[0.65rem] text-warn border border-warn/40 bg-warn/10 px-1.5 py-0.5 rounded-full uppercase">
                    {p.soon}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold mb-1.5">{p.title}</h3>
              <div className="text-xs text-dim mb-2.5">{p.type}</div>
              <div className="text-[0.88rem] text-text-secondary leading-relaxed">{p.desc}</div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <SectionHeader label="04 — Tech Stack" title="Tools & technologies." />

      {toolCategories.map((cat, i) => (
        <Reveal key={cat.title} delayMs={i * 60} className="mb-8">
          <h3 className="text-[0.85rem] font-bold text-text-secondary uppercase tracking-wide mb-3.5">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cat.badges.map((b) => (
              <Badge b={b} key={b.label} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
