import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const isTouchDevice =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouchDevice || prefersReducedMotion) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let ringScale = 1
    let hovering = false

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot!.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const isInteractive = !!target.closest('a, button, [role="button"]')
      hovering = isInteractive
      ring!.style.background = isInteractive ? 'rgba(62, 142, 222, 0.12)' : 'transparent'
    }

    function onMouseLeaveWindow() {
      dot!.style.opacity = '0'
      ring!.style.opacity = '0'
    }
    function onMouseEnterWindow() {
      dot!.style.opacity = '1'
      ring!.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    let rafId = 0
    function animate(time: number) {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ringScale += ((hovering ? 1.6 : 1) - ringScale) * 0.15
      // Gentle ambient breathing (1 -> 1.15 -> 1) so the ring reads as
      // alive even when the cursor is sitting still, layered on top of
      // (not instead of) the hover scale-up above.
      const pulse = 1.075 + Math.sin(time / 280) * 0.075
      ring!.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px) scale(${ringScale * pulse})`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: 'var(--color-accent)',
          boxShadow: '0 0 8px var(--color-accent)',
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          border: '1.5px solid var(--color-accent)',
          background: 'transparent',
          transition: 'opacity 0.3s, background 0.25s',
        }}
      />
    </>
  )
}
