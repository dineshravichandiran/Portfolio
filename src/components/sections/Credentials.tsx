import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { events, impactStats, credentials } from '../../data/credentials'

export default function Credentials() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="08 — Community" title="Events & conferences." />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 mb-14">
        {events.map((e, i) => (
          <Reveal key={e.title} delayMs={i * 60}>
            <SpotlightCard className="bg-panel border border-panel-border rounded-md p-6 h-full transition-colors hover:border-accent">
              <span className="inline-block font-mono text-[0.68rem] text-ok border border-ok/35 bg-ok/10 px-2 py-1 rounded-full mb-3 uppercase">
                {e.status}
              </span>
              <h3 className="text-[1.05rem] mb-1.5">{e.title}</h3>
              <div className="text-sm text-dim mb-3">{e.date}</div>
              <p className="text-[0.88rem] text-text-secondary leading-relaxed">{e.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <SectionHeader label="09 — Results" title="Key impact." />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-14">
        {impactStats.map((s, i) => (
          <Reveal key={s.label} delayMs={i * 50}>
            <SpotlightCard className="bg-panel border border-panel-border rounded-md p-5.5 text-center transition-colors hover:border-accent">
              <div className="font-mono text-[1.8rem] font-bold text-accent tabular-nums">
                {s.number}
              </div>
              <div className="text-xs text-dim uppercase tracking-wide mt-1.5">{s.label}</div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <SectionHeader label="10 — Credentials" title="Certifications, awards & education." />
      <div className="flex flex-col gap-3">
        {credentials.map((c, i) => (
          <Reveal key={c.title} delayMs={i * 40}>
            <SpotlightCard className="flex items-baseline gap-4 flex-wrap bg-panel border border-panel-border border-l-[3px] border-l-accent rounded-sm px-5 py-3.5 transition-colors hover:border-accent">
              <div className="font-mono text-[0.68rem] text-accent uppercase tracking-wide flex-shrink-0 w-22.5">
                {c.type}
              </div>
              <h4 className="text-[0.95rem] font-semibold flex-1 min-w-[200px]">{c.title}</h4>
              <div className="text-sm text-dim">{c.issuer}</div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
