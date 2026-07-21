import { useEffect, useRef, useState } from 'react'

/** True while the user is actively scrolling, plus a short tail-off after they stop. */
export function useScrollActive(tailMs = 500) {
  const [active, setActive] = useState(false)
  const lastScrollRef = useRef(0)
  const activeRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onScroll() {
      lastScrollRef.current = performance.now()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId = 0
    function tick() {
      const shouldBeActive = performance.now() - lastScrollRef.current < tailMs
      if (shouldBeActive !== activeRef.current) {
        activeRef.current = shouldBeActive
        setActive(shouldBeActive)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [tailMs])

  return active
}
