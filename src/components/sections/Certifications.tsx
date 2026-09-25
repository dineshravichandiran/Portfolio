import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import { credentials } from '../../data/credentials'

gsap.registerPlugin(ScrollTrigger)

const certifications = credentials.filter((c) => c.type === 'Certification')

const FAN_ROTATE_DEG = 9
const FAN_OFFSET_X = 150
const FAN_OFFSET_Y = 16

export default function Certifications() {
  const [active, setActive] = useState(Math.floor(certifications.length / 2))
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(stage.children) as HTMLElement[]
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.85 })
    const fanIn = () =>
      gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, overwrite: true })
    const fanOut = () =>
      gsap.to(cards, { opacity: 0, y: 40, scale: 0.85, duration: 0.35, ease: 'power1.in', stagger: 0.04, overwrite: true })

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top 85%',
      onEnter: fanIn,
      onEnterBack: fanIn,
      onLeave: fanOut,
      onLeaveBack: fanOut,
    })
    return () => trigger.kill()
  }, [])

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="11 — Certifications" title="Certifications." />

      <div
        ref={stageRef}
        className="relative h-[300px] sm:h-[320px] flex items-center justify-center mb-8"
        style={{ perspective: '1200px' }}
      >
        {certifications.map((c, i) => {
          const offset = i - active
          const isActive = offset === 0
          const hidden = Math.abs(offset) > 1
          return (
            <button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Bring "${c.title}" to front`}
              className="absolute w-[220px] sm:w-[250px] bg-panel border rounded-xl p-5 text-left cursor-pointer transition-[transform,box-shadow,border-color,opacity] duration-500 ease-out"
              style={{
                transform: `translateX(${offset * FAN_OFFSET_X}px) translateY(${Math.abs(offset) * FAN_OFFSET_Y}px) rotate(${offset * FAN_ROTATE_DEG}deg) scale(${isActive ? 1.08 : 0.9})`,
                zIndex: 10 - Math.abs(offset),
                borderColor: isActive ? 'var(--color-accent)' : 'var(--color-panel-border)',
                borderWidth: isActive ? '1.5px' : '1px',
                boxShadow: isActive
                  ? '0 22px 44px -14px rgba(62, 142, 222, 0.45)'
                  : '0 10px 24px -10px rgba(0, 0, 0, 0.5)',
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
            >
              <div className="font-mono text-[0.62rem] text-accent uppercase tracking-wide mb-3">Certified</div>
              <h4 className="text-[0.98rem] font-bold leading-snug mb-2.5">{c.title}</h4>
              <div className="text-xs text-dim">{c.issuer}</div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center gap-2">
        {certifications.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${c.title}`}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
              i === active ? 'bg-accent' : 'bg-panel-border-strong hover:bg-panel-border-strong/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
