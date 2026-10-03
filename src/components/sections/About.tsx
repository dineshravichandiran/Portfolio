import { useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import { CARD_HIT_AREA, Collapse, PlusIcon } from '../ui/Collapse'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { aboutCards, aboutIntro } from '../../data/about'
import { profile } from '../../data/profile'

export default function About() {
  const [openCard, setOpenCard] = useState<string | null>(null)
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="01 / What I Do" title="Daily operations." />

      <div className="flex gap-10 items-center flex-wrap mb-12">
        <div>
          <div className="w-30 h-30 rounded-lg overflow-hidden border border-panel-border-strong flex-shrink-0">
            <img
              src="/dinesh.webp"
              alt={`${profile.name}, ${profile.role}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-dim mt-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" />
            {profile.location}
          </div>
        </div>
        <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[60ch]">
          {aboutIntro}
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-5">
        {aboutCards.map((card, i) => {
          const isOpen = openCard === card.number
          const panelId = `about-${card.number}`
          return (
          <Reveal key={card.number} delayMs={i * 60} variant="left">
            <SpotlightCard
              className={`relative bg-panel border rounded-md transition-colors hover:border-accent ${
                isOpen ? 'border-accent' : 'border-panel-border'
              }`}
            >
              <div className="p-6">
                <div className="font-mono text-xs text-accent mb-3">{card.number}</div>
                <h3 className="text-[1.05rem] font-bold">
                  <button
                    type="button"
                    onClick={() => setOpenCard(isOpen ? null : card.number)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 text-left ${CARD_HIT_AREA}`}
                  >
                    <span>{card.title}</span>
                    <PlusIcon open={isOpen} />
                  </button>
                </h3>
                <Collapse open={isOpen} id={panelId}>
                  <p className="pt-2.5 text-text-secondary text-sm leading-relaxed">{card.body}</p>
                </Collapse>
              </div>
            </SpotlightCard>
          </Reveal>
          )
        })}
      </div>
    </div>
  )
}
