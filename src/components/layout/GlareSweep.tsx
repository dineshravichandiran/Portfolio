import { useEffect, useRef } from 'react'

/**
 * A thin light-streak fixed to the top of the viewport whose horizontal
 * position tracks scroll progress 1:1 — no animation duration, no easing,
 * no autoplay. Scrolling down sweeps it left-to-right; scrolling back up
 * reverses it instantly, since it's just reading the current scroll
 * position each frame rather than playing a timed animation.
 */
export default function GlareSweep() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bar.style.display = 'none'
      return
    }

    let rafId = 0
    let queued = false

    function update() {
      queued = false
      const scrollTop = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0
      const xPercent = progress * 200 - 100
      bar!.style.transform = `translateX(${xPercent}%) rotate(-1deg)`
    }

    function onScroll() {
      if (queued) return
      queued = true
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] pointer-events-none z-[9000] blur-[1px]"
      style={{
        // Accent blue instead of white — white read as barely-there against
        // the dark background; the site's own accent color shows up clearly.
        background: 'linear-gradient(100deg, transparent 35%, rgba(62, 142, 222, 0.9) 50%, transparent 65%)',
        opacity: 0.9,
      }}
    />
  )
}
