import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CustomCursor from './CustomCursor'
import GlareSweep from './GlareSweep'
// The chatbot (and the project data it reads) isn't needed until someone
// opens it, so it loads after the page is idle instead of in the main bundle.
const ChatAgent = lazy(() => import('../chatbot/ChatAgent'))

export default function Layout() {
  const [showChat, setShowChat] = useState(false)
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    const show = () => setShowChat(true)
    const start = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(show, { timeout: 4000 })
      else window.setTimeout(show, 1500)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  return (
    <>
      <GlareSweep />
      <CustomCursor />
      <NavBar />
      <main className="pb-24 overflow-x-clip">
        <Outlet />
      </main>
      {showChat && (
        <Suspense fallback={null}>
          <ChatAgent />
        </Suspense>
      )}
    </>
  )
}
