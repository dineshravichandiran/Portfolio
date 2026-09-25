import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '../ui/SpotlightCard'
import DomainIcon from './domainIcons'
import { domains } from '../../data/domains'

gsap.registerPlugin(ScrollTrigger)

export default function DomainsGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

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
          Ten areas that show up across the day job, the labs, and everything in the Tree.
        </p>

        <div ref={gridRef} className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {domains.map((d) => (
            <SpotlightCard
              key={d.marker}
              tilt
              className="group bg-panel border border-panel-border rounded-md p-5 h-full transition-colors hover:border-accent"
            >
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="font-mono text-[0.68rem] text-accent uppercase tracking-wide">{d.marker}</div>
                <DomainIcon
                  name={d.icon}
                  className="w-[18px] h-[18px] text-accent shrink-0 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
              <h3 className="text-[1.02rem] font-bold mb-2">{d.title}</h3>
              <p className="text-text-secondary text-[0.85rem] leading-relaxed">{d.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
