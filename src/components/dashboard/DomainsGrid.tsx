import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '../ui/SpotlightCard'
import DomainIcon from './domainIcons'
import { domains } from '../../data/domains'
import { CARD_HIT_AREA, Collapse, PlusIcon } from '../ui/Collapse'

gsap.registerPlugin(ScrollTrigger)

export default function DomainsGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [openMarker, setOpenMarker] = useState<string | null>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Signature move for this section: a camera "focus pull" — cards arrive
    // soft and slightly oversized, then snap into focus. Distinct from the
    // card-deal flip in Skills and the git-line draw in Tree.
    const cards = Array.from(grid.children) as HTMLElement[]
    gsap.set(cards, { opacity: 0, scale: 1.08, filter: 'blur(10px)' })

    // Replays every time a card crosses in or out of view, in either scroll
    // direction, instead of a one-shot reveal that only ever plays once.
    const focusIn = (batch: Element[]) =>
      gsap.to(batch, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.09,
        overwrite: true,
      })
    const focusOut = (batch: Element[]) =>
      gsap.to(batch, {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power1.in',
        stagger: 0.04,
        overwrite: true,
      })

    const batches = ScrollTrigger.batch(cards, {
      start: 'top 88%',
      onEnter: focusIn,
      onEnterBack: focusIn,
      onLeave: focusOut,
      onLeaveBack: focusOut,
    })

    return () => batches.forEach((t) => t.kill())
  }, [])

  return (
    <section className="border-b border-panel-border py-14">
      <div className="container">
        <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// Domains of interest</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Where I focus.</h2>
        <p className="text-text-secondary max-w-2xl mb-10">
          Ten areas that show up across the day job, the labs, and everything in the Tree. Click any card for the detail.
        </p>

        <div ref={gridRef} className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] items-start gap-4">
          {domains.map((d) => {
            const isOpen = openMarker === d.marker
            const panelId = `domain-${d.marker.replace(/\W+/g, '-').toLowerCase()}`
            return (
              <SpotlightCard
                key={d.marker}
                tilt
                className={`group relative bg-panel border rounded-md transition-colors hover:border-accent ${
                  isOpen ? 'border-accent' : 'border-panel-border'
                }`}
              >
                <div className="p-5">
                  <div className="mb-2.5 flex items-start justify-between gap-2">
                    <div className="font-mono text-[0.68rem] uppercase tracking-wide text-accent">{d.marker}</div>
                    <DomainIcon
                      name={d.icon}
                      className="h-[18px] w-[18px] shrink-0 text-accent transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-[1.02rem] font-bold">
                    {/* The ::after overlay makes the whole card the click target. */}
                    <button
                      type="button"
                      onClick={() => setOpenMarker(isOpen ? null : d.marker)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={`flex w-full cursor-pointer items-center justify-between gap-3 text-left ${CARD_HIT_AREA}`}
                    >
                      <span>{d.title}</span>
                      <PlusIcon open={isOpen} />
                    </button>
                  </h3>
                  <Collapse open={isOpen} id={panelId}>
                    <p className="pt-3 text-[0.85rem] leading-relaxed text-text-secondary">{d.desc}</p>
                  </Collapse>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
