import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { events } from '../../data/credentials'

export default function Events() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="08 — Community" title="Events & conferences." />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {events.map((e, i) => (
          <Reveal key={e.title} delayMs={i * 60} variant="clip">
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
    </div>
  )
}
