import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import LiveOpsSection from '../components/dashboard/LiveOpsSection'
import DomainsGrid from '../components/dashboard/DomainsGrid'
import FeaturedProjectsScroll from '../components/dashboard/FeaturedProjectsScroll'
import WhatIBring from '../components/dashboard/WhatIBring'
import About from '../components/sections/About'
import Work from '../components/sections/Work'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Tree from '../components/sections/Tree'
import Timeline from '../components/sections/Timeline'
import Credentials from '../components/sections/Credentials'
import Contact from '../components/sections/Contact'
import NextSection from '../components/ui/NextSection'

export default function DashboardPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [location.hash])

  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <NextSection to="live-ops" label="This Is What the Job Looks Like" />

      <section id="live-ops">
        <LiveOpsSection />
      </section>
      <NextSection to="domains" label="Where I Focus" />

      <section id="domains">
        <DomainsGrid />
      </section>
      <NextSection to="featured-projects" label="Featured Projects" />

      <section id="featured-projects">
        <FeaturedProjectsScroll />
      </section>
      <NextSection to="what-i-bring" label="What I Bring" />

      <section id="what-i-bring">
        <WhatIBring />
      </section>
      <NextSection to="about" label="Daily Operations" />

      <section id="about" className="border-b border-panel-border">
        <About />
      </section>
      <NextSection to="work" label="Featured Work" />

      <section id="work" className="border-b border-panel-border">
        <Work />
      </section>
      <NextSection to="skills" label="Platforms & Tools" />

      <section id="skills" className="border-b border-panel-border">
        <Skills />
      </section>
      <NextSection to="projects" label="Key Projects" />

      <section id="projects" className="border-b border-panel-border">
        <Projects />
      </section>
      <NextSection to="tree" label="Project Tree" />

      <section id="tree" className="border-b border-panel-border">
        <Tree />
      </section>
      <NextSection to="timeline" label="Career Journey" />

      <section id="timeline" className="border-b border-panel-border">
        <Timeline />
      </section>
      <NextSection to="credentials" label="Credentials" />

      <section id="credentials" className="border-b border-panel-border">
        <Credentials />
      </section>
      <NextSection to="contact" label="Contact" />

      <section id="contact">
        <Contact />
      </section>
    </>
  )
}
