import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { keyProjects } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

const FEATURED_TITLES = [
  'AIOps Alert Correlation & RCA Engine',
  'Grafana + Prometheus Observability Stack',
  'Zabbix Monitoring Lab — Platform Deep-Dive',
  'Self-Healing Infrastructure on AWS',
  'End-to-End DevSecOps CI Pipeline',
  'Ansible: Zabbix Onboarding + Host Baseline',
  'Salt Self-Healing Memory Guard',
  'Personal Cloud/SRE Portfolio & 3D Career Journey',
]

const featured = FEATURED_TITLES.map((title) => keyProjects.find((p) => p.title === title)).filter(
  (p): p is (typeof keyProjects)[number] => Boolean(p),
)

export default function FeaturedProjectsScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activeIndexRef = useRef(-1)

  function setActiveBadge(idx: number) {
    if (activeIndexRef.current === idx) return
    badgeRefs.current[activeIndexRef.current]?.classList.remove('badge-active')
    activeIndexRef.current = idx
    const el = badgeRefs.current[idx]
    if (!el) return
    el.classList.add('badge-active')
    el.classList.remove('badge-blink')
    void el.offsetWidth
    el.classList.add('badge-blink')
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    activeIndexRef.current = 0
    badgeRefs.current[0]?.classList.add('badge-active')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const dot = badgeRefs.current[0]
          if (dot) {
            dot.classList.remove('badge-blink')
            void dot.offsetWidth
            dot.classList.add('badge-blink')
          }
          observer.disconnect()
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(track.children) as HTMLElement[]
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - section.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - section.clientWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const x = Number(gsap.getProperty(track, 'x')) || 0
            const centerX = section.clientWidth / 2
            let closest = 0
            let minDist = Infinity
            cards.forEach((card, idx) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2 + x
              const dist = Math.abs(cardCenter - centerX)
              if (dist < minDist) {
                minDist = dist
                closest = idx
              }
            })
            if (self.progress >= 0.97) closest = cards.length - 1
            else if (self.progress <= 0.03) closest = 0
            setActiveBadge(closest)
          },
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 border-b border-panel-border">
      <div className="container mb-10">
        <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// Work</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Featured projects.</h2>
        <div className="flex items-center gap-2 text-dim text-sm font-mono">
          <span>→</span> scroll to explore
        </div>
      </div>

      <div className="overflow-x-auto md:overflow-visible pb-4 md:pb-0">
        <div ref={trackRef} className="flex gap-5 pl-8 pr-8 md:pl-12 w-max">
          {featured.map((p, i) => (
            <Link
              key={p.title}
              to="/projects"
              className="group flex-shrink-0 w-[300px] md:w-[380px] bg-panel border border-panel-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="flex justify-between items-start mb-5">
                <span className="font-mono text-[0.7rem] text-dim uppercase tracking-wide">{p.meta}</span>
                <span
                  ref={(el) => {
                    badgeRefs.current[i] = el
                  }}
                  className="project-badge font-mono text-xs w-7 h-7 rounded-full border border-panel-border-strong flex items-center justify-center flex-shrink-0 ml-2"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2.5 group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.68rem] font-mono text-dim border border-panel-border-strong rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-ok font-mono">↑ {p.impact}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
