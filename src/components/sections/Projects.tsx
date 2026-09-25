import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import ProjectCard from '../projects/ProjectCard'
import Reveal from '../ui/Reveal'
import { keyProjects } from '../../data/projects'

export default function Projects() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  // Tracks which project is currently most "in focus" as you scroll, for
  // the live index counter and the dim/highlight spotlight effect below —
  // natural page scroll rather than a nested scroll-snap box, since these
  // cards vary a lot in height (screenshots, flow-step length) and don't
  // fit a fixed-height "one slide at a time" layout.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = cardRefs.current.findIndex((el) => el === entry.target)
          if (idx !== -1) setActive(idx)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="container py-8 pb-16">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionHeader label="05 — Key Projects" title="Projects & initiatives I've delivered." />
        <div className="font-mono text-sm text-dim tabular-nums flex items-center gap-2 mt-6">
          <span className="text-text">{String(active + 1).padStart(2, '0')}</span>
          <span>/ {String(keyProjects.length).padStart(2, '0')}</span>
        </div>
      </div>
      <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[680px] mb-10">
        Real initiatives I own at PTC — observability, root-cause engineering, and operational
        standardization across enterprise SaaS platforms — plus work that shows initiative beyond
        the job. I'm actively extending these into infrastructure-as-code and CI/CD automation; new
        builds land on{' '}
        <a
          href="https://github.com/dineshravichandiran"
          target="_blank"
          rel="noopener"
          className="text-accent font-semibold"
        >
          GitHub
        </a>
        .
      </p>
      {keyProjects.map((project, i) => (
        <Reveal key={project.title} delayMs={Math.min(i, 4) * 70} variant="scale">
          <div
            ref={(el) => {
              cardRefs.current[i] = el
            }}
          >
            <ProjectCard project={project} active={active === i} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
