import SectionHeader from '../ui/SectionHeader'
import ProjectCarousel from '../projects/ProjectCarousel'
import Reveal from '../ui/Reveal'
import { workProjects } from '../../data/projects'

export default function Work() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="02 — Featured Work" title="Projects & initiatives." />
      <Reveal variant="right">
        <ProjectCarousel projects={workProjects} />
      </Reveal>
    </div>
  )
}
