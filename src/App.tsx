import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const OLD_SECTION_ROUTES = ['about', 'work', 'skills', 'projects', 'tree', 'timeline', 'credentials', 'contact']

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          {OLD_SECTION_ROUTES.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<Navigate to={`/#${slug}`} replace />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/journey" element={<JourneyPage />} />
      </Routes>
    </Suspense>
  )
}
