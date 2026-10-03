import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import {
  SCENARIOS,
  runIncident,
  type ActionType,
  type Metrics,
  type ScenarioId,
} from '../../lib/sreAgent'

const STEP_DELAY_MS = 1100

const BADGE_STYLE: Record<ActionType, string> = {
  GET_LOGS: 'border-accent/60 text-accent',
  RESTART: 'border-warn/60 text-warn',
  SCALE: 'border-warn/60 text-warn',
  ESCALATE: 'border-crit/60 text-crit',
  RESOLVED: 'border-ok/60 text-ok',
}

function Meter({ label, value, limit, display, max = 1 }: { label: string; value: number; limit: number; display: string; max?: number }) {
  const bad = value >= limit
  const width = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="rounded-md border border-panel-border bg-bg-raised px-3 py-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[0.68rem] uppercase tracking-wide text-dim">{label}</span>
        <span className={`font-mono text-sm font-semibold tabular-nums ${bad ? 'text-crit' : 'text-ok'}`}>{display}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel-border">
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-700 ${bad ? 'bg-crit' : 'bg-ok'}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function MetricsRow({ m }: { m: Metrics }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      <Meter label="Memory" value={m.memoryPct} limit={0.75} display={`${Math.round(m.memoryPct * 100)}%`} />
      <Meter label="Disk" value={m.diskPct} limit={0.85} display={`${Math.round(m.diskPct * 100)}%`} />
      <Meter label="Error rate" value={m.errorRate} limit={0.01} max={0.2} display={`${(m.errorRate * 100).toFixed(1)}%`} />
      <div className="rounded-md border border-panel-border bg-bg-raised px-3 py-2.5">
        <div className="font-mono text-[0.68rem] uppercase tracking-wide text-dim">Restarts / replicas</div>
        <div className="mt-1.5 font-mono text-sm font-semibold tabular-nums text-text">
          {m.restartCount} / {m.replicas}
        </div>
      </div>
    </div>
  )
}

export default function LiveAgentDemo() {
  const [scenarioId, setScenarioId] = useState<ScenarioId | null>(null)
  const [runKey, setRunKey] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const consoleRef = useRef<HTMLDivElement>(null)

  const trace = useMemo(() => (scenarioId ? runIncident(scenarioId) : null), [scenarioId])
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? null

  useEffect(() => {
    if (!trace) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(trace.steps.length)
      return
    }
    setRevealed(0)
    let shown = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      shown += 1
      setRevealed(shown)
      if (shown < trace.steps.length) timer = setTimeout(tick, STEP_DELAY_MS)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [trace, runKey])

  function start(id: ScenarioId) {
    // Reset in the handler, not only in the effect: the effect runs a render
    // late, and until then the previous run's step count would make the new
    // incident look finished.
    setRevealed(0)
    setScenarioId(id)
    setRunKey((k) => k + 1)
    // Stacked layout on small screens puts the console below the buttons.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => consoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  const visible = trace ? trace.steps.slice(0, revealed) : []
  const current = trace ? (revealed === 0 ? trace.initial : trace.steps[revealed - 1].metrics) : null
  const done = trace !== null && revealed >= trace.steps.length
  const lastStep = trace && done ? trace.steps[trace.steps.length - 1] : null

  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="Live Agent" title="Watch an SRE agent handle an incident." />
      <p className="mb-8 max-w-[720px] text-[1.05rem] leading-relaxed text-text-secondary">
        Pick an incident and watch the agent work through it: read the logs, choose a fix, pass every
        action through a guardrail layer, then either resolve the incident or hand it to a human. This
        is a TypeScript port of the agent in my{' '}
        <a
          href="https://github.com/dineshravichandiran/agentic-sre-responder"
          target="_blank"
          rel="noopener"
          className="font-semibold text-accent"
        >
          agentic-sre-responder
        </a>{' '}
        repo, running in your browser against a simulated service.
      </p>

      <Reveal variant="scale">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-2.5" role="group" aria-label="Incident scenarios">
            {SCENARIOS.map((s) => {
              const active = s.id === scenarioId
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => start(s.id)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-md border px-4 py-3 text-left transition-colors ${
                    active ? 'border-accent bg-accent-tint' : 'border-panel-border bg-panel hover:border-accent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.95rem] font-semibold text-text">{s.title}</span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wide text-accent">
                      {active ? 'Replay' : 'Run'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-secondary">{s.blurb}</p>
                </button>
              )
            })}
          </div>

          <div ref={consoleRef} className="min-h-[22rem] scroll-mt-20 rounded-md border border-panel-border bg-panel p-4 sm:p-5">
            {!trace || !current || !scenario ? (
              <div className="flex h-full min-h-[18rem] items-center justify-center text-center text-text-secondary">
                Choose an incident on the left to start the agent.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <MetricsRow m={current} />

                <ol className="flex flex-col gap-2.5" role="log" aria-live="polite" aria-label="Agent steps">
                  {visible.map((step, i) => (
                    <li
                      key={`${runKey}-${i}`}
                      className={`agent-step rounded-md border px-3.5 py-3 ${
                        step.blockedByGuardrail ? 'border-crit/60 bg-crit/10' : 'border-panel-border bg-bg-raised'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-dim">{i + 1}.</span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold ${BADGE_STYLE[step.action.type]}`}
                        >
                          {step.action.type}
                          {step.action.type === 'SCALE' ? ` ${step.action.replicas}` : ''}
                        </span>
                        {step.blockedByGuardrail && (
                          <span className="rounded-full bg-crit px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold text-white">
                            GUARDRAIL
                          </span>
                        )}
                      </div>
                      {step.action.reason && <p className="mt-2 text-sm text-text">{step.action.reason}</p>}
                      <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[0.75rem] leading-relaxed text-text-secondary">
                        {step.result}
                      </pre>
                    </li>
                  ))}
                  {!done && (
                    <li className="font-mono text-xs text-dim" aria-hidden="true">
                      agent is thinking…
                    </li>
                  )}
                </ol>

                {done && lastStep && trace && (
                  <div
                    className={`rounded-md border px-4 py-3 ${
                      trace.verdict === 'RESOLVED' ? 'border-ok/60 bg-ok/10' : 'border-warn/60 bg-warn/10'
                    }`}
                  >
                    <div
                      className={`font-mono text-sm font-bold ${trace.verdict === 'RESOLVED' ? 'text-ok' : 'text-warn'}`}
                    >
                      {trace.verdict === 'RESOLVED' ? 'RESOLVED' : 'ESCALATED TO A HUMAN'}
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{scenario.expected}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <p className="mt-5 max-w-[720px] text-sm leading-relaxed text-dim">
        The service is simulated, so no real infrastructure is touched. The first two incidents use the
        rule-based planner. The last two inject a faulty planner on purpose to show the guardrails
        catching it.
      </p>
    </div>
  )
}
