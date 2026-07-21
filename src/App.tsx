import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const SkillsPage = lazy(() => import('./pages/SkillsPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const TreePage = lazy(() => import('./pages/TreePage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const CredentialsPage = lazy(() => import('./pages/CredentialsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/journey" element={<JourneyPage />} />
      </Routes>
    </Suspense>
  )
}
