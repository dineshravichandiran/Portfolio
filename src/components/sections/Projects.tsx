import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import ProjectCard from '../projects/ProjectCard'
import Reveal from '../ui/Reveal'
import { keyProjects } from '../../data/projects'

export default function Projects() {
  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="05 — Key Projects" title="Projects & initiatives I've delivered." />
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
        <Reveal key={project.title} delayMs={Math.min(i, 4) * 70}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
