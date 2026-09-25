import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import SpotlightCard from '../ui/SpotlightCard'
import { useSpotlight } from '../../hooks/useSpotlight'
import { platforms, toolCategories, type ToolBadge } from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

function Badge({ b }: { b: ToolBadge }) {
  const { ref, onMouseMove } = useSpotlight<HTMLSpanElement>()
  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      className={`skill-badge spotlight-card inline-flex items-center gap-1.75 bg-panel border rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors ${
        b.learning ? 'border-warn/40 text-warn hover:border-warn' : 'border-panel-border text-text-secondary hover:border-accent'
      }`}
    >
      {b.icon && <img src={b.icon} alt="" className="w-3.5 h-3.5" />}
      {b.label}
    </span>
  )
}

export default function Skills() {
  const platformGridRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cleanups: (() => void)[] = []

    // Signature move for this section: cards dealt like a hand of cards —
    // a top-down flip, distinct from the focus-pull in Domains and the
    // git-line draw in Tree.
    // Replays every time it crosses in/out of view, either scroll direction.
    const grid = platformGridRef.current
    if (grid) {
      const cards = Array.from(grid.children) as HTMLElement[]
      gsap.set(cards, { opacity: 0, rotateX: -90, y: -14, transformPerspective: 800, transformOrigin: 'top center' })
      const dealIn = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: true,
        })
      const dealOut = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 0,
          rotateX: -90,
          y: -14,
          duration: 0.35,
          ease: 'power1.in',
          stagger: 0.05,
          overwrite: true,
        })
      const batches = ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: dealIn,
        onEnterBack: dealIn,
        onLeave: dealOut,
        onLeaveBack: dealOut,
      })
      cleanups.push(() => batches.forEach((t) => t.kill()))
    }

    categoryRefs.current.forEach((cat) => {
      if (!cat) return
      const badges = Array.from(cat.querySelectorAll('.skill-badge')) as HTMLElement[]
      if (!badges.length) return
      gsap.set(badges, { opacity: 0, scale: 0.5, y: 10 })
      const popIn = () =>
        gsap.to(badges, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)', stagger: 0.035, overwrite: true })
      const popOut = () =>
        gsap.to(badges, { opacity: 0, scale: 0.5, y: 10, duration: 0.3, ease: 'power1.in', stagger: 0.02, overwrite: true })
      const trigger = ScrollTrigger.create({
        trigger: cat,
        start: 'top 90%',
        onEnter: popIn,
        onEnterBack: popIn,
        onLeave: popOut,
        onLeaveBack: popOut,
      })
      cleanups.push(() => trigger.kill())
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="03 — Platforms I Support" title="Enterprise PLM, IIoT & AR." />

      <div ref={platformGridRef} className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 mb-14">
        {platforms.map((p) => (
          <SpotlightCard
            key={p.title}
            className="bg-panel border border-panel-border rounded-md p-5.5 h-full transition-colors hover:border-accent"
          >
            <div className="font-mono text-xs text-accent mb-2.5 flex gap-2 items-center">
              {p.marker}
              {p.soon && (
                <span className="text-[0.65rem] text-warn border border-warn/40 bg-warn/10 px-1.5 py-0.5 rounded-full uppercase">
                  {p.soon}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold mb-1.5">{p.title}</h3>
            <div className="text-xs text-dim mb-2.5">{p.type}</div>
            <div className="text-[0.88rem] text-text-secondary leading-relaxed">{p.desc}</div>
          </SpotlightCard>
        ))}
      </div>

      <SectionHeader label="04 — Tech Stack" title="Tools & technologies." />

      {toolCategories.map((cat, i) => (
        <div
          key={cat.title}
          ref={(el) => {
            categoryRefs.current[i] = el
          }}
          className="mb-8"
        >
          <h3 className="text-[0.85rem] font-bold text-text-secondary uppercase tracking-wide mb-3.5">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cat.badges.map((b) => (
              <Badge b={b} key={b.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
