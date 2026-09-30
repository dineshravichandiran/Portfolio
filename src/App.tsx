import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/layout/Layout'
import IntroGate from './components/intro/IntroGate'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const OLD_SECTION_ROUTES = ['about', 'work', 'skills', 'projects', 'tree', 'timeline', 'contact']
// 'credentials' used to be one combined section; it's now split into four.
// Old bookmarked/shared links still redirect somewhere sensible.
const RENAMED_SECTION_ROUTES: [path: string, hash: string][] = [['credentials', 'achievements']]

export default function App() {
  const location = useLocation()
  // The intro gate is the dashboard's landing ritual only — it must never
  // render on /journey, which is its own full-screen 3D experience. Landing
  // directly on /journey (a shared link, a new tab) used to show the gate's
  // full-screen overlay on top of it with no way to dismiss it there,
  // blocking clicks, hiding the info panel, and reading as a broken page.
  const showIntroGate = location.pathname !== '/journey'

  return (
    <>
      {showIntroGate && <IntroGate />}
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            {OLD_SECTION_ROUTES.map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<Navigate to={`/#${slug}`} replace />} />
            ))}
            {RENAMED_SECTION_ROUTES.map(([path, hash]) => (
              <Route key={path} path={`/${path}`} element={<Navigate to={`/#${hash}`} replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/journey" element={<JourneyPage />} />
        </Routes>
      </Suspense>
      <Analytics />
    </>
  )
}
