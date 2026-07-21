import BackLink from '../ui/BackLink'
import SectionHeader from '../ui/SectionHeader'
import ProjectCard from '../projects/ProjectCard'
import { workProjects } from '../../data/projects'

export default function Work() {
  return (
    <div className="container" style={{ padding: '2rem 2rem 4rem' }}>
      <BackLink />
      <SectionHeader label="02 — Featured Work" title="Projects & initiatives." />
      {workProjects.map((project) => (
        <ProjectCard project={project} key={project.title} />
      ))}
    </div>
  )
}
