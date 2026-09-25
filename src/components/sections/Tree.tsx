import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import { branches, type TreeCommit } from '../../data/tree'
import { profile } from '../../data/profile'

function shortHash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

function TimelineRow({ commit, color, side }: { commit: TreeCommit; color: string; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // One-time entrance only — unlike the rest of the site's bidirectional
  // reveals, every card here is meant to stay visible together once shown,
  // not hide again as you keep scrolling past it.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.unobserve(el)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hiddenX = side === 'left' ? '-translate-x-8' : 'translate-x-8'

  return (
    <div className="relative sm:grid sm:grid-cols-[1fr_60px_1fr] sm:items-center mb-7 sm:mb-8 last:mb-0">
      <span
        className="absolute left-0 top-1.5 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-3 h-3 rounded-full ring-4 ring-bg z-10"
        style={{ background: color }}
      />
      <div
        ref={ref}
        className={`pl-8 sm:pl-0 transition-all duration-700 ease-out ${
          side === 'left' ? 'sm:col-start-1 sm:justify-self-end' : 'sm:col-start-3 sm:justify-self-start'
        } ${visible ? 'opacity-100 translate-x-0' : `opacity-0 ${hiddenX}`}`}
      >
        <div
          className="bg-panel border border-panel-border rounded-lg px-5 py-4 max-w-[420px]"
          style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
        >
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="font-mono text-xs text-dim flex-shrink-0">{shortHash(commit.title)}</span>
            <span className="font-mono text-[0.65rem] text-dim uppercase tracking-wide">{commit.meta}</span>
          </div>
          <h4 className="text-[0.95rem] font-bold leading-snug mb-2">{commit.title}</h4>
          <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-2">{commit.desc}</p>
          {commit.link && (
            <a href={commit.link} target="_blank" rel="noopener" className="text-sm font-semibold" style={{ color }}>
              View repo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function TreeBranchSection({ branch }: { branch: (typeof branches)[number] }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="flex items-baseline gap-2.5 flex-wrap mb-8 justify-center">
        <div
          className="inline-block font-mono text-xs font-bold rounded-full border px-3 py-1 tracking-wide"
          style={{ color: branch.color, borderColor: branch.color }}
        >
          {branch.name}
        </div>
        <span className="font-mono text-[0.68rem] text-dim uppercase tracking-wide">{branch.category}</span>
      </div>

      <div className="relative">
        <div className="absolute left-[5px] top-0 bottom-0 w-[2px] sm:left-1/2 sm:-translate-x-1/2 bg-panel-border-strong" />
        {branch.commits.map((commit, i) => (
          <TimelineRow key={commit.title} commit={commit} color={branch.color} side={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
    </div>
  )
}

export default function Tree() {
  return (
    <div className="container py-8 pb-16 overflow-hidden">
      <SectionHeader label="06 — Project Tree" title="Everything I've built, branched out." />
      <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[680px] mb-10">
        A git-graph view of my work — one root, five branches, each named the way I'd tag an
        internal initiative rather than just a folder path (my own naming convention for this
        page, not an actual company's internal codenames).
      </p>

      <div className="flex items-center gap-2.5 mb-10 pb-6 border-b border-panel-border">
        <span className="w-3 h-3 rounded-full bg-bg border-2 border-dim flex-shrink-0" />
        <span className="font-mono text-sm font-bold text-text">
          {profile.name} <span className="font-normal text-dim">· root</span>
        </span>
      </div>

      {branches.map((branch) => (
        <TreeBranchSection key={branch.name} branch={branch} />
      ))}
    </div>
  )
}
