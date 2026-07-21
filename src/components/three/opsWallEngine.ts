import * as THREE from 'three'

function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return { canvas: c, ctx: c.getContext('2d')! }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Main screen: title bar, scrolling line chart, stat tiles, bar chart, status rows. */
function makeMainScreen() {
  const { canvas, ctx } = makeCanvas(1024, 640)
  const tex = new THREE.CanvasTexture(canvas)

  const series: number[] = new Array(60).fill(0.5)
  const bars = [0.4, 0.7, 0.5, 0.85, 0.6, 0.3, 0.55]
  const barTargets = bars.map(() => 0.3 + Math.random() * 0.6)

  function draw(t: number) {
    const w = canvas.width
    const h = canvas.height
    ctx.fillStyle = '#070d1a'
    ctx.fillRect(0, 0, w, h)

    // title bar
    ctx.fillStyle = '#0d1626'
    ctx.fillRect(0, 0, w, 56)
    ctx.fillStyle = '#dce4ee'
    ctx.font = 'bold 22px monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('SRE-OPS // LIVE', 24, 28)

    const pillW = 168
    ctx.fillStyle = 'rgba(53,196,107,0.15)'
    roundRect(ctx, w - pillW - 24, 14, pillW, 28, 14)
    ctx.fill()
    ctx.fillStyle = '#35c46b'
    ctx.beginPath()
    ctx.arc(w - pillW - 4, 28, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.font = 'bold 14px monospace'
    ctx.fillText('OPERATIONAL', w - pillW + 8, 28)

    // scrolling line/area chart
    const chartX = 24
    const chartY = 80
    const chartW = w - 48
    const chartH = 220
    ctx.strokeStyle = 'rgba(62,142,222,0.12)'
    ctx.lineWidth = 1
    for (let gy = 0; gy <= 4; gy++) {
      const y = chartY + (chartH / 4) * gy
      ctx.beginPath()
      ctx.moveTo(chartX, y)
      ctx.lineTo(chartX + chartW, y)
      ctx.stroke()
    }

    series.shift()
    const last = series[series.length - 1]
    const next = Math.max(0.08, Math.min(0.95, last + (Math.random() - 0.5) * 0.18))
    series.push(next)

    const grad = ctx.createLinearGradient(0, chartY, 0, chartY + chartH)
    grad.addColorStop(0, 'rgba(62,142,222,0.35)')
    grad.addColorStop(1, 'rgba(62,142,222,0)')

    ctx.beginPath()
    series.forEach((v, i) => {
      const x = chartX + (i / (series.length - 1)) * chartW
      const y = chartY + chartH - v * chartH
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.lineTo(chartX + chartW, chartY + chartH)
    ctx.lineTo(chartX, chartY + chartH)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    series.forEach((v, i) => {
      const x = chartX + (i / (series.length - 1)) * chartW
      const y = chartY + chartH - v * chartH
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = '#3e8ede'
    ctx.lineWidth = 3
    ctx.shadowColor = '#3e8ede'
    ctx.shadowBlur = 8
    ctx.stroke()
    ctx.shadowBlur = 0

    // stat tiles
    const stats = [
      { label: 'REQ/SEC', value: (1200 + Math.sin(t * 0.6) * 180).toFixed(0), color: '#7dd3fc' },
      { label: 'ERROR RATE', value: (0.02 + Math.abs(Math.sin(t * 0.9)) * 0.05).toFixed(2) + '%', color: '#35c46b' },
      { label: 'P99 LATENCY', value: (110 + Math.cos(t * 0.7) * 25).toFixed(0) + 'ms', color: '#e4a93b' },
    ]
    const tileY = chartY + chartH + 24
    const tileW = (chartW - 32) / 3
    stats.forEach((s, i) => {
      const x = chartX + i * (tileW + 16)
      ctx.fillStyle = '#0d1626'
      roundRect(ctx, x, tileY, tileW, 90, 10)
      ctx.fill()
      ctx.fillStyle = s.color
      ctx.font = 'bold 30px monospace'
      ctx.textAlign = 'left'
      ctx.fillText(s.value, x + 16, tileY + 38)
      ctx.fillStyle = '#7e8ca3'
      ctx.font = 'bold 13px monospace'
      ctx.fillText(s.label, x + 16, tileY + 68)
    })

    // bar chart
    const barY = tileY + 110
    const barH = 110
    const barW = (chartW - (bars.length - 1) * 10) / bars.length
    bars.forEach((v, i) => {
      bars[i] += (barTargets[i] - v) * 0.02
      if (Math.abs(bars[i] - barTargets[i]) < 0.02) barTargets[i] = 0.25 + Math.random() * 0.65
      const x = chartX + i * (barW + 10)
      const bh = barH * bars[i]
      ctx.fillStyle = 'rgba(62,142,222,0.8)'
      roundRect(ctx, x, barY + (barH - bh), barW, bh, 4)
      ctx.fill()
    })

    // status rows
    const rowY = barY + barH + 26
    const services = ['api-gateway', 'auth-service', 'billing-svc', 'notif-worker']
    services.forEach((name, i) => {
      const y = rowY + i * 26
      const ok = !(i === 2 && Math.floor(t) % 6 === 0)
      ctx.fillStyle = ok ? '#35c46b' : '#e4a93b'
      ctx.beginPath()
      ctx.arc(chartX + 6, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#aebbd0'
      ctx.font = '15px monospace'
      ctx.textAlign = 'left'
      ctx.fillText(name, chartX + 20, y)
      ctx.fillStyle = '#7e8ca3'
      ctx.textAlign = 'right'
      ctx.fillText(ok ? 'OK' : 'DEGRADED', chartX + chartW, y)
    })

    tex.needsUpdate = true
  }

  return { texture: tex, draw }
}

/** Small side screen: a single gauge / uptime ring. */
function makeGaugeScreen() {
  const { canvas, ctx } = makeCanvas(512, 512)
  const tex = new THREE.CanvasTexture(canvas)

  function draw(t: number) {
    const w = canvas.width
    const h = canvas.height
    ctx.fillStyle = '#070d1a'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#dce4ee'
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('UPTIME', w / 2, 60)

    const value = 0.94 + Math.sin(t * 0.4) * 0.02
    const cx = w / 2
    const cy = h / 2 + 20
    const r = 150

    ctx.lineWidth = 26
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25)
    ctx.stroke()

    ctx.strokeStyle = '#35c46b'
    ctx.shadowColor = '#35c46b'
    ctx.shadowBlur = 16
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * value)
    ctx.stroke()
    ctx.shadowBlur = 0

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 64px monospace'
    ctx.fillText((value * 100).toFixed(1) + '%', cx, cy + 10)
    ctx.fillStyle = '#7e8ca3'
    ctx.font = 'bold 16px monospace'
    ctx.fillText('ROLLING 30D', cx, cy + 55)

    tex.needsUpdate = true
  }

  return { texture: tex, draw }
}

/** Small side screen: a mini scrolling sparkline log. */
function makeLogScreen() {
  const { canvas, ctx } = makeCanvas(512, 512)
  const tex = new THREE.CanvasTexture(canvas)
  const lines: string[] = []
  const words = ['GET /health 200', 'POST /orders 201', 'GET /metrics 200', 'sync ok', 'cache hit', 'GET /users 200', 'job queued']

  function draw(t: number) {
    const w = canvas.width
    const h = canvas.height
    ctx.fillStyle = '#070d1a'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#dce4ee'
    ctx.font = 'bold 22px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('EVENT LOG', 20, 36)

    if (Math.floor(t * 2) % 2 === 0 && lines.length < 40) {
      const stamp = new Date().toISOString().slice(11, 19)
      lines.push(`${stamp} ${words[Math.floor(Math.random() * words.length)]}`)
    }
    if (lines.length > 16) lines.shift()

    ctx.font = '14px monospace'
    lines.forEach((line, i) => {
      ctx.fillStyle = i === lines.length - 1 ? '#3e8ede' : '#7e8ca3'
      ctx.fillText(line, 20, 70 + i * 24)
    })

    tex.needsUpdate = true
  }

  return { texture: tex, draw }
}

export function initOpsWall(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)
  const key = new THREE.DirectionalLight(0x9fc3e0, 0.7)
  key.position.set(2, 4, 4)
  scene.add(key)

  const rig = new THREE.Group()
  scene.add(rig)

  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x0d1420, roughness: 0.6, metalness: 0.2 })
  const standMat = new THREE.MeshStandardMaterial({ color: 0x1a2233, roughness: 0.7 })

  function buildMonitor(width: number, height: number, screenTex: THREE.Texture) {
    const g = new THREE.Group()
    const depth = 0.12
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bezelMat)
    g.add(bezel)
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(width - 0.14, height - 0.14),
      new THREE.MeshBasicMaterial({ map: screenTex }),
    )
    screen.position.z = depth / 2 + 0.001
    g.add(screen)
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 0.6, 10), standMat)
    stand.position.y = -height / 2 - 0.3
    g.add(stand)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.05, 24), standMat)
    base.position.y = -height / 2 - 0.6
    g.add(base)
    return g
  }

  const main = makeMainScreen()
  const gauge = makeGaugeScreen()
  const log = makeLogScreen()

  const mainMonitor = buildMonitor(4.2, 2.7, main.texture)
  mainMonitor.position.set(0, 0.3, 0)
  rig.add(mainMonitor)

  const leftMonitor = buildMonitor(2.0, 2.0, gauge.texture)
  leftMonitor.position.set(-3.3, 0.1, -0.6)
  leftMonitor.rotation.y = 0.45
  rig.add(leftMonitor)

  const rightMonitor = buildMonitor(2.0, 2.0, log.texture)
  rightMonitor.position.set(3.3, 0.1, -0.6)
  rightMonitor.rotation.y = -0.45
  rig.add(rightMonitor)

  camera.position.set(0, 0.4, 6.4)
  camera.lookAt(0, 0.1, 0)

  let mouseX = 0
  function onMouseMove(e: MouseEvent) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouseMove)

  let rafId = 0
  let t = 0
  function animate() {
    rafId = requestAnimationFrame(animate)
    t += 0.016
    main.draw(t)
    gauge.draw(t)
    log.draw(t)
    rig.rotation.y += (mouseX * 0.15 - rig.rotation.y) * 0.04
    renderer.render(scene, camera)
  }
  animate()

  return function cleanup() {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        const material = obj.material
        if (Array.isArray(material)) material.forEach((m) => m.dispose())
        else material?.dispose()
      }
    })
    main.texture.dispose()
    gauge.texture.dispose()
    log.texture.dispose()
    renderer.dispose()
  }
}
