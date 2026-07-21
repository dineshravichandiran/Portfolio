import type { ProjectItem } from '../../data/projects'
import { useTilt } from '../../hooks/useTilt'

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const tiltRef = useTilt<HTMLElement>(4)
  return (
    <article
      ref={tiltRef}
      className="bg-panel border border-panel-border rounded-md px-8 py-7 mb-6"
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      <div className="font-mono text-xs text-dim uppercase tracking-wide mb-3.5 flex gap-2.5 items-center">
        <span className="text-accent font-bold">{project.year}</span>
        {project.meta}
      </div>
      <h3 className="text-xl font-bold mb-2.5">{project.title}</h3>
      <div className="flex items-center gap-2 text-sm text-ok font-semibold mb-3.5">
        {project.impact}
        {project.badge && <img src={project.badge} alt="" className="h-4" />}
      </div>
      <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-5">{project.desc}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 py-4 border-t border-b border-panel-border">
        {project.flow.map((step) => (
          <div key={step.label}>
            <div className="font-mono text-[0.68rem] uppercase tracking-wide text-accent mb-1.5">
              {step.label}
            </div>
            <div className="text-sm text-text-secondary leading-relaxed">{step.text}</div>
          </div>
        ))}
      </div>

      {project.shots && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-4">
          {project.shots.map((shot) => (
            <a key={shot.src} href={shot.src} target="_blank" rel="noopener" className="block">
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="w-full rounded-sm border border-panel-border"
              />
              <div className="text-xs text-dim mt-1.5">{shot.caption}</div>
            </a>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-dim border border-panel-border-strong rounded-full px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.note && <p className="text-sm text-dim italic mb-3">{project.note}</p>}

      {project.link && (
        <a href={project.link} target="_blank" rel="noopener" className="text-sm font-semibold text-accent">
          View repo →
        </a>
      )}
    </article>
  )
}
