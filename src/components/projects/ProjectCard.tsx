import type { ProjectItem } from '../../data/projects'
import { useSpotlight } from '../../hooks/useSpotlight'
import TechTag from '../ui/TechTag'

export default function ProjectCard({ project, active = true }: { project: ProjectItem; active?: boolean }) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>()
  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card bg-panel border border-panel-border rounded-md px-8 py-7 mb-6 transition-[opacity,transform,border-color] duration-500 ease-out hover:border-accent ${
        active ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.98]'
      }`}
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

      {project.design && (
        <div className="mb-5 pb-5 border-b border-panel-border">
          <div className="font-mono text-[0.68rem] uppercase tracking-wide text-accent mb-3">Design thinking</div>
          <div className="overflow-x-auto mb-4 rounded-sm border border-panel-border">
            <img
              src={project.design.diagram.src}
              alt={project.design.diagram.alt}
              loading="lazy"
              className="block w-full min-w-[680px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {project.design.decisions.map((d) => (
              <div key={d.choice} className="rounded-sm border border-panel-border bg-bg-raised p-3.5 text-sm leading-relaxed">
                <div className="font-semibold text-text mb-1">{d.choice}</div>
                <div className="text-dim mb-1.5">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wide">Instead of </span>
                  {d.instead}
                </div>
                <div className="text-text-secondary">{d.tradeoff}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-2">
            <span className="font-mono text-[0.68rem] uppercase tracking-wide text-accent">At 10x scale </span>
            {project.design.atScale}
          </p>
          <p className="text-sm text-dim italic">{project.design.scope}</p>
        </div>
      )}

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
          <TechTag key={tag} label={tag} />
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
