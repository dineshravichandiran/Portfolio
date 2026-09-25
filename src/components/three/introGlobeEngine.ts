import * as THREE from 'three'

/**
 * Full-screen "click to enter" globe for the intro gate. Visual language
 * matches the original hero globe (navy core, monitoring grid, status
 * nodes, glowing arcs) — same brand motif, just bigger and with an
 * `enter()` warp sequence instead of idle-only rotation.
 */
export function initIntroGlobe(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

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

  const globe = new THREE.Group()
  scene.add(globe)

  const R = 1.6

  const coreGeo = new THREE.SphereGeometry(R * 0.97, 48, 48)
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x0a1f4d, transparent: true, opacity: 0.95 })
  globe.add(new THREE.Mesh(coreGeo, coreMat))

  const gridGeo = new THREE.SphereGeometry(R, 28, 20)
  const gridMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.3 })
  globe.add(new THREE.Mesh(gridGeo, gridMat))

  const statusColors = [0x22c55e, 0x22c55e, 0x22c55e, 0x38bdf8, 0x60a5fa, 0x2563eb, 0xfbbf24]
  const nodes = new THREE.Group()
  const nodePositions: { pos: THREE.Vector3; color: number }[] = []
  for (let i = 0; i < 90; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const x = R * Math.sin(phi) * Math.cos(theta)
    const y = R * Math.sin(phi) * Math.sin(theta)
    const z = R * Math.cos(phi)
    const color = statusColors[Math.floor(Math.random() * statusColors.length)]
    const node = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.045), new THREE.MeshBasicMaterial({ color }))
    node.position.set(x, y, z)
    node.lookAt(0, 0, 0)
    nodes.add(node)
    if (i % 5 === 0) nodePositions.push({ pos: new THREE.Vector3(x, y, z), color })
  }
  globe.add(nodes)

  const arcs: THREE.Line[] = []
  const pulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[] = []
  for (let i = 0; i < nodePositions.length; i++) {
    const start = nodePositions[i].pos
    const end = nodePositions[(i + 4) % nodePositions.length].pos
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.55)
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const pts = curve.getPoints(40)
    const arcGeo = new THREE.BufferGeometry().setFromPoints(pts)
    const arcMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
    const arc = new THREE.Line(arcGeo, arcMat)
    arcs.push(arc)
    globe.add(arc)

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), new THREE.MeshBasicMaterial({ color: 0x7dd3fc }))
    globe.add(pulse)
    pulses.push({ mesh: pulse, curve, t: Math.random(), speed: 0.003 + Math.random() * 0.004 })
  }

  const atmGeo = new THREE.SphereGeometry(R * 1.16, 48, 48)
  const atmMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.12, side: THREE.BackSide })
  const atmosphere = new THREE.Mesh(atmGeo, atmMat)
  globe.add(atmosphere)

  const orbitRing = new THREE.Group()
  for (let i = 0; i < 3; i++) {
    const probe = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), new THREE.MeshBasicMaterial({ color: i === 0 ? 0x22c55e : 0x38bdf8 }))
    const a = (i / 3) * Math.PI * 2
    probe.userData = { a, r: R * 1.9, speed: 0.012 + i * 0.004, tilt: 0.4 + i * 0.3 }
    orbitRing.add(probe)
  }
  globe.add(orbitRing)

  for (let r = 0; r < 2; r++) {
    const ringGeo = new THREE.RingGeometry(R * 1.88, R * 1.9, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.14, side: THREE.DoubleSide })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2 + r * 0.5
    ring.rotation.y = r * 0.4
    globe.add(ring)
  }

  camera.position.z = 4.8

  let mouseX = 0
  let mouseY = 0
  function onMouseMove(e: MouseEvent) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
  }
  document.addEventListener('mousemove', onMouseMove)

  let entering = false
  let enterStart = 0
  const ENTER_DURATION = 1100
  let onEnterDone: (() => void) | null = null

  function enter(onDone: () => void) {
    if (entering) return
    entering = true
    enterStart = performance.now()
    onEnterDone = onDone
  }

  let t = 0
  let rafId = 0
  function animate(now: number) {
    rafId = requestAnimationFrame(animate)
    t += 0.01

    let spinBoost = 0
    if (entering) {
      const elapsed = now - enterStart
      const p = Math.min(1, elapsed / ENTER_DURATION)
      const ease = p * p * (3 - 2 * p)
      spinBoost = ease * 0.4
      camera.position.z = 4.8 - ease * 3.9
      const coreOpacity = 0.95 - ease * 0.95
      coreMat.opacity = coreOpacity
      atmMat.opacity = 0.12 + ease * 0.5
      if (p >= 1) {
        const cb = onEnterDone
        onEnterDone = null
        if (cb) cb()
      }
    }

    globe.rotation.y += 0.0032 + spinBoost

    arcs.forEach((arc, i) => {
      const mat = arc.material as THREE.LineBasicMaterial
      mat.opacity = 0.25 + Math.sin(t * 1.5 + i) * 0.18
    })

    pulses.forEach((p) => {
      p.t += p.speed
      if (p.t > 1) p.t = 0
      const pt = p.curve.getPoint(p.t)
      p.mesh.position.copy(pt)
      const mat = p.mesh.material as THREE.MeshBasicMaterial
      mat.transparent = true
      mat.opacity = Math.sin(p.t * Math.PI)
    })

    nodes.children.forEach((n, i) => {
      if (i % 7 === 0) n.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.4)
    })

    orbitRing.children.forEach((probe) => {
      const d = probe.userData as { a: number; r: number; speed: number; tilt: number }
      d.a += d.speed
      probe.position.set(Math.cos(d.a) * d.r, Math.sin(d.a) * d.r * Math.sin(d.tilt), Math.sin(d.a) * d.r * Math.cos(d.tilt))
    })

    if (!entering) {
      globe.rotation.x += (mouseY * 0.5 - globe.rotation.x) * 0.05
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
    }
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }
  rafId = requestAnimationFrame(animate)

  function cleanup() {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    document.removeEventListener('mousemove', onMouseMove)
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry?.dispose()
        const material = obj.material
        if (Array.isArray(material)) material.forEach((m) => m.dispose())
        else material?.dispose()
      }
    })
    renderer.dispose()
  }

  return { cleanup, enter }
}
