import { useCallback, useRef } from 'react'

interface SpotlightOptions {
  /** Also apply a subtle perspective tilt following the cursor, on top of the glow. */
  tilt?: boolean
  tiltStrength?: number
}

/**
 * Tracks the cursor position within an element via CSS custom properties
 * (--spot-x / --spot-y), driving the .spotlight-card radial-gradient glow.
 * Mutates the DOM directly instead of React state so it doesn't re-render
 * on every mousemove.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>(options: SpotlightOptions = {}) {
  const { tilt = false, tiltStrength = 8 } = options
  const ref = useRef<T>(null)
  const tiltAllowed = useRef(
    typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(pointer: coarse)').matches,
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--spot-x', `${x}px`)
      el.style.setProperty('--spot-y', `${y}px`)

      if (tilt && tiltAllowed.current) {
        const px = x / rect.width - 0.5
        const py = y / rect.height - 0.5
        el.style.transform = `perspective(700px) rotateX(${(-py * tiltStrength).toFixed(2)}deg) rotateY(${(px * tiltStrength).toFixed(2)}deg)`
      }
    },
    [tilt, tiltStrength],
  )

  const onMouseLeave = useCallback(() => {
    if (!tilt) return
    const el = ref.current
    if (el) el.style.transform = ''
  }, [tilt])

  return { ref, onMouseMove, onMouseLeave }
}
