import { useEffect, useRef } from 'react'

type FrameEntry = { file: string; angle: number }
type Manifest = { frames: FrameEntry[]; background: string; width: number; height: number }

const MANIFEST_URL = '/hero-character/manifest.json'
const FRAMES_BASE = '/hero-character/frames/'
const CENTER_URL = '/hero-character/frames/center.webp'

// Deadzone radius (px) around the character's own screen position — within
// this, it looks straight at the cursor (eye contact) instead of turning.
const DEADZONE_PX = 90
// Response factor for the circular angle lerp — higher = snappier tracking.
const LERP_FACTOR = 0.22

function shortestAngleDelta(from: number, to: number) {
  let delta = (to - from) % 360
  if (delta > 180) delta -= 360
  if (delta < -180) delta += 360
  return delta
}

export default function CursorTrackingCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cancelled = false
    let rafId = 0

    let manifest: Manifest | null = null
    let sortedFrames: FrameEntry[] = []
    const images = new Map<string, HTMLImageElement>()
    let centerImg: HTMLImageElement | null = null

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentAngle = 0
    let inDeadzone = true

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX
      targetY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    function resize() {
      if (!canvas || !manifest) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    window.addEventListener('resize', resize)

    async function load() {
      const res = await fetch(MANIFEST_URL)
      manifest = (await res.json()) as Manifest
      if (cancelled || !manifest) return

      sortedFrames = [...manifest.frames].sort((a, b) => a.angle - b.angle)

      await Promise.all(
        sortedFrames.map(
          (f) =>
            new Promise<void>((resolve) => {
              const img = new Image()
              img.onload = () => resolve()
              img.onerror = () => resolve()
              img.src = FRAMES_BASE + f.file
              images.set(f.file, img)
            }),
        ),
      )
      centerImg = await new Promise<HTMLImageElement>((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => resolve(img)
        img.src = CENTER_URL
      })

      if (cancelled) return
      resize()
      animate()
    }

    function nearestFrame(angle: number): FrameEntry {
      let best = sortedFrames[0]
      let bestDist = Infinity
      for (const f of sortedFrames) {
        const d = Math.abs(shortestAngleDelta(angle, f.angle))
        if (d < bestDist) {
          bestDist = d
          best = f
        }
      }
      return best
    }

    function draw() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = targetX - cx
      const dy = targetY - cy
      const dist = Math.hypot(dx, dy)

      inDeadzone = dist < DEADZONE_PX

      if (!inDeadzone) {
        const targetAngle = (Math.atan2(-dy, dx) * 180) / Math.PI
        const delta = shortestAngleDelta(currentAngle, targetAngle)
        currentAngle += delta * LERP_FACTOR
      }

      const img = inDeadzone ? centerImg : images.get(nearestFrame(currentAngle).file)
      if (!img || !img.complete || img.naturalWidth === 0) return

      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)
      // Cover-fit the frame into the box
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    function animate() {
      rafId = requestAnimationFrame(animate)
      draw()
    }

    load()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
      style={{ background: '#010610' }}
    />
  )
}
