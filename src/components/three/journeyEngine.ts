import * as THREE from 'three'

export interface SceneMilestone {
  name: string
  year: string
  role: string
  meta: string
  body: string
  tags: string[]
}

/**
 * Ported from the original standalone journey.html (vanilla Three.js r128).
 * Kept as close to verbatim as possible — same procedural city, same camera
 * rig, same milestone-stone/landmark builders — wrapped for React lifecycle:
 * everything below runs once per mount and the returned function tears it
 * all down (rAF, listeners, timers, renderer, geometries/materials).
 */
export function initJourneyScene(canvas: HTMLCanvasElement, MILESTONES: SceneMilestone[]) {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xc5dcf0, 35, 100)

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // ====================================================
  // LIGHTING
  // ====================================================
  const ambient = new THREE.AmbientLight(0xffffff, 0.55)
  scene.add(ambient)

  const sun = new THREE.DirectionalLight(0xffffff, 0.9)
  sun.position.set(20, 30, 15)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  sun.shadow.camera.near = 0.5
  sun.shadow.camera.far = 80
  sun.shadow.camera.left = -40
  sun.shadow.camera.right = 40
  sun.shadow.camera.top = 40
  sun.shadow.camera.bottom = -40
  scene.add(sun)

  const fillLight = new THREE.DirectionalLight(0xeff6ff, 0.3)
  fillLight.position.set(-15, 10, -10)
  scene.add(fillLight)

  // ====================================================
  // GROUND
  // ====================================================
  const groundGeo = new THREE.PlaneGeometry(200, 200)
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x9cb86a })
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.01
  ground.receiveShadow = true
  scene.add(ground)

  function addZonePatch(xCenter: number, xWidth: number, color: number, opacity: number) {
    const patchGeo = new THREE.PlaneGeometry(xWidth, 80)
    const patchMat = new THREE.MeshLambertMaterial({ color, transparent: true, opacity })
    const patchL = new THREE.Mesh(patchGeo, patchMat)
    patchL.rotation.x = -Math.PI / 2
    patchL.position.set(xCenter, 0, -42)
    scene.add(patchL)
    const patchR = new THREE.Mesh(patchGeo, patchMat)
    patchR.rotation.x = -Math.PI / 2
    patchR.position.set(xCenter, 0, 42)
    scene.add(patchR)
  }

  addZonePatch(7, 20, 0xd4c896, 0.25)
  addZonePatch(25, 20, 0x8db05a, 0.25)
  addZonePatch(48, 25, 0xc4b888, 0.25)

  // ====================================================
  // ROAD PATH (Curve)
  // ====================================================
  const pathPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(12, 0, -2),
    new THREE.Vector3(24, 0, 1.8),
    new THREE.Vector3(38, 0, -1.5),
    new THREE.Vector3(50, 0, 1.5),
    new THREE.Vector3(60, 0, 0),
  ]

  const curve = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.3)

  const ROAD_WIDTH = 2.2
  const roadSegments = 200
  const roadShape: number[] = []
  const roadIndices: number[] = []
  const upVec = new THREE.Vector3(0, 1, 0)

  for (let i = 0; i <= roadSegments; i++) {
    const t = i / roadSegments
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    const side = new THREE.Vector3().crossVectors(tangent, upVec).normalize()

    const left = point.clone().addScaledVector(side, ROAD_WIDTH / 2)
    const right = point.clone().addScaledVector(side, -ROAD_WIDTH / 2)
    roadShape.push(left.x, 0.01, left.z)
    roadShape.push(right.x, 0.01, right.z)

    if (i < roadSegments) {
      const a = i * 2
      const b = i * 2 + 1
      const c = (i + 1) * 2
      const d = (i + 1) * 2 + 1
      roadIndices.push(a, c, b, b, c, d)
    }
  }

  const roadGeo = new THREE.BufferGeometry()
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadShape, 3))
  roadGeo.setIndex(roadIndices)
  roadGeo.computeVertexNormals()
  const roadMat = new THREE.MeshLambertMaterial({ color: 0x334155, side: THREE.DoubleSide })
  const road = new THREE.Mesh(roadGeo, roadMat)
  road.receiveShadow = true
  scene.add(road)

  const stripePoints: THREE.Vector3[] = []
  for (let i = 0; i <= roadSegments; i += 4) {
    const t = i / roadSegments
    stripePoints.push(curve.getPointAt(t).setY(0.02))
  }
  const stripeGeo = new THREE.BufferGeometry().setFromPoints(stripePoints)
  const stripeMat = new THREE.LineDashedMaterial({
    color: 0xfacc15,
    dashSize: 0.4,
    gapSize: 0.3,
    linewidth: 2,
  })
  const stripe = new THREE.Line(stripeGeo, stripeMat)
  stripe.computeLineDistances()
  scene.add(stripe)

  // ====================================================
  // MILESTONE POSTS
  // ====================================================
  const milestoneT = [0.12, 0.36, 0.62, 0.86]
  const milestoneObjects: { group: THREE.Group; ring: THREE.Mesh; pos: THREE.Vector3 }[] = []

  function makeCompanySignTexture(name: string, year: string, num: number) {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 448
    const ctx = c.getContext('2d')!

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width, c.height)

    ctx.fillStyle = '#1e3a8a'
    ctx.fillRect(0, 0, c.width, 70)

    ctx.strokeStyle = '#1e3a8a'
    ctx.lineWidth = 10
    ctx.strokeRect(14, 14, c.width - 28, c.height - 28)

    ctx.fillStyle = '#facc15'
    ctx.beginPath()
    ctx.arc(70, 35, 26, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1e3a8a'
    ctx.font = 'bold 32px Arial, Helvetica, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(num.toString(), 70, 36)

    ctx.fillStyle = '#0a0a0a'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const maxNameWidth = c.width - 120
    let nameFontSize = 120
    ctx.font = `bold ${nameFontSize}px Arial, Helvetica, sans-serif`
    while (ctx.measureText(name).width > maxNameWidth && nameFontSize > 44) {
      nameFontSize -= 4
      ctx.font = `bold ${nameFontSize}px Arial, Helvetica, sans-serif`
    }
    ctx.fillText(name, c.width / 2, 230)

    ctx.fillStyle = '#1e3a8a'
    const maxYearWidth = c.width - 120
    let yearFontSize = 52
    ctx.font = `bold ${yearFontSize}px Arial, Helvetica, sans-serif`
    while (ctx.measureText(year).width > maxYearWidth && yearFontSize > 26) {
      yearFontSize -= 2
      ctx.font = `bold ${yearFontSize}px Arial, Helvetica, sans-serif`
    }
    ctx.fillText(year, c.width / 2, 340)

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = 8
    return tex
  }

  function buildMilestone(t: number, index: number, data: SceneMilestone) {
    const pos = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    const side = new THREE.Vector3().crossVectors(tangent, upVec).normalize()
    const offset = side.clone().multiplyScalar(2.2)

    const group = new THREE.Group()
    group.position.copy(pos.clone().add(offset))

    const postGeo = new THREE.CylinderGeometry(0.09, 0.11, 2.0, 8)
    const postMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a })
    const post = new THREE.Mesh(postGeo, postMat)
    post.position.set(0, 1.0, 0.06)
    post.castShadow = true
    group.add(post)

    const baseGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.18, 12)
    const base = new THREE.Mesh(baseGeo, postMat)
    base.position.set(0, 0.09, 0.06)
    base.castShadow = true
    group.add(base)

    const tex = makeCompanySignTexture(data.name, data.year, index + 1)

    const SIGN_WIDTH = 3.0
    const SIGN_HEIGHT = 1.4
    const SIGN_CURVE_DEPTH = 0.12
    const SEGMENTS = 16

    function buildCurvedSign(material: THREE.Material, width: number, height: number, depth: number) {
      const geo = new THREE.BufferGeometry()
      const positions: number[] = []
      const uvs: number[] = []
      const indices: number[] = []

      for (let i = 0; i <= SEGMENTS; i++) {
        const u = i / SEGMENTS
        const x = (u - 0.5) * width
        const z = -depth * (1 - Math.pow(2 * u - 1, 2))
        positions.push(x, height / 2, z)
        positions.push(x, -height / 2, z)
        uvs.push(u, 1)
        uvs.push(u, 0)
      }
      for (let i = 0; i < SEGMENTS; i++) {
        const a = i * 2
        const b = i * 2 + 1
        const c = (i + 1) * 2
        const d = (i + 1) * 2 + 1
        indices.push(a, b, c)
        indices.push(b, d, c)
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geo.setIndex(indices)
      geo.computeVertexNormals()
      return new THREE.Mesh(geo, material)
    }

    const signFront = buildCurvedSign(
      new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }),
      SIGN_WIDTH,
      SIGN_HEIGHT,
      SIGN_CURVE_DEPTH,
    )
    signFront.position.y = 2.35
    signFront.castShadow = true
    group.add(signFront)

    const signFrame = buildCurvedSign(
      new THREE.MeshLambertMaterial({ color: 0x1e3a8a, side: THREE.DoubleSide }),
      SIGN_WIDTH + 0.15,
      SIGN_HEIGHT + 0.18,
      SIGN_CURVE_DEPTH + 0.04,
    )
    signFrame.position.y = 2.35
    signFrame.position.z = 0.02
    group.add(signFrame)

    group.lookAt(pos.x, group.position.y, pos.z)

    const ringGeo = new THREE.RingGeometry(0.8, 1.1, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(pos)
    ring.position.y = 0.02
    scene.add(ring)

    scene.add(group)
    milestoneObjects.push({ group, ring, pos })
  }

  milestoneT.forEach((t, i) => buildMilestone(t, i, MILESTONES[i]))

  // ====================================================
  // REALISTIC CITY SURROUNDINGS
  // ====================================================
  const ZONES = {
    CHENNAI: { xStart: -5, xEnd: 15 },
    BANGALORE: { xStart: 15, xEnd: 35 },
    PUNE: { xStart: 35, xEnd: 65 },
  }

  const MILESTONE_EXCLUSION_X = [6, 17, 28, 40, 52]
  const MILESTONE_EXCLUSION_RADIUS = 5

  const LANDMARK_EXCLUSION = [
    { x: 7, z: -8 },
    { x: 18, z: -13 },
    { x: 46, z: -9 },
  ]
  const LANDMARK_EXCLUSION_RADIUS = 11

  function randomInZone(zone: { xStart: number; xEnd: number }, minDist = 4, maxDist = 16) {
    for (let tries = 0; tries < 40; tries++) {
      const x = zone.xStart + Math.random() * (zone.xEnd - zone.xStart)
      const side = Math.random() < 0.5 ? 1 : -1
      const z = side * (minDist + Math.random() * (maxDist - minDist))
      let tooClose = false
      for (const mx of MILESTONE_EXCLUSION_X) {
        const dx = x - mx
        const dz = z - (side > 0 ? 2.2 : 0)
        if (Math.sqrt(dx * dx + dz * dz) < MILESTONE_EXCLUSION_RADIUS) {
          tooClose = true
          break
        }
      }
      if (!tooClose) {
        for (const lm of LANDMARK_EXCLUSION) {
          const dx = x - lm.x
          const dz = z - lm.z
          if (Math.sqrt(dx * dx + dz * dz) < LANDMARK_EXCLUSION_RADIUS) {
            tooClose = true
            break
          }
        }
      }
      if (!tooClose) return { x, z }
    }
    return {
      x: zone.xStart + Math.random() * (zone.xEnd - zone.xStart),
      z: (Math.random() < 0.5 ? 1 : -1) * (maxDist + 4),
    }
  }

  const techAnimated: { type: string; mesh: THREE.Object3D; userData: { spin: number } }[] = []

  const BUILDING_COLORS = [0xd4c5a8, 0xc8b89a, 0xe0d4bc, 0xb8a888, 0xd8c8b0, 0xccb598, 0xe8dcc8]
  const ROOF_COLORS = [0xb43d2a, 0x8a6d4f, 0x7a5a3a, 0x9a4530]

  function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function addBuilding(x: number, z: number, side: number) {
    const g = new THREE.Group()
    const floors = 2 + Math.floor(Math.random() * 4)
    const floorH = 0.8
    const h = floors * floorH
    const w = 1.8 + Math.random() * 1.2
    const d = 1.6 + Math.random() * 0.8
    const wallColor = randomFrom(BUILDING_COLORS)

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color: wallColor }))
    body.position.y = h / 2
    body.castShadow = true
    body.receiveShadow = true
    g.add(body)

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.15, 0.12, d + 0.15),
      new THREE.MeshLambertMaterial({ color: randomFrom(ROOF_COLORS) }),
    )
    roof.position.y = h + 0.06
    roof.castShadow = true
    g.add(roof)

    const parapet = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.1, 0.2, d + 0.1),
      new THREE.MeshLambertMaterial({ color: wallColor }),
    )
    parapet.position.y = h + 0.18
    g.add(parapet)

    const faceZ = (side > 0 ? -1 : 1) * (d / 2 + 0.01)
    const windowMat = new THREE.MeshLambertMaterial({ color: 0x6b8cae })
    const litWindowMat = new THREE.MeshLambertMaterial({ color: 0xfacc15, emissive: 0xfbbf24, emissiveIntensity: 0.25 })
    const cols = Math.max(2, Math.floor(w / 0.6))
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const isLit = Math.random() > 0.6
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.04), isLit ? litWindowMat : windowMat)
        const wx = -w / 2 + (c + 0.5) * (w / cols)
        win.position.set(wx, 0.5 + f * floorH, faceZ)
        g.add(win)
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.46, 0.03), new THREE.MeshLambertMaterial({ color: 0xffffff }))
        frame.position.set(wx, 0.5 + f * floorH, faceZ - (side > 0 ? 0.01 : -0.01))
        g.add(frame)
      }
    }

    const door = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.05), new THREE.MeshLambertMaterial({ color: 0x4a3520 }))
    door.position.set(0, 0.3, faceZ)
    g.add(door)

    if (Math.random() > 0.4) {
      const awningColors = [0xdc2626, 0x16a34a, 0x2563eb, 0xea580c, 0xca8a04]
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.9, 0.06, 0.5),
        new THREE.MeshLambertMaterial({ color: randomFrom(awningColors) }),
      )
      awning.position.set(0, 0.7, faceZ + (side > 0 ? -0.25 : 0.25))
      awning.rotation.x = side > 0 ? 0.3 : -0.3
      g.add(awning)
    }

    if (Math.random() > 0.5) {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.3, 12), new THREE.MeshLambertMaterial({ color: 0x1e3a8a }))
      tank.position.set(w / 4, h + 0.35, d / 4)
      const stand = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.4), new THREE.MeshLambertMaterial({ color: 0x475569 }))
      stand.position.set(w / 4, h + 0.22, d / 4)
      g.add(stand)
      g.add(tank)
    }

    g.position.set(x, 0, z)
    g.rotation.y = (side > 0 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.1
    scene.add(g)
  }

  function addTree(x: number, z: number) {
    const g = new THREE.Group()
    const trunkH = 0.8 + Math.random() * 0.6
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, trunkH, 8), new THREE.MeshLambertMaterial({ color: 0x5d4037 }))
    trunk.position.y = trunkH / 2
    trunk.castShadow = true
    g.add(trunk)

    const greens = [0x2d5a27, 0x357a38, 0x3f8c3f]
    const canopyBase = trunkH + 0.3
    for (let i = 0; i < 3; i++) {
      const r = 0.6 - i * 0.12
      const blob = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), new THREE.MeshLambertMaterial({ color: greens[i % greens.length] }))
      blob.position.set((Math.random() - 0.5) * 0.2, canopyBase + i * 0.35, (Math.random() - 0.5) * 0.2)
      blob.castShadow = true
      g.add(blob)
    }

    g.position.set(x, 0, z)
    g.scale.setScalar(0.85 + Math.random() * 0.5)
    scene.add(g)
  }

  function addStreetLamp(x: number, side: number) {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.6, 8), new THREE.MeshLambertMaterial({ color: 0x374151 }))
    pole.position.y = 1.3
    pole.castShadow = true
    g.add(pole)
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 6), new THREE.MeshLambertMaterial({ color: 0x374151 }))
    arm.position.set(side > 0 ? -0.3 : 0.3, 2.5, 0)
    arm.rotation.z = (Math.PI / 2.5) * (side > 0 ? 1 : -1)
    g.add(arm)
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.18), new THREE.MeshLambertMaterial({ color: 0x1f2937 }))
    lamp.position.set(side > 0 ? -0.6 : 0.6, 2.55, 0)
    g.add(lamp)
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff8dc }))
    bulb.position.set(side > 0 ? -0.6 : 0.6, 2.47, 0)
    g.add(bulb)

    let bestDx = Infinity
    let roadZ = 0
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const p = curve.getPointAt(t)
      const dx = Math.abs(p.x - x)
      if (dx < bestDx) {
        bestDx = dx
        roadZ = p.z
      }
    }
    g.position.set(x, 0, roadZ + side * 2.6)
    scene.add(g)
  }

  function addCar(x: number, side: number) {
    const g = new THREE.Group()
    const carColors = [0xb91c1c, 0x1d4ed8, 0xfafafa, 0x171717, 0x6b7280, 0x059669, 0xd97706]
    const bodyColor = randomFrom(carColors)

    const lower = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 0.66), new THREE.MeshLambertMaterial({ color: bodyColor }))
    lower.position.y = 0.28
    lower.castShadow = true
    g.add(lower)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.28, 0.6), new THREE.MeshLambertMaterial({ color: bodyColor }))
    cabin.position.set(-0.05, 0.55, 0)
    cabin.castShadow = true
    g.add(cabin)

    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.2, 0.62), new THREE.MeshLambertMaterial({ color: 0x1f2937 }))
    glass.position.set(-0.05, 0.55, 0)
    glass.scale.set(0.98, 0.9, 1.02)
    g.add(glass)

    for (const wx of [-0.45, 0.45]) {
      for (const wz of [-0.34, 0.34]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 12), new THREE.MeshLambertMaterial({ color: 0x111111 }))
        wheel.rotation.x = Math.PI / 2
        wheel.position.set(wx, 0.16, wz)
        g.add(wheel)
      }
    }

    for (const hz of [-0.22, 0.22]) {
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff8dc }))
      light.position.set(0.7, 0.3, hz)
      light.scale.set(0.5, 1, 1)
      g.add(light)
    }

    let bestT = 0
    let bestDx = Infinity
    let roadZ = 0
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const p = curve.getPointAt(t)
      const dx = Math.abs(p.x - x)
      if (dx < bestDx) {
        bestDx = dx
        roadZ = p.z
        bestT = t
      }
    }
    void bestT
    g.position.set(x, 0, roadZ + side * 4.2)
    g.rotation.y = Math.PI / 2 + (Math.random() - 0.5) * 0.15
    scene.add(g)
  }

  function addBusStop(x: number, side: number) {
    const g = new THREE.Group()
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.7), new THREE.MeshLambertMaterial({ color: 0x1e3a8a }))
    roof.position.y = 1.4
    roof.castShadow = true
    g.add(roof)
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.05), new THREE.MeshLambertMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.6 }))
    back.position.set(0, 0.9, -0.3)
    g.add(back)
    for (const px of [-0.7, 0.7]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), new THREE.MeshLambertMaterial({ color: 0x374151 }))
      post.position.set(px, 0.7, -0.3)
      g.add(post)
    }
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 0.25), new THREE.MeshLambertMaterial({ color: 0x6b5339 }))
    bench.position.set(0, 0.4, -0.1)
    g.add(bench)

    g.position.set(x, 0, side * 2.2)
    g.rotation.y = side > 0 ? 0 : Math.PI
    scene.add(g)
  }

  ;[ZONES.CHENNAI, ZONES.BANGALORE, ZONES.PUNE].forEach((zone) => {
    for (let i = 0; i < 10; i++) {
      const p = randomInZone(zone, 4, 13)
      addBuilding(p.x, p.z, p.z > 0 ? 1 : -1)
    }
  })

  ;[ZONES.CHENNAI, ZONES.BANGALORE, ZONES.PUNE].forEach((zone) => {
    for (let i = 0; i < 8; i++) {
      const p = randomInZone(zone, 3, 10)
      addTree(p.x, p.z)
    }
  })

  for (let x = 4; x < 60; x += 7) {
    addStreetLamp(x, 1)
    addStreetLamp(x + 3.5, -1)
  }

  addCar(7, -1)
  addCar(20, -1)
  addCar(31, -1)
  addCar(50, -1)

  addBusStop(12, 1)
  addBusStop(28, 1)
  addBusStop(46, -1)

  // ====================================================
  // SIGNATURE INDIAN LANDMARKS
  // ====================================================
  function buildChennaiLandmark(x: number) {
    const g = new THREE.Group()
    const archMat = new THREE.MeshLambertMaterial({ color: 0xe8dcc0 })

    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 4, 12), archMat)
      pillar.position.set(0, 2, side * 1.8)
      pillar.castShadow = true
      g.add(pillar)
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.4, 0.4, 12), archMat)
      cap.position.set(0, 4.1, side * 1.8)
      g.add(cap)
    }

    const archCurve = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.35, 12, 24, Math.PI), archMat)
    archCurve.position.set(0, 4.2, 0)
    archCurve.rotation.y = Math.PI / 2
    archCurve.castShadow = true
    g.add(archCurve)

    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshLambertMaterial({ color: 0xc97f4a }),
    )
    dome.position.set(0, 5.6, 0)
    dome.castShadow = true
    g.add(dome)
    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5, 8), new THREE.MeshLambertMaterial({ color: 0xfacc15 }))
    finial.position.set(0, 6.3, 0)
    g.add(finial)

    const signCanvas = document.createElement('canvas')
    signCanvas.width = 640
    signCanvas.height = 160
    const sctx = signCanvas.getContext('2d')!
    sctx.fillStyle = '#1e3a8a'
    sctx.fillRect(0, 0, 640, 160)
    sctx.strokeStyle = '#facc15'
    sctx.lineWidth = 8
    sctx.strokeRect(6, 6, 628, 148)
    sctx.fillStyle = '#facc15'
    sctx.font = 'bold 64px Arial, Helvetica, sans-serif'
    sctx.textAlign = 'center'
    sctx.textBaseline = 'middle'
    sctx.fillText('MARINA BEACH', 320, 82)
    const tex = new THREE.CanvasTexture(signCanvas)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = 8
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }))
    panel.position.set(0, 3.4, 0)
    g.add(panel)

    for (const side of [-1, 1]) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 2, 8), new THREE.MeshLambertMaterial({ color: 0x6b4f2a }))
      trunk.position.set(-1, 1, side * 3)
      g.add(trunk)
      for (let f = 0; f < 5; f++) {
        const frond = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.9, 4), new THREE.MeshLambertMaterial({ color: 0x4a7c3e }))
        const a = (f / 5) * Math.PI * 2
        frond.position.set(-1 + Math.cos(a) * 0.3, 2, side * 3 + Math.sin(a) * 0.3)
        frond.rotation.z = Math.cos(a) * 1
        frond.rotation.x = Math.sin(a) * 1
        g.add(frond)
      }
    }

    g.position.set(x, 0, -8)
    g.rotation.y = 0.3
    scene.add(g)
  }

  function buildBangaloreLandmark(x: number) {
    const g = new THREE.Group()
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0xddd6c5 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(5, 2.2, 2), stoneMat)
    body.position.y = 1.1
    body.castShadow = true
    g.add(body)

    for (let i = 0; i < 7; i++) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 2, 10), stoneMat)
      col.position.set(-2.1 + i * 0.7, 1, 1.05)
      col.castShadow = true
      g.add(col)
    }

    for (let s = 0; s < 3; s++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(5 + s * 0.4, 0.15, 2.4 + s * 0.3), stoneMat)
      step.position.set(0, 0.08 + s * 0.15, 1 + s * 0.15)
      g.add(step)
    }

    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat)
    dome.position.set(0, 2.2, 0)
    dome.castShadow = true
    g.add(dome)
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 0.5, 20), stoneMat)
    drum.position.set(0, 2.2, 0)
    g.add(drum)
    const domeFinial = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.8, 10),
      new THREE.MeshLambertMaterial({ color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 0.15 }),
    )
    domeFinial.position.set(0, 3.7, 0)
    g.add(domeFinial)

    for (const sx of [-1.8, 1.8]) {
      for (const sz of [-0.6, 0.6]) {
        const smallDome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat)
        smallDome.position.set(sx, 2.4, sz)
        g.add(smallDome)
        const sFinial = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 8), new THREE.MeshLambertMaterial({ color: 0xfacc15 }))
        sFinial.position.set(sx, 2.95, sz)
        g.add(sFinial)
      }
    }

    const signCanvas = document.createElement('canvas')
    signCanvas.width = 640
    signCanvas.height = 160
    const sctx = signCanvas.getContext('2d')!
    sctx.fillStyle = '#1e3a8a'
    sctx.fillRect(0, 0, 640, 160)
    sctx.strokeStyle = '#facc15'
    sctx.lineWidth = 8
    sctx.strokeRect(6, 6, 628, 148)
    sctx.fillStyle = '#facc15'
    sctx.font = 'bold 56px Arial, Helvetica, sans-serif'
    sctx.textAlign = 'center'
    sctx.textBaseline = 'middle'
    sctx.fillText('VIDHANA SOUDHA', 320, 82)
    const tex = new THREE.CanvasTexture(signCanvas)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = 8
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.0), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }))
    panel.position.set(0, 4.6, 1.05)
    g.add(panel)

    g.position.set(x - 4, 0, -13)
    g.rotation.y = 0.25
    scene.add(g)
  }

  function buildPuneLandmark(x: number) {
    const g = new THREE.Group()
    const fortMat = new THREE.MeshLambertMaterial({ color: 0x8a6d4f })
    const fortDark = new THREE.MeshLambertMaterial({ color: 0x6b5339 })

    const wall = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 1.2), fortMat)
    wall.position.y = 2
    wall.castShadow = true
    g.add(wall)

    const gateArch = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.5, 1.3), fortDark)
    gateArch.position.set(0, 1.25, 0)
    g.add(gateArch)
    const gateTop = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.3, 16, 1, false, 0, Math.PI), fortDark)
    gateTop.position.set(0, 2.5, 0)
    gateTop.rotation.z = Math.PI / 2
    gateTop.rotation.y = Math.PI / 2
    g.add(gateTop)

    for (let i = 0; i < 9; i++) {
      const merlon = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 4), fortMat)
      merlon.position.set(-2.5 + i * 0.625, 4.25, 0)
      merlon.rotation.y = Math.PI / 4
      g.add(merlon)
    }

    for (const side of [-1, 1]) {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 4.5, 16), fortMat)
      tower.position.set(side * 3, 2.25, 0)
      tower.castShadow = true
      g.add(tower)
      const towerTop = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.85, 0.4, 16), fortDark)
      towerTop.position.set(side * 3, 4.6, 0)
      g.add(towerTop)
      const towerDome = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), fortMat)
      towerDome.position.set(side * 3, 4.8, 0)
      g.add(towerDome)
    }

    const doors = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.3, 0.15), new THREE.MeshLambertMaterial({ color: 0x3a2818 }))
    doors.position.set(0, 1.15, 0.6)
    g.add(doors)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        const stud = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshLambertMaterial({ color: 0x171717 }))
        stud.position.set(-0.4 + col * 0.4, 0.4 + row * 0.5, 0.68)
        g.add(stud)
      }
    }

    const signCanvas = document.createElement('canvas')
    signCanvas.width = 640
    signCanvas.height = 160
    const sctx = signCanvas.getContext('2d')!
    sctx.fillStyle = '#1e3a8a'
    sctx.fillRect(0, 0, 640, 160)
    sctx.strokeStyle = '#facc15'
    sctx.lineWidth = 8
    sctx.strokeRect(6, 6, 628, 148)
    sctx.fillStyle = '#facc15'
    sctx.font = 'bold 58px Arial, Helvetica, sans-serif'
    sctx.textAlign = 'center'
    sctx.textBaseline = 'middle'
    sctx.fillText('SHANIWAR WADA', 320, 82)
    const tex = new THREE.CanvasTexture(signCanvas)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = 8
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.0), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }))
    panel.position.set(0, 4.6, 0.7)
    g.add(panel)

    g.position.set(x, 0, -9)
    g.rotation.y = 0.25
    scene.add(g)
  }

  buildChennaiLandmark(7)
  buildBangaloreLandmark(22)
  buildPuneLandmark(46)

  // ====================================================
  // CITY ROADSIDE SIGN + KM MARKERS
  // ====================================================
  function makeMilestoneStone(x: number, cityName: string, kmText: string) {
    const g = new THREE.Group()
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0xf5f5f0 })
    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xf4c430 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.78, 0.42), bodyMat)
    body.position.set(0, 0.5, 0)
    body.castShadow = true
    g.add(body)

    const domeGeo = new THREE.SphereGeometry(0.36, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const dome = new THREE.Mesh(domeGeo, yellowMat)
    dome.scale.set(1, 0.65, 0.6)
    dome.position.set(0, 0.89, 0)
    dome.castShadow = true
    g.add(dome)

    const band = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.42), yellowMat)
    band.position.set(0, 0.86, 0)
    g.add(band)

    function makeStoneText(lines: [string, string?]) {
      const c = document.createElement('canvas')
      c.width = 256
      c.height = 256
      const ctx = c.getContext('2d')!
      ctx.clearRect(0, 0, 256, 256)
      ctx.fillStyle = '#1a1a1a'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      let fs = 52
      ctx.font = `bold ${fs}px Arial, sans-serif`
      while (ctx.measureText(lines[0]).width > 220 && fs > 20) {
        fs -= 2
        ctx.font = `bold ${fs}px Arial, sans-serif`
      }
      ctx.fillText(lines[0], 128, lines[1] ? 120 : 128)
      if (lines[1]) {
        ctx.font = 'bold 36px Arial, sans-serif'
        ctx.fillStyle = '#c0392b'
        ctx.fillText(lines[1], 128, 185)
      }
      const t = new THREE.CanvasTexture(c)
      t.minFilter = THREE.LinearFilter
      t.magFilter = THREE.LinearFilter
      t.anisotropy = 8
      return t
    }

    const bodyTex = makeStoneText([cityName, kmText])
    const bodyFace = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), new THREE.MeshLambertMaterial({ map: bodyTex, transparent: true }))
    bodyFace.position.set(0, 0.5, 0.215)
    g.add(bodyFace)

    const backFace = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), new THREE.MeshLambertMaterial({ map: bodyTex, transparent: true }))
    backFace.position.set(0, 0.5, -0.215)
    backFace.rotation.y = Math.PI
    g.add(backFace)

    const stoneBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.5), new THREE.MeshLambertMaterial({ color: 0xcfcfc8 }))
    stoneBase.position.set(0, 0.06, 0)
    g.add(stoneBase)

    g.position.set(x, 0, 2.8)
    g.rotation.y = -Math.PI / 2 - 0.25
    scene.add(g)
  }

  makeMilestoneStone(3, 'CHENNAI', 'START')
  makeMilestoneStone(16, 'BANGALORE', '↑')
  makeMilestoneStone(34, 'PUNE', '↑')

  function addKmMarker(x: number, side: number) {
    const g = new THREE.Group()
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.6, 6), new THREE.MeshLambertMaterial({ color: 0xfafafa }))
    post.position.y = 0.3
    g.add(post)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.04), new THREE.MeshLambertMaterial({ color: 0xdc2626 }))
    cap.position.y = 0.55
    g.add(cap)
    let bestDx = Infinity
    let roadZ = 0
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const p = curve.getPointAt(t)
      const dx = Math.abs(p.x - x)
      if (dx < bestDx) {
        bestDx = dx
        roadZ = p.z
      }
    }
    g.position.set(x, 0, roadZ + side * 3.2)
    scene.add(g)
  }
  for (let x = 9; x < 58; x += 13) {
    addKmMarker(x, -1)
  }

  // ====================================================
  // THE SUNRISE HORIZON ENDING
  // ====================================================
  ;(function buildSunriseEnding() {
    const ENDING_X = 62

    const sunGeo = new THREE.SphereGeometry(4, 32, 24)
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    const sunMesh = new THREE.Mesh(sunGeo, sunMat)
    sunMesh.position.set(ENDING_X + 18, 3, 0)
    scene.add(sunMesh)

    const haloGeo = new THREE.SphereGeometry(6, 32, 24)
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.35 })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.position.copy(sunMesh.position)
    scene.add(halo)
    const haloGeo2 = new THREE.SphereGeometry(8.5, 32, 24)
    const haloMat2 = new THREE.MeshBasicMaterial({ color: 0xfef3c7, transparent: true, opacity: 0.18 })
    const halo2 = new THREE.Mesh(haloGeo2, haloMat2)
    halo2.position.copy(sunMesh.position)
    scene.add(halo2)

    const skyCanvas = document.createElement('canvas')
    skyCanvas.width = 512
    skyCanvas.height = 512
    const sctx = skyCanvas.getContext('2d')!
    const skyGrad = sctx.createLinearGradient(0, 0, 0, 512)
    skyGrad.addColorStop(0, '#1e3a8a')
    skyGrad.addColorStop(0.4, '#7c5cbf')
    skyGrad.addColorStop(0.65, '#f472b6')
    skyGrad.addColorStop(0.85, '#fb923c')
    skyGrad.addColorStop(1, '#fbbf24')
    sctx.fillStyle = skyGrad
    sctx.fillRect(0, 0, 512, 512)
    const skyTex = new THREE.CanvasTexture(skyCanvas)
    const skyPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 35),
      new THREE.MeshBasicMaterial({ map: skyTex, transparent: true, opacity: 0.9 }),
    )
    skyPanel.position.set(ENDING_X + 25, 8, 0)
    skyPanel.rotation.y = -Math.PI / 2
    scene.add(skyPanel)

    const raysGroup = new THREE.Group()
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const ray = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 3, 0.15),
        new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.5 }),
      )
      ray.position.set(Math.cos(angle) * 5, Math.sin(angle) * 5, 0)
      ray.rotation.z = angle + Math.PI / 2
      raysGroup.add(ray)
    }
    raysGroup.position.copy(sunMesh.position)
    scene.add(raysGroup)
    techAnimated.push({ type: 'sunrays', mesh: raysGroup, userData: { spin: 0.002 } })

    const tbcCanvas = document.createElement('canvas')
    tbcCanvas.width = 1024
    tbcCanvas.height = 320
    const tctx = tbcCanvas.getContext('2d')!
    tctx.fillStyle = 'rgba(15, 23, 42, 0.85)'
    tctx.fillRect(0, 0, 1024, 320)
    tctx.strokeStyle = '#fbbf24'
    tctx.lineWidth = 8
    tctx.strokeRect(20, 20, 984, 280)
    tctx.fillStyle = '#fbbf24'
    tctx.font = 'bold 90px Arial, Helvetica, sans-serif'
    tctx.textAlign = 'center'
    tctx.textBaseline = 'middle'
    tctx.fillText('THE FUTURE AWAITS', 512, 120)
    tctx.fillStyle = '#e2e8f0'
    tctx.font = 'bold 38px Arial, Helvetica, sans-serif'
    tctx.fillText('Always learning, always growing...', 512, 210)
    const tbcTex = new THREE.CanvasTexture(tbcCanvas)
    tbcTex.minFilter = THREE.LinearFilter

    const tbcSign = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 1.9),
      new THREE.MeshBasicMaterial({ map: tbcTex, transparent: true, side: THREE.DoubleSide }),
    )
    tbcSign.position.set(ENDING_X, 3.5, 0)
    tbcSign.rotation.y = -Math.PI / 2
    scene.add(tbcSign)

    const glowStrip = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.4 }))
    glowStrip.rotation.x = -Math.PI / 2
    glowStrip.position.set(ENDING_X + 6, 0.05, 0)
    scene.add(glowStrip)

    for (let i = 0; i < 5; i++) {
      const mtn = new THREE.Mesh(
        new THREE.ConeGeometry(3 + Math.random() * 2, 5 + Math.random() * 3, 6),
        new THREE.MeshLambertMaterial({ color: 0x6d4f8a }),
      )
      mtn.position.set(ENDING_X + 14 + Math.random() * 6, 1.5, -12 + i * 6)
      scene.add(mtn)
    }
  })()

  // ====================================================
  // CLOUDS / MOUNTAINS / BIRDS
  // ====================================================
  const clouds: THREE.Group[] = []
  function makeCloud(x: number, y: number, z: number, scale: number) {
    const cloud = new THREE.Group()
    const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
    const puffCount = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < puffCount; i++) {
      const r = 0.7 + Math.random() * 0.5
      const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), cloudMat)
      puff.position.set((i - puffCount / 2) * 0.9, Math.random() * 0.3, Math.random() * 0.4 - 0.2)
      cloud.add(puff)
    }
    cloud.position.set(x, y, z)
    cloud.scale.setScalar(scale)
    cloud.userData.driftSpeed = 0.005 + Math.random() * 0.008
    cloud.userData.startX = x
    scene.add(cloud)
    clouds.push(cloud)
  }

  for (let i = 0; i < 12; i++) {
    makeCloud(-30 + Math.random() * 90, 8 + Math.random() * 8, -40 + Math.random() * 80, 1.2 + Math.random() * 1.8)
  }

  function makeMountain(x: number, z: number, height: number, color: number) {
    const geo = new THREE.ConeGeometry(height * 0.8, height, 5)
    const mat = new THREE.MeshLambertMaterial({ color })
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, height / 2 - 0.5, z)
    m.rotation.y = Math.random() * Math.PI
    scene.add(m)
  }

  for (let i = 0; i < 8; i++) {
    const x = -40 + i * 12 + Math.random() * 3
    makeMountain(x, -55 - Math.random() * 10, 6 + Math.random() * 4, 0x94a3b8)
    makeMountain(x + 5, -65 - Math.random() * 8, 8 + Math.random() * 3, 0x64748b)
  }

  const birds: THREE.Group[] = []
  function makeBird(x: number, y: number, z: number) {
    const bird = new THREE.Group()
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x1f2937 })

    const wingL = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.08), wingMat)
    wingL.position.x = -0.15
    bird.add(wingL)

    const wingR = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.08), wingMat)
    wingR.position.x = 0.15
    bird.add(wingR)

    bird.position.set(x, y, z)
    bird.userData = {
      speed: 0.04 + Math.random() * 0.04,
      wingPhase: Math.random() * Math.PI * 2,
      flightZ: z,
      flightY: y,
      wingL,
      wingR,
    }
    scene.add(bird)
    birds.push(bird)
  }

  for (let i = 0; i < 6; i++) {
    makeBird(-50 + Math.random() * 30, 6 + Math.random() * 5, -20 + Math.random() * 40)
  }

  const floaters: THREE.Object3D[] = []

  // ====================================================
  // THE CAR
  // ====================================================
  const bike = new THREE.Group()

  const CAR_BODY = 0x2563eb
  const CAR_DARK = 0x1e40af
  const CAR_GLASS = 0x9fd4ff
  const CAR_TIRE = 0x1a1a1a
  const CAR_RIM = 0xc8cdd4
  const CAR_LIGHT = 0xfff3c4

  const bodyMat = new THREE.MeshStandardMaterial({ color: CAR_BODY, metalness: 0.5, roughness: 0.35 })
  const darkMat = new THREE.MeshStandardMaterial({ color: CAR_DARK, metalness: 0.5, roughness: 0.4 })
  const glassMat = new THREE.MeshStandardMaterial({ color: CAR_GLASS, metalness: 0.3, roughness: 0.1, transparent: true, opacity: 0.7 })
  const tireMat = new THREE.MeshStandardMaterial({ color: CAR_TIRE, metalness: 0.1, roughness: 0.85 })
  const rimMat = new THREE.MeshStandardMaterial({ color: CAR_RIM, metalness: 0.8, roughness: 0.3 })
  const lightMat = new THREE.MeshStandardMaterial({ color: CAR_LIGHT, emissive: 0xfff3c4, emissiveIntensity: 0.4 })

  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 1.5), bodyMat)
  lowerBody.position.set(0, 0.55, 0)
  lowerBody.castShadow = true
  bike.add(lowerBody)

  const bodyTrim = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.18, 1.55), darkMat)
  bodyTrim.position.set(0, 0.36, 0)
  bike.add(bodyTrim)

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 1.35), bodyMat)
  cabin.position.set(-0.1, 1.02, 0)
  cabin.castShadow = true
  bike.add(cabin)

  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 1.45), bodyMat)
  hood.position.set(1.35, 0.78, 0)
  hood.rotation.z = -0.15
  bike.add(hood)

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 1.25), glassMat)
  windshield.position.set(0.72, 1.02, 0)
  windshield.rotation.z = 0.5
  bike.add(windshield)
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 1.25), glassMat)
  rearWindow.position.set(-0.92, 1.02, 0)
  rearWindow.rotation.z = -0.5
  bike.add(rearWindow)
  for (const side of [-1, 1]) {
    const sideWin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.05), glassMat)
    sideWin.position.set(-0.1, 1.04, side * 0.68)
    bike.add(sideWin)
  }

  for (const side of [-1, 1]) {
    const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.28), lightMat)
    headlight.position.set(1.6, 0.62, side * 0.5)
    bike.add(headlight)
  }
  const tailMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, emissive: 0xcc2222, emissiveIntensity: 0.5 })
  for (const side of [-1, 1]) {
    const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.25), tailMat)
    taillight.position.set(-1.6, 0.62, side * 0.5)
    bike.add(taillight)
  }

  const carWheels: THREE.Group[] = []
  function makeWheel(x: number, z: number) {
    const wheelGroup = new THREE.Group()
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.26, 20), tireMat)
    tire.rotation.x = Math.PI / 2
    tire.castShadow = true
    wheelGroup.add(tire)
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.28, 12), rimMat)
    rim.rotation.x = Math.PI / 2
    wheelGroup.add(rim)
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: 0x888d94, metalness: 0.9, roughness: 0.2 }),
    )
    hub.rotation.x = Math.PI / 2
    wheelGroup.add(hub)

    wheelGroup.position.set(x, 0.38, z)
    bike.add(wheelGroup)
    carWheels.push(wheelGroup)
  }
  makeWheel(1.0, 0.78)
  makeWheel(1.0, -0.78)
  makeWheel(-1.0, 0.78)
  makeWheel(-1.0, -0.78)

  const hitBoxGeo = new THREE.BoxGeometry(3.8, 2.4, 2.2)
  const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false })
  const bikeHitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat)
  bikeHitBox.position.y = 1.0
  bikeHitBox.name = 'bikeHitBox'
  bike.add(bikeHitBox)

  scene.add(bike)

  // ====================================================
  // CAMERA — follow bike
  // ====================================================
  let currentT = 0
  let targetT = 0

  let cameraMode: 'follow' | 'orbit' = 'follow'
  let orbitAngle = 0
  const orbitSpeed = 0.006
  const orbitRadius = 3.5
  const orbitHeight = 1.8
  let autoOrbitAngle = 0

  function updateBikePosition() {
    const lerpSpeed = 0.04
    currentT += (targetT - currentT) * lerpSpeed
    currentT = Math.max(0, Math.min(1, currentT))

    const pos = curve.getPointAt(currentT)
    bike.position.set(pos.x, 0, pos.z)

    const tangent = curve.getTangentAt(currentT).normalize()
    const angle = Math.atan2(tangent.x, tangent.z)
    bike.rotation.y = angle - Math.PI / 2

    const distToTarget = Math.abs(targetT - currentT)
    const isStopped = distToTarget < 0.002

    const movement = distToTarget * 30
    if (carWheels.length) {
      const spin = 0.1 + movement * 0.3
      carWheels.forEach((w) => {
        w.rotation.z -= spin
      })
    }

    if (cameraMode === 'orbit') {
      orbitAngle += orbitSpeed
      const camX = pos.x + Math.cos(orbitAngle) * orbitRadius
      const camZ = pos.z + Math.sin(orbitAngle) * orbitRadius
      const targetCamPos = new THREE.Vector3(camX, pos.y + orbitHeight, camZ)
      camera.position.lerp(targetCamPos, 0.08)
      camera.lookAt(pos.x, 1.2, pos.z)
      return
    }

    if (isStopped) {
      autoOrbitAngle += 0.0025
      const r = 6.5
      const camX = pos.x + Math.cos(autoOrbitAngle) * r
      const camZ = pos.z + Math.sin(autoOrbitAngle) * r
      const targetCamPos = new THREE.Vector3(camX, pos.y + 3.2, camZ)
      camera.position.lerp(targetCamPos, 0.04)
      camera.lookAt(pos.x, 1.3, pos.z)
      return
    }

    const tangentDir = curve.getTangentAt(currentT).normalize()
    const behind = tangentDir.clone().multiplyScalar(-7)
    const sideways = new THREE.Vector3().crossVectors(tangentDir, new THREE.Vector3(0, 1, 0)).normalize()
    const targetCamPos = new THREE.Vector3(
      pos.x + behind.x + sideways.x * 1.5,
      pos.y + 4.5,
      pos.z + behind.z + sideways.z * 1.5,
    )
    camera.position.lerp(targetCamPos, 0.06)

    const lookAhead = curve.getPointAt(Math.min(currentT + 0.04, 1))
    camera.lookAt(lookAhead.x, 1.5, lookAhead.z)

    autoOrbitAngle = Math.atan2(camera.position.z - pos.z, camera.position.x - pos.x)
  }

  // ====================================================
  // RIDE TO MILESTONE
  // ====================================================
  let activeMilestone = -1
  let arriveTimer: ReturnType<typeof setTimeout> | undefined

  const infoPanel = document.getElementById('infoPanel')!
  const infoMeta = document.getElementById('infoMeta')!
  const infoTitle = document.getElementById('infoTitle')!
  const infoRole = document.getElementById('infoRole')!
  const infoBody = document.getElementById('infoBody')!
  const infoTags = document.getElementById('infoTags')!
  const infoNavCounter = document.getElementById('infoNavCounter')!
  const prevBtn = document.getElementById('prevMilestoneBtn') as HTMLButtonElement
  const nextBtn = document.getElementById('nextMilestoneBtn') as HTMLButtonElement
  const orbitToggleBtn = document.getElementById('orbitToggleBtn') as HTMLButtonElement
  const loaderEl = document.getElementById('journeyLoader')

  function rideTo(index: number) {
    targetT = milestoneT[index]
    activeMilestone = index

    if (cameraMode === 'orbit') {
      setOrbitMode(false)
    }

    infoPanel.classList.remove('visible')

    milestoneObjects.forEach((m) => {
      ;(m.ring.material as THREE.MeshBasicMaterial).opacity = 0
    })

    clearTimeout(arriveTimer)
    arriveTimer = setTimeout(() => {
      showInfo(index)
      ;(milestoneObjects[index].ring.material as THREE.MeshBasicMaterial).opacity = 0.6
    }, 1400)
  }

  function showInfo(index: number) {
    const m = MILESTONES[index]
    infoMeta.textContent = m.meta
    infoTitle.textContent = m.name
    infoRole.textContent = m.role
    infoBody.textContent = m.body
    infoTags.innerHTML = ''
    m.tags.forEach((t) => {
      const tag = document.createElement('span')
      tag.className = 'info-tag'
      tag.textContent = t
      infoTags.appendChild(tag)
    })
    infoPanel.classList.add('visible')

    infoNavCounter.textContent = `${index + 1} / ${MILESTONES.length}`
    prevBtn.disabled = index <= 0
    nextBtn.disabled = index >= MILESTONES.length - 1
  }

  function onPrevClick() {
    if (activeMilestone > 0) rideTo(activeMilestone - 1)
  }
  function onNextClick() {
    if (activeMilestone < MILESTONES.length - 1) rideTo(activeMilestone + 1)
  }
  prevBtn.addEventListener('click', onPrevClick)
  nextBtn.addEventListener('click', onNextClick)

  // ====================================================
  // ANIMATE
  // ====================================================
  const clock = new THREE.Clock()
  let rafId = 0

  function animate() {
    rafId = requestAnimationFrame(animate)
    const time = clock.elapsedTime
    clock.getDelta()

    updateBikePosition()

    clouds.forEach((cloud) => {
      cloud.position.x += cloud.userData.driftSpeed
      if (cloud.position.x > 60) cloud.position.x = -40
    })

    birds.forEach((bird) => {
      const u = bird.userData
      bird.position.x += u.speed
      bird.position.y = u.flightY + Math.sin(time * 1.5 + u.wingPhase) * 0.5
      bird.position.z = u.flightZ + Math.cos(time * 0.8 + u.wingPhase) * 2
      if (bird.position.x > 50) bird.position.x = -50
      const flap = Math.sin(time * 12 + u.wingPhase) * 0.5
      u.wingL.rotation.z = flap
      u.wingR.rotation.z = -flap
    })

    floaters.forEach((f) => {
      const u = f.userData as { rotSpeed: number; baseY: number; bobSpeed: number; bobAmp: number }
      f.rotation.x += u.rotSpeed
      f.rotation.y += u.rotSpeed * 0.7
      f.position.y = u.baseY + Math.sin(time * u.bobSpeed * 50) * u.bobAmp
    })

    techAnimated.forEach((item) => {
      if (item.type === 'sunrays') {
        item.mesh.rotation.z += item.userData.spin
      }
    })

    if (activeMilestone >= 0) {
      const ring = milestoneObjects[activeMilestone].ring
      ring.scale.setScalar(1 + Math.sin(time * 3) * 0.15)
    }

    renderer.render(scene, camera)
  }
  animate()

  camera.position.set(-6, 5, 6)
  camera.lookAt(2, 0.5, 0)

  // ====================================================
  // RESIZE
  // ====================================================
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // ====================================================
  // CLICK BIKE → 360° ORBIT VIEW
  // ====================================================
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  function refreshOrbitBtnLabel() {
    orbitToggleBtn.textContent = cameraMode === 'orbit' ? '✕ Exit 360° View' : '◉ 360° View'
  }

  function setOrbitMode(on: boolean) {
    cameraMode = on ? 'orbit' : 'follow'
    if (on) {
      orbitAngle = 0
      showOrbitHint()
    } else {
      hideOrbitHint()
    }
    refreshOrbitBtnLabel()
  }

  function onOrbitHintClick() {
    setOrbitMode(false)
  }

  function showOrbitHint() {
    let el = document.getElementById('orbitHint')
    if (!el) {
      el = document.createElement('div')
      el.id = 'orbitHint'
      el.style.cssText = `
        position: fixed; top: 7rem; left: 50%; transform: translateX(-50%);
        background: rgba(30, 58, 138, 0.95); color: white; padding: 0.7rem 1.4rem;
        border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
        letter-spacing: 0.1em; text-transform: uppercase; z-index: 20;
        box-shadow: 0 8px 24px rgba(30, 58, 138, 0.35); font-weight: 600;
        backdrop-filter: blur(8px); cursor: pointer;
      `
      el.textContent = '◉ 360° view — click anywhere to exit'
      el.addEventListener('click', onOrbitHintClick)
      document.body.appendChild(el)
    }
    el.style.display = 'block'
  }

  function hideOrbitHint() {
    const el = document.getElementById('orbitHint')
    if (el) el.style.display = 'none'
  }

  function handleCanvasClick(clientX: number, clientY: number) {
    pointer.x = (clientX / window.innerWidth) * 2 - 1
    pointer.y = -(clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObject(bike, true)

    if (hits.length > 0 && cameraMode === 'follow') {
      setOrbitMode(true)
    } else if (cameraMode === 'orbit') {
      setOrbitMode(false)
    }
  }

  function onCanvasMouseMove(e: MouseEvent) {
    if (cameraMode === 'orbit') {
      canvas.style.cursor = 'pointer'
      return
    }
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObject(bike, true)
    canvas.style.cursor = hits.length > 0 ? 'pointer' : 'default'
  }
  canvas.addEventListener('mousemove', onCanvasMouseMove)

  function onCanvasClick(e: MouseEvent) {
    if (e.target === canvas) {
      handleCanvasClick(e.clientX, e.clientY)
    }
  }
  canvas.addEventListener('click', onCanvasClick)

  function onCanvasTouchEnd(e: TouchEvent) {
    if (e.touches.length === 0 && e.changedTouches.length > 0) {
      const t = e.changedTouches[0]
      handleCanvasClick(t.clientX, t.clientY)
    }
  }
  canvas.addEventListener('touchend', onCanvasTouchEnd, { passive: true })

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && cameraMode === 'orbit') {
      setOrbitMode(false)
    }
  }
  window.addEventListener('keydown', onKeyDown)

  function onOrbitToggleClick(e: MouseEvent) {
    e.stopPropagation()
    setOrbitMode(cameraMode !== 'orbit')
  }
  orbitToggleBtn.addEventListener('click', onOrbitToggleClick)

  // ====================================================
  // START
  // ====================================================
  const loaderTimeout = setTimeout(() => {
    loaderEl?.classList.add('hidden')
  }, 800)

  const rideTimeout = setTimeout(() => {
    rideTo(0)
  }, 1600)

  // ====================================================
  // CLEANUP
  // ====================================================
  return function cleanup() {
    cancelAnimationFrame(rafId)
    clearTimeout(arriveTimer)
    clearTimeout(loaderTimeout)
    clearTimeout(rideTimeout)

    window.removeEventListener('resize', onResize)
    window.removeEventListener('keydown', onKeyDown)
    canvas.removeEventListener('mousemove', onCanvasMouseMove)
    canvas.removeEventListener('click', onCanvasClick)
    canvas.removeEventListener('touchend', onCanvasTouchEnd)
    prevBtn.removeEventListener('click', onPrevClick)
    nextBtn.removeEventListener('click', onNextClick)
    orbitToggleBtn.removeEventListener('click', onOrbitToggleClick)
    document.getElementById('orbitHint')?.remove()

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
}
