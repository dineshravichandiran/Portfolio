import Hero from '../components/sections/Hero'
import LiveOpsSection from '../components/dashboard/LiveOpsSection'
import FeaturedProjectsScroll from '../components/dashboard/FeaturedProjectsScroll'
import DashboardHome from '../components/dashboard/DashboardHome'

export default function DashboardPage() {
  return (
    <>
      <Hero />
      <LiveOpsSection />
      <FeaturedProjectsScroll />
      <DashboardHome />
    </>
  )
}
