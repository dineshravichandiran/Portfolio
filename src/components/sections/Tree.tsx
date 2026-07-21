import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { branches } from '../../data/tree'
import { profile } from '../../data/profile'

function shortHash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

export default function Tree() {
  const [selected, setSelected] = useState<{ branch: number; commit: number } | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeBranchRef = useRef(-1)

  useEffect(() => {
    if (selected) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selected])

  useEffect(() => {
    function setActiveBranch(idx: number) {
      if (activeBranchRef.current === idx) return
      const prevDot = dotRefs.current[activeBranchRef.current]
      if (prevDot) {
        prevDot.classList.remove('marker-active')
        prevDot.style.boxShadow = ''
      }
      activeBranchRef.current = idx
      const dot = dotRefs.current[idx]
      if (dot) {
        dot.classList.add('marker-active')
        dot.style.boxShadow = `0 0 10px ${branches[idx].color}`
        dot.classList.remove('marker-blink')
        void dot.offsetWidth
        dot.classList.add('marker-blink')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = blockRefs.current.findIndex((el) => el === entry.target)
          if (idx !== -1) setActiveBranch(idx)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    blockRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeBranch = selected ? branches[selected.branch] : null
  const activeCommit = selected ? activeBranch!.commits[selected.commit] : null

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="06 — Project Tree" title="Everything I've built, branched out." />
      <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[680px] mb-10">
        A git-graph view of my work — one root, five branches, each named the way I'd tag an
        internal initiative rather than just a folder path (my own naming convention for this
        page, not an actual company's internal codenames). Click a commit to read more.
      </p>

      <div className="flex items-center gap-2.5 mb-8 pb-6 border-b border-panel-border">
        <span className="w-3 h-3 rounded-full bg-bg border-2 border-dim flex-shrink-0" />
        <span className="font-mono text-sm font-bold text-text">
          {profile.name} <span className="font-normal text-dim">· root</span>
        </span>
      </div>

      <div className="relative ml-1.5 mb-8 border-l-2 border-panel-border-strong">
        {branches.map((branch, bi) => (
          <Reveal key={branch.name} delayMs={bi * 60} className="relative pb-10 last:pb-0 pl-9">
            <div
              ref={(el) => {
                blockRefs.current[bi] = el
              }}
            >
              <span
                ref={(el) => {
                  dotRefs.current[bi] = el
                }}
                className="marker-dot absolute -left-[7px] top-0.5 w-3 h-3 rounded-full ring-4 ring-bg"
                style={{ background: branch.color }}
              />
              <div className="flex items-baseline gap-2.5 flex-wrap mb-4">
                <div
                  className="inline-block font-mono text-xs font-bold rounded-full border px-3 py-1 tracking-wide"
                  style={{ color: branch.color, borderColor: branch.color }}
                >
                  {branch.name}
                </div>
                <span className="font-mono text-[0.68rem] text-dim uppercase tracking-wide">{branch.category}</span>
              </div>
              <div className="flex flex-col gap-2.5 max-w-[620px]">
                {branch.commits.map((commit, ci) => {
                  const isActive = selected?.branch === bi && selected?.commit === ci
                  return (
                    <button
                      key={commit.title}
                      type="button"
                      title={commit.title}
                      onClick={() => setSelected({ branch: bi, commit: ci })}
                      className="flex items-baseline gap-3 w-full bg-panel border border-panel-border rounded-sm px-4 py-2.75 text-left transition-[background,transform,border-color] hover:translate-x-1 hover:border-accent"
                      style={{
                        borderColor: isActive ? branch.color : undefined,
                        borderLeftColor: branch.color,
                        borderLeftWidth: '3px',
                        background: isActive ? 'var(--color-panel-hover)' : undefined,
                      }}
                    >
                      <span className="font-mono text-xs text-dim flex-shrink-0">
                        {shortHash(commit.title)}
                      </span>
                      <span
                        className="text-[0.92rem] font-semibold leading-snug transition-colors"
                        style={{ color: isActive ? branch.color : 'var(--color-text)' }}
                      >
                        {commit.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        ref={detailRef}
        className="border rounded-md bg-panel px-8 py-7 min-h-[90px]"
        style={{ borderLeftColor: activeBranch?.color ?? 'var(--color-panel-border)', borderLeftWidth: '3px', borderColor: 'var(--color-panel-border)' }}
      >
        {!activeCommit ? (
          <div className="font-mono text-sm text-dim">// click a commit node above to see details</div>
        ) : (
          <>
            <div
              className="font-mono text-xs uppercase tracking-wide mb-2.5"
              style={{ color: activeBranch!.color }}
            >
              {activeBranch!.name} · {activeCommit.meta}
            </div>
            <h4 className="text-[1.15rem] font-bold mb-2.5">{activeCommit.title}</h4>
            <p className="text-text-secondary text-[0.95rem] leading-relaxed">{activeCommit.desc}</p>
            {activeCommit.link && (
              <a
                href={activeCommit.link}
                target="_blank"
                rel="noopener"
                className="inline-block mt-4 text-sm font-semibold text-accent"
              >
                View repo →
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}
