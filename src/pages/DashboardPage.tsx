import Hero from '../components/sections/Hero'
import LiveOpsSection from '../components/dashboard/LiveOpsSection'
import DomainsGrid from '../components/dashboard/DomainsGrid'
import FeaturedProjectsScroll from '../components/dashboard/FeaturedProjectsScroll'
import WhatIBring from '../components/dashboard/WhatIBring'
import DashboardHome from '../components/dashboard/DashboardHome'

export default function DashboardPage() {
  return (
    <>
      <Hero />
      <LiveOpsSection />
      <DomainsGrid />
      <FeaturedProjectsScroll />
      <WhatIBring />
      <DashboardHome />
    </>
  )
}
