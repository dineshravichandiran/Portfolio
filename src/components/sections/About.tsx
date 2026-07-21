import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { aboutCards, aboutIntro } from '../../data/about'
import { profile } from '../../data/profile'

export default function About() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="01 — What I Do" title="Daily operations." />

      <div className="flex gap-10 items-center flex-wrap mb-12">
        <div>
          <div className="w-30 h-30 rounded-lg overflow-hidden border border-panel-border-strong flex-shrink-0">
            <img
              src="/dinesh.jpg"
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {aboutCards.map((card, i) => (
          <Reveal key={card.number} delayMs={i * 60}>
            <SpotlightCard className="bg-panel border border-panel-border rounded-md p-6 h-full transition-colors hover:border-accent">
              <div className="font-mono text-xs text-accent mb-3">{card.number}</div>
              <h3 className="text-[1.05rem] font-bold mb-2.5">{card.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{card.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
