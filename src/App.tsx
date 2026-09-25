import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
  return (
    <>
      <IntroGate />
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
    </>
  )
}
