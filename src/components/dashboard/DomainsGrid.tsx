import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import DomainIcon from './domainIcons'
import { domains } from '../../data/domains'

export default function DomainsGrid() {
  return (
    <section className="border-b border-panel-border py-14">
      <div className="container">
        <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// Domains of interest</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Where I focus.</h2>
        <p className="text-text-secondary max-w-2xl mb-10">
          Ten areas that show up across the day job, the labs, and everything in the Tree.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {domains.map((d, i) => (
            <Reveal key={d.marker} delayMs={i * 40}>
              <SpotlightCard className="bg-panel border border-panel-border rounded-md p-5 h-full transition-colors hover:border-panel-border-strong">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="font-mono text-[0.68rem] text-accent uppercase tracking-wide">{d.marker}</div>
                  <DomainIcon name={d.icon} className="w-[18px] h-[18px] text-warn shrink-0" />
                </div>
                <h3 className="text-[1.02rem] font-bold mb-2">{d.title}</h3>
                <p className="text-text-secondary text-[0.85rem] leading-relaxed">{d.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
