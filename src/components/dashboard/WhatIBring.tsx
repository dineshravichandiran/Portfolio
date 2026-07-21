import Reveal from '../ui/Reveal'
import { capabilities } from '../../data/capabilities'

export default function WhatIBring() {
  return (
    <section className="border-b border-panel-border py-16 overflow-hidden">
      <div className="container">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs text-warn uppercase tracking-[0.2em] whitespace-nowrap">
            // Showcase
          </span>
          <span className="flex-1 h-px bg-panel-border-strong" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          What I <span className="text-warn">Bring</span>
        </h2>

        <div className="flex flex-col">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 70}>
              <div className={i > 0 ? 'border-t border-panel-border pt-8 mt-8' : ''}>
                <div className="relative py-2 md:py-4">
                  <div
                    className="font-black uppercase leading-none tracking-tight text-warn/15 whitespace-nowrap select-none"
                    style={{ fontSize: 'clamp(2.6rem, 10vw, 7rem)' }}
                    aria-hidden="true"
                  >
                    {c.title}
                  </div>
                  <div className="absolute inset-0 flex items-center">
                    <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.15em] text-text-secondary uppercase">
                      {c.tagline}
                    </span>
                  </div>
                  <h3 className="sr-only">{c.title}</h3>
                </div>

                <div className="bg-warn text-bg font-mono font-bold text-sm md:text-base px-5 sm:px-7 py-4 mt-1">
                  {c.bar}
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-lg font-bold font-mono text-ok">{c.stat.value}</span>
                  <span className="text-xs text-dim uppercase tracking-wide">{c.stat.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
