import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { credentials } from '../../data/credentials'

const certifications = credentials.filter((c) => c.type === 'Certification')

export default function Certifications() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="11 — Certifications" title="Certifications." />
      <div className="flex flex-col gap-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delayMs={i * 40} variant="left">
            <SpotlightCard className="flex items-baseline gap-4 flex-wrap bg-panel border border-panel-border border-l-[3px] border-l-accent rounded-sm px-5 py-3.5 transition-colors hover:border-accent">
              <h4 className="text-[0.95rem] font-semibold flex-1 min-w-[200px]">{c.title}</h4>
              <div className="text-sm text-dim">{c.issuer}</div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
