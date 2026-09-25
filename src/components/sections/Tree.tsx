import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { branches, type TreeCommit } from '../../data/tree'
import { profile } from '../../data/profile'

gsap.registerPlugin(ScrollTrigger)

function shortHash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

interface FlatCommit {
  commit: TreeCommit
  branchIndex: number
}

const flatCommits: FlatCommit[] = branches.flatMap((branch, branchIndex) =>
  branch.commits.map((commit) => ({ commit, branchIndex })),
)
const N = flatCommits.length

const STEP_VH = 55
const CARD_HALF_GAP = 30
const CARD_WIDTH = 400
const CARD_REST_X = CARD_HALF_GAP + CARD_WIDTH / 2
const ENTER_PUSH = 140
const EXIT_LIFT = 44

function CommitCard({
  item,
  index,
  cardRef,
}: {
  item: FlatCommit
  index: number
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const { commit, branchIndex } = item
  const branch = branches[branchIndex]

  return (
    <div
      ref={cardRef}
      data-tree-card={index}
      className="absolute top-1/2 left-1/2 w-[min(400px,88vw)] bg-panel border border-panel-border rounded-lg px-6 py-5 opacity-0"
      style={{ borderLeftColor: branch.color, borderLeftWidth: '3px', willChange: 'transform, opacity' }}
    >
      <div className="flex items-baseline gap-3 mb-2.5">
        <span className="font-mono text-xs text-dim flex-shrink-0">{shortHash(commit.title)}</span>
        <span className="font-mono text-[0.65rem] text-dim uppercase tracking-wide">{commit.meta}</span>
      </div>
      <h4 className="text-[1.02rem] font-bold leading-snug mb-2">{commit.title}</h4>
      <p className="text-text-secondary text-[0.88rem] leading-relaxed mb-3">{commit.desc}</p>
      {commit.link && (
        <a
          href={commit.link}
          target="_blank"
          rel="noopener"
          className="text-sm font-semibold"
          style={{ color: branch.color }}
        >
          View repo →
        </a>
      )}
    </div>
  )
}

function MobileTree() {
  return (
    <div className="flex flex-col gap-8">
      {branches.map((branch) => (
        <div key={branch.name}>
          <div className="flex items-baseline gap-2.5 flex-wrap mb-4">
            <div
              className="inline-block font-mono text-xs font-bold rounded-full border px-3 py-1 tracking-wide"
              style={{ color: branch.color, borderColor: branch.color }}
            >
              {branch.name}
            </div>
            <span className="font-mono text-[0.68rem] text-dim uppercase tracking-wide">{branch.category}</span>
          </div>
          <div className="flex flex-col gap-3">
            {branch.commits.map((commit, ci) => (
              <Reveal key={commit.title} delayMs={ci * 50}>
                <div
                  className="bg-panel border border-panel-border rounded-lg px-5 py-4"
                  style={{ borderLeftColor: branch.color, borderLeftWidth: '3px' }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs text-dim flex-shrink-0">{shortHash(commit.title)}</span>
                    <span className="font-mono text-[0.65rem] text-dim uppercase tracking-wide">{commit.meta}</span>
                  </div>
                  <h4 className="text-[0.98rem] font-bold leading-snug mb-2">{commit.title}</h4>
                  <p className="text-text-secondary text-[0.88rem] leading-relaxed mb-2">{commit.desc}</p>
                  {commit.link && (
                    <a
                      href={commit.link}
                      target="_blank"
                      rel="noopener"
                      className="text-sm font-semibold"
                      style={{ color: branch.color }}
                    >
                      View repo →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Tree() {
  const [isDesktop, setIsDesktop] = useState(true)
  const [activeBranchIndex, setActiveBranchIndex] = useState(0)
  const outerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activeBranchRef = useRef(0)

  useEffect(() => {
    // The pinned/alternating experience needs both a wide-enough viewport
    // and motion to be welcome — reduced-motion falls back to the same
    // plain stacked list as mobile, rather than the section going blank
    // (the pinned cards start at opacity 0 and only ever animate in via
    // the scrub effect this skips).
    const widthMq = window.matchMedia('(min-width: 900px)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setIsDesktop(widthMq.matches && !motionMq.matches)
    update()
    widthMq.addEventListener('change', update)
    motionMq.addEventListener('change', update)
    return () => {
      widthMq.removeEventListener('change', update)
      motionMq.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const outer = outerRef.current
    if (!outer) return

    const cards = cardRefs.current
    const dots = dotRefs.current

    function applyProgress(progress: number) {
      for (let i = 0; i < N; i++) {
        const el = cards[i]
        if (!el) continue
        const center = (i + 0.5) / N
        const halfWidth = 0.75 / N
        const localT = (progress - center) / halfWidth
        const dist = Math.min(Math.abs(localT), 1)
        const opacity = Math.max(0, 1 - dist)

        const side = i % 2 === 0 ? -1 : 1
        let entranceX = 0
        let exitY = 0
        if (localT < 0) entranceX = side * ENTER_PUSH * Math.min(-localT, 1)
        else if (localT > 0) exitY = -EXIT_LIFT * Math.min(localT, 1)

        const x = side * CARD_REST_X + entranceX
        el.style.opacity = String(opacity)
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${exitY}px)`
        el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none'
        el.style.zIndex = String(Math.round(opacity * 100))
      }

      let cum = 0
      let branchIdx = 0
      for (let b = 0; b < branches.length; b++) {
        const start = cum / N
        cum += branches[b].commits.length
        const end = cum / N
        if (progress >= start && progress < end) {
          branchIdx = b
          break
        }
        branchIdx = b
      }
      if (branchIdx !== activeBranchRef.current) {
        activeBranchRef.current = branchIdx
        setActiveBranchIndex(branchIdx)
      }
      dots.forEach((dot, i) => {
        if (!dot) return
        const isActive = i === branchIdx
        dot.style.transform = isActive ? 'scale(1.5)' : 'scale(1)'
        dot.style.boxShadow = isActive ? `0 0 10px ${branches[i].color}` : 'none'
      })

      if (lineRef.current) lineRef.current.style.transform = `scaleY(${progress})`
    }

    applyProgress(0)

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => applyProgress(self.progress),
    })

    return () => trigger.kill()
  }, [isDesktop])

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="06 — Project Tree" title="Everything I've built, branched out." />
      <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[680px] mb-10">
        A git-graph view of my work — one root, five branches, each named the way I'd tag an
        internal initiative rather than just a folder path (my own naming convention for this
        page, not an actual company's internal codenames).
        {isDesktop ? ' Keep scrolling — each commit takes its turn.' : ''}
      </p>

      <div className="flex items-center gap-2.5 mb-8 pb-6 border-b border-panel-border">
        <span className="w-3 h-3 rounded-full bg-bg border-2 border-dim flex-shrink-0" />
        <span className="font-mono text-sm font-bold text-text">
          {profile.name} <span className="font-normal text-dim">· root</span>
        </span>
      </div>

      {!isDesktop && <MobileTree />}

      {isDesktop && (
        <div ref={outerRef} className="relative" style={{ height: `${100 + N * STEP_VH}vh` }}>
          <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute left-1/2 top-[8%] bottom-[8%] w-[2px] -translate-x-1/2 bg-panel-border-strong" />
            <div
              ref={lineRef}
              className="absolute left-1/2 top-[8%] bottom-[8%] w-[2px] -translate-x-1/2 bg-accent origin-top"
              style={{ transform: 'scaleY(0)' }}
            />

            <div className="absolute left-1/2 top-[8%] bottom-[8%] -translate-x-1/2 flex flex-col justify-between">
              {branches.map((branch, bi) => (
                <span
                  key={branch.name}
                  ref={(el) => {
                    dotRefs.current[bi] = el
                  }}
                  className="w-3 h-3 rounded-full ring-4 ring-bg transition-transform duration-300"
                  style={{ background: branch.color }}
                />
              ))}
            </div>

            <div className="absolute left-1/2 top-[6%] -translate-x-1/2 flex items-center gap-2.5 transition-opacity duration-300">
              <div
                className="inline-block font-mono text-xs font-bold rounded-full border px-3 py-1 tracking-wide whitespace-nowrap"
                style={{ color: branches[activeBranchIndex].color, borderColor: branches[activeBranchIndex].color }}
              >
                {branches[activeBranchIndex].name}
              </div>
              <span className="font-mono text-[0.68rem] text-dim uppercase tracking-wide whitespace-nowrap">
                {branches[activeBranchIndex].category}
              </span>
            </div>

            {flatCommits.map((item, i) => (
              <CommitCard
                key={item.commit.title}
                item={item}
                index={i}
                cardRef={(el) => {
                  cardRefs.current[i] = el
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
