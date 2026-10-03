// In-browser port of the planner, guardrails and incident scenarios from
// github.com/dineshravichandiran/agentic-sre-responder. Pure and
// deterministic: runIncident() returns the full step-by-step trace, and the
// UI plays it back. The service is simulated, there is no real infrastructure.

export type ActionType = 'GET_LOGS' | 'RESTART' | 'SCALE' | 'ESCALATE' | 'RESOLVED'

export interface Action {
  type: ActionType
  replicas?: number
  reason?: string
}

export interface Metrics {
  memoryPct: number
  diskPct: number
  errorRate: number
  restartCount: number
  replicas: number
}

export type Verdict = 'RESOLVED' | 'ESCALATED' | 'TIMED_OUT'

export interface Step {
  action: Action
  result: string
  blockedByGuardrail: boolean
  metrics: Metrics
}

export interface Trace {
  initial: Metrics
  steps: Step[]
  verdict: Verdict
}

export type ScenarioId = 'memory-leak' | 'disk-full' | 'broken-planner' | 'unsafe-scale'

export interface Scenario {
  id: ScenarioId
  title: string
  blurb: string
  planner: 'heuristic' | 'stuck' | 'unsafe'
  expected: string
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'memory-leak',
    title: 'Memory leak',
    blurb: 'Heap is near its limit and OutOfMemoryErrors are flooding the logs. A restart genuinely fixes this one.',
    planner: 'heuristic',
    expected: 'Agent restarts once and resolves it.',
  },
  {
    id: 'disk-full',
    title: 'Disk full',
    blurb: 'A debug logger refills the disk right after any restart. Restarting cannot fix it.',
    planner: 'heuristic',
    expected: 'Agent tries one restart, sees it failed, and pages a human.',
  },
  {
    id: 'broken-planner',
    title: 'Broken planner',
    blurb: 'Fault injection: the planner is stuck and asks to re-read logs forever.',
    planner: 'stuck',
    expected: 'The action budget cuts it off and forces an escalation.',
  },
  {
    id: 'unsafe-scale',
    title: 'Unsafe action',
    blurb: 'Fault injection: the planner asks to scale the service to 50 replicas.',
    planner: 'unsafe',
    expected: 'The replica cap blocks it before it runs.',
  },
]

interface ServiceState {
  memoryMb: number
  memoryLimitMb: number
  diskUsedMb: number
  diskLimitMb: number
  errorRate: number
  restartCount: number
  replicas: number
  logs: string[]
  remediationIneffective: boolean
}

function seed(id: ScenarioId): ServiceState {
  const base: ServiceState = {
    memoryMb: 512,
    memoryLimitMb: 2048,
    diskUsedMb: 4000,
    diskLimitMb: 20000,
    errorRate: 0.001,
    restartCount: 0,
    replicas: 1,
    logs: [],
    remediationIneffective: false,
  }
  if (id === 'disk-full') {
    return {
      ...base,
      diskUsedMb: 19500,
      errorRate: 0.09,
      remediationIneffective: true,
      logs: [
        'ERROR write failed: no space left on device (/var/log/checkout/debug.log)',
        'ERROR write failed: no space left on device (/var/log/checkout/debug.log)',
        'WARN  debug logging left enabled at DEBUG level in production config',
      ],
    }
  }
  // Memory leak is also the starting state for the two fault-injection runs,
  // so a healthy-looking planner failure still has a real incident to chew on.
  return {
    ...base,
    memoryMb: 1900,
    errorRate: 0.18,
    logs: [
      'WARN  gc: full GC took 4200ms, heap usage at 92%',
      'ERROR OutOfMemoryError: Java heap space at checkout.CartCache.put',
      'ERROR OutOfMemoryError: Java heap space at checkout.CartCache.put',
      'WARN  request queue depth climbing: 340 pending',
    ],
  }
}

function metricsOf(s: ServiceState): Metrics {
  return {
    memoryPct: Math.round((s.memoryMb / s.memoryLimitMb) * 10000) / 10000,
    diskPct: Math.round((s.diskUsedMb / s.diskLimitMb) * 10000) / 10000,
    errorRate: s.errorRate,
    restartCount: s.restartCount,
    replicas: s.replicas,
  }
}

export function isHealthy(m: Metrics): boolean {
  return m.memoryPct < 0.75 && m.diskPct < 0.85 && m.errorRate < 0.01
}

function applyRestart(s: ServiceState) {
  s.restartCount += 1
  if (s.remediationIneffective) {
    s.diskUsedMb = 19600
    s.errorRate = 0.09
    s.logs.push('ERROR write failed: no space left on device (/var/log/checkout/debug.log)')
    return
  }
  s.memoryMb = 480
  s.errorRate = 0.001
  s.logs = ['INFO  service restarted cleanly, heap reset']
}

const MAX_REPLICAS = 10
const MAX_RESTARTS = 1
const MAX_TOTAL_ACTIONS = 6

function guardrailViolation(a: Action, restarts: number, total: number): string | null {
  if (total >= MAX_TOTAL_ACTIONS) {
    return `Exceeded ${MAX_TOTAL_ACTIONS} actions without resolving the incident. Forcing escalation instead of looping.`
  }
  if (a.type === 'RESTART' && restarts >= MAX_RESTARTS) {
    return 'Already restarted once with no improvement. A repeat restart is the agent repeating itself, so escalate.'
  }
  if (a.type === 'SCALE' && (a.replicas === undefined || a.replicas > MAX_REPLICAS)) {
    return `Refusing to scale to ${a.replicas} replicas. The cap is ${MAX_REPLICAS}.`
  }
  return null
}

type Planner = (m: Metrics, logs: string[], history: Action[]) => Action

const heuristicPlanner: Planner = (m, logs, history) => {
  if (isHealthy(m)) return { type: 'RESOLVED' }
  if (!history.some((a) => a.type === 'GET_LOGS')) return { type: 'GET_LOGS' }

  const logText = logs.join(' ')
  if (history.some((a) => a.type === 'RESTART')) {
    return {
      type: 'ESCALATE',
      reason: 'Restart did not resolve the incident; the root cause is likely not fixable by restarting.',
    }
  }
  if (logText.includes('OutOfMemoryError') && m.memoryPct > 0.85) {
    return { type: 'RESTART', reason: 'Heap exhaustion, clear it with a clean restart.' }
  }
  if (logText.includes('no space left on device') && m.diskPct > 0.9) {
    return { type: 'RESTART', reason: 'Disk pressure, try a restart before escalating.' }
  }
  return {
    type: 'ESCALATE',
    reason: 'Metrics are unhealthy but the logs match no known automated fix.',
  }
}

const stuckPlanner: Planner = () => ({ type: 'GET_LOGS' })
const unsafePlanner: Planner = () => ({ type: 'SCALE', replicas: 50, reason: 'Throw capacity at it.' })

const PLANNERS: Record<Scenario['planner'], Planner> = {
  heuristic: heuristicPlanner,
  stuck: stuckPlanner,
  unsafe: unsafePlanner,
}

export function runIncident(id: ScenarioId, maxSteps = 10): Trace {
  const scenario = SCENARIOS.find((s) => s.id === id)!
  const planner = PLANNERS[scenario.planner]
  const state = seed(id)
  const initial = metricsOf(state)

  const steps: Step[] = []
  const history: Action[] = []
  let logs: string[] = []
  let restarts = 0
  let total = 0

  for (let i = 0; i < maxSteps; i++) {
    const action = planner(metricsOf(state), logs, history)

    const violation = guardrailViolation(action, restarts, total)
    if (violation) {
      steps.push({
        action: { type: 'ESCALATE', reason: violation },
        result: `Guardrail blocked ${action.type}${action.type === 'SCALE' ? ` (${action.replicas} replicas)` : ''}. Paged on-call.`,
        blockedByGuardrail: true,
        metrics: metricsOf(state),
      })
      return { initial, steps, verdict: 'ESCALATED' }
    }

    total += 1
    if (action.type === 'RESTART') restarts += 1
    history.push(action)

    if (action.type === 'RESOLVED') {
      steps.push({ action, result: 'Metrics healthy, closing incident.', blockedByGuardrail: false, metrics: metricsOf(state) })
      return { initial, steps, verdict: 'RESOLVED' }
    }

    if (action.type === 'GET_LOGS') {
      logs = state.logs.slice(-5)
      steps.push({
        action,
        result: logs.length ? logs.join('\n') : 'No log lines.',
        blockedByGuardrail: false,
        metrics: metricsOf(state),
      })
      continue
    }

    if (action.type === 'RESTART') {
      applyRestart(state)
      steps.push({
        action,
        result: `Restarted checkout-api (restart count ${state.restartCount}).`,
        blockedByGuardrail: false,
        metrics: metricsOf(state),
      })
      continue
    }

    if (action.type === 'SCALE') {
      state.replicas = action.replicas ?? 1
      steps.push({
        action,
        result: `Scaled checkout-api to ${state.replicas} replicas.`,
        blockedByGuardrail: false,
        metrics: metricsOf(state),
      })
      continue
    }

    // ESCALATE
    steps.push({
      action,
      result: `Paged on-call: ${action.reason ?? 'unspecified'}`,
      blockedByGuardrail: false,
      metrics: metricsOf(state),
    })
    return { initial, steps, verdict: 'ESCALATED' }
  }

  return { initial, steps, verdict: 'TIMED_OUT' }
}
