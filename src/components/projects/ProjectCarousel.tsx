import { useState } from 'react'
import type { ProjectItem } from '../../data/projects'
import ProjectCard from './ProjectCard'

const ARROW_BTN =
  'w-10 h-10 rounded-full border border-panel-border-strong bg-panel/80 backdrop-blur-sm text-text-secondary flex items-center justify-center cursor-pointer transition-colors hover:border-accent hover:text-accent'

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
        <div className="flex items-center gap-2 text-dim text-xs font-mono">
          <span>← → click through</span>
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
          className={`absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 ${ARROW_BTN}`}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next project"
          className={`absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 ${ARROW_BTN}`}
        >
          →
        </button>
      </div>
    </div>
  )
}
