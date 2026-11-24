import SectionHeader from '../ui/SectionHeader'
import ProjectCarousel from '../projects/ProjectCarousel'
import Reveal from '../ui/Reveal'
import { keyProjects } from '../../data/projects'

export default function Projects() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="05 / Key Projects" title="Projects & initiatives I've delivered." />
      <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[680px] mb-10">
        Start with the Flagship set: the builds that best match what platform and SRE teams hire for,
        each one run for real and written up with what was tested and what was not. Use the filters to
        browse by area. Below those are the initiatives I own in my day job: observability, root-cause
        engineering and operational standardization across enterprise SaaS platforms. I'm actively extending these into infrastructure-as-code and CI/CD automation; new
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
      <Reveal variant="scale">
        <ProjectCarousel projects={keyProjects} />
      </Reveal>
    </div>
  )
}
