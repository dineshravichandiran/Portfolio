import { useState } from 'react'
import type { ProjectItem } from '../../data/projects'
import ProjectCard from './ProjectCard'

const ARROW_BTN =
  'journey-cta-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-accent/70 bg-panel text-accent flex items-center justify-center cursor-pointer transition-[transform,border-color,color] hover:border-accent hover:text-accent-hover hover:scale-110'

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

  function step(delta: number) {
    setDir(delta)
    setActive((prev) => ((prev + delta) % projects.length + projects.length) % projects.length)
  }

  const project = projects[active]

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="font-mono text-sm text-dim tabular-nums flex items-center gap-2">
          <span className="text-text">{String(active + 1).padStart(2, '0')}</span>
          <span>/ {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-accent text-xs font-mono font-semibold uppercase tracking-wide animate-pulse">
          <span>← click to browse →</span>
        </div>
      </div>

      <div className="relative">
        <div
          key={active}
          className="project-slide"
          style={{ '--project-slide-from': `${dir * 16}px` } as React.CSSProperties}
        >
          <ProjectCard project={project} />
        </div>

        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous project"
          className={`absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 ${ARROW_BTN}`}
        >
          <span className="journey-cta-ring" aria-hidden="true" />
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next project"
          className={`absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 ${ARROW_BTN}`}
        >
          <span className="journey-cta-ring" aria-hidden="true" />
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  )
}
