import { useEffect, useRef } from 'react'
import { initOpsWall } from './opsWallEngine'

export default function OpsWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cleanup = initOpsWall(canvas)
    return cleanup
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
