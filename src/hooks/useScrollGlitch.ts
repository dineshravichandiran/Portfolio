import { useEffect, useRef, useState } from 'react'

/** Briefly flags `active` while the user is scrolling, for a glitch-flicker effect. */
export function useScrollGlitch() {
  const [active, setActive] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const cooldownRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onScroll() {
      if (cooldownRef.current) return
      cooldownRef.current = true
      setActive(true)
      setTimeout(() => setActive(false), 400)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        cooldownRef.current = false
      }, 700)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return active
}
