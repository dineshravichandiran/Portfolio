import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 18

export default function CometCursor() {
  const coreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const core = coreRef.current
    if (!core) return

    const isTouchDevice =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouchDevice || prefersReducedMotion) {
      core.style.display = 'none'
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let coreX = mouseX
    let coreY = mouseY

    const trail: { el: HTMLDivElement; x: number; y: number }[] = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const seg = document.createElement('div')
      const size = 12 * (1 - i / TRAIL_LENGTH) + 2
      const opacity = (1 - i / TRAIL_LENGTH) * 0.6
      seg.style.position = 'fixed'
      seg.style.top = '0'
      seg.style.left = '0'
      seg.style.width = `${size}px`
      seg.style.height = `${size}px`
      seg.style.borderRadius = '50%'
      seg.style.pointerEvents = 'none'
      seg.style.zIndex = '9998'
      seg.style.background = `radial-gradient(circle, rgba(62,142,222,${opacity}) 0%, rgba(37,99,235,${opacity * 0.5}) 60%, transparent 80%)`
      seg.style.boxShadow = `0 0 ${size}px rgba(62,142,222,${opacity * 0.5})`
      seg.style.transition = 'opacity 0.3s'
      document.body.appendChild(seg)
      trail.push({ el: seg, x: mouseX, y: mouseY })
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    function onMouseLeaveWindow() {
      core!.style.opacity = '0'
      trail.forEach((t) => (t.el.style.opacity = '0'))
    }
    function onMouseEnterWindow() {
      core!.style.opacity = '1'
      trail.forEach((t) => (t.el.style.opacity = '1'))
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    let rafId = 0
    function animate() {
      coreX += (mouseX - coreX) * 0.35
      coreY += (mouseY - coreY) * 0.35
      core!.style.transform = `translate(-50%, -50%) translate(${coreX}px, ${coreY}px)`

      let prevX = coreX
      let prevY = coreY
      trail.forEach((t) => {
        t.x += (prevX - t.x) * 0.4
        t.y += (prevY - t.y) * 0.4
        t.el.style.transform = `translate(-50%, -50%) translate(${t.x}px, ${t.y}px)`
        prevX = t.x
        prevY = t.y
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      trail.forEach((t) => t.el.remove())
    }
  }, [])

  return (
    <div
      ref={coreRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'radial-gradient(circle, rgba(125,211,252,0.9) 0%, rgba(62,142,222,0.6) 60%, transparent 80%)',
        boxShadow: '0 0 14px rgba(62,142,222,0.6)',
        transition: 'opacity 0.3s',
      }}
    />
  )
}
