import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import ProjectCard from '../projects/ProjectCard'
import Reveal from '../ui/Reveal'
import { workProjects } from '../../data/projects'

export default function Work() {
  return (
    <div className="container py-8 pb-16">
      <BackLink />
      <SectionHeader label="02 — Featured Work" title="Projects & initiatives." />
      {workProjects.map((project, i) => (
        <Reveal key={project.title} delayMs={i * 70}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
