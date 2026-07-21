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
      <Hero />
      <LiveOpsSection />
      <DomainsGrid />
      <FeaturedProjectsScroll />
      <WhatIBring />
      <section id="about" className="border-b border-panel-border">
        <About />
      </section>
      <section id="work" className="border-b border-panel-border">
        <Work />
      </section>
      <section id="skills" className="border-b border-panel-border">
        <Skills />
      </section>
      <section id="projects" className="border-b border-panel-border">
        <Projects />
      </section>
      <section id="tree" className="border-b border-panel-border">
        <Tree />
      </section>
      <section id="timeline" className="border-b border-panel-border">
        <Timeline />
      </section>
      <section id="credentials" className="border-b border-panel-border">
        <Credentials />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}
