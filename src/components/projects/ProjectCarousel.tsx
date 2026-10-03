import { useEffect, useRef, useState } from 'react'
import type { ProjectItem } from '../../data/projects'
import ProjectCard from './ProjectCard'
import { PROJECT_SELECT_EVENT } from '../../utils/projectSelect'

const NAV_BTN =
  'w-9 h-9 sm:w-10 sm:h-10 rounded-full text-accent flex items-center justify-center cursor-pointer transition-[transform,color] hover:text-accent-hover hover:scale-110'

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectCarousel({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    function onSelect(e: Event) {
      const index = projects.findIndex((p) => p.title === (e as CustomEvent<string>).detail)
      if (index === -1) return
      setActive((prev) => {
        setDir(index >= prev ? 1 : -1)
        return index
      })
    }
    window.addEventListener(PROJECT_SELECT_EVENT, onSelect)
    return () => window.removeEventListener(PROJECT_SELECT_EVENT, onSelect)
  }, [projects])

  function step(delta: number) {
    setDir(delta)
    setActive((prev) => ((prev + delta) % projects.length + projects.length) % projects.length)
  }

  function jumpTo(index: number) {
    if (index === active) return
    setDir(index > active ? 1 : -1)
    setActive(index)
  }

  const touchStartX = useRef<number | null>(null)

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') step(1)
    else if (e.key === 'ArrowLeft') step(-1)
    else if (e.key === 'Home') jumpTo(0)
    else if (e.key === 'End') jumpTo(projects.length - 1)
    else return
    e.preventDefault()
  }

  const project = projects[active]

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="font-mono text-sm text-dim tabular-nums flex items-center gap-2">
          <span className="text-text">{String(active + 1).padStart(2, '0')}</span>
          <span>/ {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="journey-cta-glow relative flex items-center gap-0.5 rounded-full border-2 border-accent/70 bg-panel px-1.5 py-1.5">
          <span className="journey-cta-ring" aria-hidden="true" />
          <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={NAV_BTN}>
            <ArrowIcon direction="left" />
          </button>
          <span className="w-px h-5 bg-panel-border" aria-hidden="true" />
          <button type="button" onClick={() => step(1)} aria-label="Next project" className={NAV_BTN}>
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Jump to a project">
        {projects.map((p, i) => {
          const current = i === active
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Project ${i + 1}: ${p.title}`}
              aria-current={current ? 'true' : undefined}
              title={p.title}
              className={`h-8 min-w-8 cursor-pointer rounded-full border px-2 font-mono text-[0.7rem] tabular-nums transition-colors ${
                current
                  ? 'border-accent bg-accent text-white'
                  : 'border-panel-border-strong text-text-secondary hover:border-accent hover:text-text'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          )
        })}
      </div>

      <div
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects. Use the left and right arrow keys, Home and End to move."
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          touchStartX.current = null
          if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1)
        }}
        className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <div
          key={active}
          className="project-slide"
          style={{ '--project-slide-from': `${dir * 16}px` } as React.CSSProperties}
        >
          <ProjectCard project={project} />
        </div>
      </div>
    </div>
  )
}
