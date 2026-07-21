import { useCallback, useRef } from 'react'

/**
 * Tracks the cursor position within an element via CSS custom properties
 * (--spot-x / --spot-y), driving the .spotlight-card radial-gradient glow.
 * Mutates the DOM directly instead of React state so it doesn't re-render
 * on every mousemove.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}
