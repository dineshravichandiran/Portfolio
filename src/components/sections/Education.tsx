import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { credentials } from '../../data/credentials'

const education = credentials.filter((c) => c.type === 'Education')

export default function Education() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="12 — Education" title="Education." />
      <div className="flex flex-col gap-3">
        {education.map((c, i) => (
          <Reveal key={c.title} delayMs={i * 40} variant="scale">
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
