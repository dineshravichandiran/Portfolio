import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { capabilities } from '../../data/capabilities'

export default function WhatIBring() {
  return (
    <section className="border-b border-panel-border py-14">
      <div className="container">
        <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// What I bring</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Four things you can rely on.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 60}>
              <SpotlightCard className="bg-panel border border-panel-border rounded-lg p-7 h-full transition-colors hover:border-panel-border-strong">
                <div className="font-mono text-[0.68rem] text-accent uppercase tracking-[0.12em] mb-3">
                  {c.tagline}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">{c.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">{c.body}</p>
                <div className="flex items-baseline gap-2 border-t border-panel-border pt-4">
                  <span className="text-xl font-bold font-mono text-ok">{c.stat.value}</span>
                  <span className="text-xs text-dim uppercase tracking-wide">{c.stat.label}</span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
