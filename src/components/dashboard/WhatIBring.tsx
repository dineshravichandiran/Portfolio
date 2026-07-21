import { useState } from 'react'
import Reveal from '../ui/Reveal'
import { capabilities } from '../../data/capabilities'

export default function WhatIBring() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-b border-panel-border py-16 overflow-hidden">
      <div className="container">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs text-accent uppercase tracking-[0.2em] whitespace-nowrap">
            // Showcase
          </span>
          <span className="flex-1 h-px bg-panel-border-strong" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          What I <span className="text-accent">Bring</span>
        </h2>

        <div className="flex flex-col">
          {capabilities.map((c, i) => {
            const open = openIndex === i
            return (
              <Reveal key={c.title} delayMs={i * 70}>
                <div className={i > 0 ? 'border-t border-panel-border pt-8 mt-8' : ''}>
                  <div
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setOpenIndex(i)}
                    onFocus={() => setOpenIndex(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setOpenIndex(i)
                      }
                    }}
                    aria-expanded={open}
                    className="relative block w-full text-left py-2 md:py-4 cursor-pointer"
                  >
                    <span
                      className={`block font-black uppercase leading-none tracking-tight whitespace-nowrap select-none transition-colors duration-300 ${
                        open ? 'text-accent/25' : 'text-accent/12'
                      }`}
                      style={{ fontSize: 'clamp(2.6rem, 10vw, 7rem)' }}
                      aria-hidden="true"
                    >
                      {c.title}
                    </span>
                    <span className="absolute inset-0 flex items-center">
                      <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.15em] text-text-secondary uppercase">
                        {c.tagline}
                      </span>
                    </span>
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-lg text-accent">
                      {open ? '−' : '+'}
                    </span>
                    <h3 className="sr-only">{c.title}</h3>
                  </div>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-accent text-white font-mono font-bold text-sm md:text-base px-5 sm:px-7 py-4 mt-1">
                        {c.bar}
                      </div>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-lg font-bold font-mono text-ok">{c.stat.value}</span>
                        <span className="text-xs text-dim uppercase tracking-wide">{c.stat.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
