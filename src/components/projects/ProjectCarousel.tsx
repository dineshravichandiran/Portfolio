import { useState } from 'react'
import type { ProjectItem } from '../../data/projects'
import ProjectCard from './ProjectCard'

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

      <div
        key={active}
        className="project-slide"
        style={{ '--project-slide-from': `${dir * 16}px` } as React.CSSProperties}
      >
        <ProjectCard project={project} />
      </div>
    </div>
  )
}
