import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Lightbox from './Lightbox'
import Reveal from '../ui/Reveal'
import type { GalleryItem } from '../../data/gallery'

interface Props {
  items: GalleryItem[]
  label: string
  // Auto-scroll speed in pixels per second.
  speed?: number
  // 'large' is for the band near the top of the page.
  size?: 'normal' | 'large'
  // Replaces the small caption with a fuller heading that shares a row with the arrows.
  header?: ReactNode
  // 'left' drifts left (new photos arrive from the right); 'right' drifts the other way.
  direction?: 'left' | 'right'
}

const RESUME_AFTER_MS = 2500

// A shop-window style strip: it drifts left on its own, pauses the moment a
// visitor hovers, touches or tabs into it, and can be swiped, dragged or
// stepped with the arrows. The photos are rendered twice so the loop never
// shows a seam. Nothing moves by itself for visitors who prefer reduced motion.
export default function PhotoStrip({ items, label, speed = 38, size = 'normal', header, direction = 'left' }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const paused = useRef(false)
  const visible = useRef(false)
  const resumeTimer = useRef(0)
  const dragging = useRef<{ x: number; left: number } | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const halfWidth = () => (scroller.current ? scroller.current.scrollWidth / 2 : 0)

  const pauseFor = useCallback((ms = RESUME_AFTER_MS) => {
    paused.current = true
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => {
      if (scroller.current) pos.current = scroller.current.scrollLeft
      paused.current = false
    }, ms)
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0
    let last = 0

    // Moving right starts in the middle of the doubled row so there is room to travel.
    if (direction === 'right') {
      const half = halfWidth()
      if (half) {
        el.scrollLeft = half
        pos.current = half
      }
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 64) / 1000
      last = now
      if (reduced || paused.current || !visible.current || document.hidden) return
      const half = halfWidth()
      if (!half) return
      pos.current += (direction === 'right' ? -speed : speed) * dt
      if (pos.current >= half) pos.current -= half
      else if (pos.current <= 0) pos.current += half
      el.scrollLeft = pos.current
    }
    raf = requestAnimationFrame((t) => {
      last = t
      raf = requestAnimationFrame(tick)
    })

    // Keep the loop seamless when someone scrolls by hand: wrap at either end.
    const onScroll = () => {
      const half = halfWidth()
      if (!half) return
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft <= 0) el.scrollLeft += half
      if (paused.current) pos.current = el.scrollLeft
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      if (entry.isIntersecting) pos.current = el.scrollLeft
    })
    io.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer.current)
      el.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [reduced, speed, direction])

  function step(direction: 1 | -1) {
    const el = scroller.current
    if (!el) return
    pauseFor(4000)
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.7), behavior: 'smooth' })
  }

  // Mouse drag (touch uses the browser's own swipe scrolling).
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || !scroller.current) return
    dragging.current = { x: e.clientX, left: scroller.current.scrollLeft }
    pauseFor(4000)
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !scroller.current) return
    scroller.current.scrollLeft = dragging.current.left - (e.clientX - dragging.current.x)
  }
  function endDrag() {
    dragging.current = null
  }

  const loop = [...items, ...items]
  const arrow =
    'hidden sm:flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-panel-border-strong bg-panel text-text-secondary transition-colors hover:border-accent hover:text-text'

  return (
    <Reveal variant="up">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="photo-strip-frame"
        onMouseEnter={() => pauseFor(60000)}
        onMouseLeave={() => pauseFor(400)}
        onFocus={() => pauseFor(60000)}
        onBlur={() => pauseFor(400)}
        onTouchStart={() => pauseFor()}
        onTouchMove={() => pauseFor()}
        onWheel={() => pauseFor()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          {header ?? <div className="font-mono text-[0.78rem] uppercase tracking-wide text-accent">{label}</div>}
          <div className="flex shrink-0 gap-2">
            <button type="button" className={arrow} onClick={() => step(-1)} aria-label={`${label}: previous photos`}>
              <span aria-hidden="true">‹</span>
            </button>
            <button type="button" className={arrow} onClick={() => step(1)} aria-label={`${label}: next photos`}>
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="photo-strip-mask">
          <div
            ref={scroller}
            className="photo-strip flex gap-4 overflow-x-auto"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {loop.map((it, i) => {
              const copy = i >= items.length
              const fit = it.fit ?? 'cover'
              return (
                <button
                  key={`${it.src}-${copy ? 'b' : 'a'}`}
                  type="button"
                  onClick={() => setOpen(i % items.length)}
                  aria-label={`View larger: ${it.title}`}
                  aria-hidden={copy || undefined}
                  tabIndex={copy ? -1 : undefined}
                  className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-md border border-panel-border bg-panel text-left transition-colors hover:border-accent ${
                    size === 'large' ? 'w-[250px] sm:w-[340px]' : 'w-[210px] sm:w-[250px]'
                  }`}
                >
                  <div className={`aspect-[4/3] overflow-hidden ${fit === 'contain' ? 'bg-white' : 'bg-bg-raised'}`}>
                    <img
                      src={it.src}
                      alt={copy ? '' : it.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={fit === 'cover' ? { objectPosition: it.focus ?? '50% 30%' } : undefined}
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
                        fit === 'contain' ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <div className="truncate text-[0.82rem] font-semibold leading-snug text-text">{it.title}</div>
                    <div className="truncate text-[0.72rem] leading-snug text-text-secondary">{it.detail}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </Reveal>
  )
}
