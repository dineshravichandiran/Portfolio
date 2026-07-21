import { useEffect, useRef, useState } from 'react'

interface CountUpOptions {
  target: number
  suffix?: string
  decimals?: number
  comma?: boolean
}

function format(value: number, { suffix = '', decimals = 0, comma = false }: CountUpOptions) {
  let num = decimals ? value.toFixed(decimals) : Math.round(value).toString()
  if (comma) {
    num = parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }
  return num + suffix
}

export function useCountUp(options: CountUpOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(() => format(0, options))
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let animated = false
    let raf = 0

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated) return
          animated = true
          const duration = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(format(optionsRef.current.target * eased, optionsRef.current))
            if (p < 1) raf = requestAnimationFrame(tick)
            else setDisplay(format(optionsRef.current.target, optionsRef.current))
          }
          raf = requestAnimationFrame(tick)
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return { ref, display }
}
