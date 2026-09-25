import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

/**
 * Terminal-style "decode" reveal: shows the real text immediately (no FOUC,
 * no layout shift, works with JS disabled or reduced-motion), then once it
 * scrolls into view, briefly scrambles through random characters before
 * settling back on the real string, left to right.
 */
export default function ScrambleText({
  text,
  className,
  charset = DEFAULT_CHARS,
  style,
}: {
  text: string
  className?: string
  charset?: string
  style?: CSSProperties
}) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = 0
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played.current) return
          played.current = true
          observer.disconnect()

          const duration = 500
          const start = performance.now()
          function tick(now: number) {
            const p = Math.min(1, (now - start) / duration)
            const revealCount = Math.floor(p * text.length)
            let out = ''
            for (let i = 0; i < text.length; i++) {
              if (text[i] === ' ') {
                out += ' '
                continue
              }
              out += i < revealCount ? text[i] : charset[Math.floor(Math.random() * charset.length)]
            }
            setDisplay(out)
            if (p < 1) rafId = requestAnimationFrame(tick)
            else setDisplay(text)
          }
          rafId = requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [text, charset])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
