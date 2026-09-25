import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import { impactStats, credentials } from '../../data/credentials'

gsap.registerPlugin(ScrollTrigger)

const recognition = credentials.filter((c) => c.type === 'Award' || c.type === 'Publication')

export default function Achievements() {
  const statsRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cleanups: (() => void)[] = []

    // Signature move for this section: bold headline + an underline bar that
    // draws in, sliding in from the right — replayed every time it crosses
    // into or out of view, either scroll direction.
    function wire(container: HTMLDivElement | null) {
      if (!container) return
      const items = Array.from(container.children) as HTMLElement[]
      const bars = items.map((item) => item.querySelector('.achv-bar')).filter(Boolean) as HTMLElement[]
      gsap.set(items, { opacity: 0, x: 40 })
      gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' })

      const enter = (batch: Element[]) => {
        gsap.to(batch, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out', stagger: 0.09, overwrite: true })
        batch.forEach((el) => {
          const bar = (el as HTMLElement).querySelector('.achv-bar')
          if (bar) gsap.to(bar, { scaleX: 1, duration: 0.6, delay: 0.18, ease: 'power2.out', overwrite: true })
        })
      }
      const leave = (batch: Element[]) => {
        gsap.to(batch, { opacity: 0, x: 40, duration: 0.35, ease: 'power1.in', stagger: 0.04, overwrite: true })
        batch.forEach((el) => {
          const bar = (el as HTMLElement).querySelector('.achv-bar')
          if (bar) gsap.to(bar, { scaleX: 0, duration: 0.3, ease: 'power1.in', overwrite: true })
        })
      }

      const batches = ScrollTrigger.batch(items, {
        start: 'top 90%',
        onEnter: enter,
        onEnterBack: enter,
        onLeave: leave,
        onLeaveBack: leave,
      })
      cleanups.push(() => batches.forEach((t) => t.kill()))
    }

    wire(statsRef.current)
    wire(listRef.current)

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="09 — Results" title="Key impact." />
      <div ref={statsRef} className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-8 gap-y-10 mb-16">
        {impactStats.map((s) => (
          <div key={s.label}>
            <div className="font-mono text-[2.5rem] sm:text-[2.75rem] leading-none font-black text-accent tabular-nums mb-2.5">
              {s.number}
            </div>
            <div className="text-xs text-dim uppercase tracking-wide mb-3">{s.label}</div>
            <div className="achv-bar h-[3px] w-full bg-accent rounded-full" />
          </div>
        ))}
      </div>

      <SectionHeader label="10 — Recognition" title="Awards & achievements." />
      <div ref={listRef} className="flex flex-col gap-8 max-w-[640px]">
        {recognition.map((c) => (
          <div key={c.title}>
            <span className="font-mono text-[0.68rem] text-accent uppercase tracking-wide block mb-1.5">
              {c.type}
            </span>
            <h4 className="text-lg sm:text-xl font-bold leading-snug mb-1.5">{c.title}</h4>
            <div className="text-sm text-dim mb-3">{c.issuer}</div>
            <div className="achv-bar h-[2px] w-full bg-accent rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
