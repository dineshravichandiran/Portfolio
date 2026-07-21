import { Link } from 'react-router-dom'
import { useTilt } from '../../hooks/useTilt'

interface Props {
  to: string
  name: string
  description: string
  metric: string
  metricLabel: string
  status?: 'ok' | 'warn'
  sparkline: number[]
}

export default function StatusTile({ to, name, description, metric, metricLabel, status = 'ok', sparkline }: Props) {
  const tiltRef = useTilt<HTMLAnchorElement>(6)
  return (
    <Link
      ref={tiltRef}
      to={to}
      className="block bg-panel border border-panel-border rounded-lg p-5 hover:border-panel-border-strong"
      style={{ transition: 'transform 0.3s ease-out, border-color 0.15s' }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold">{name}</span>
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'ok' ? 'bg-ok shadow-[0_0_6px_var(--color-ok)]' : 'bg-warn shadow-[0_0_6px_var(--color-warn)]'}`} />
      </div>
      <div className="text-2xl font-bold font-mono tabular-nums">{metric}</div>
      <div className="text-[0.68rem] text-dim uppercase tracking-wide mt-0.5 mb-3">{metricLabel}</div>
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{description}</p>
      <div className="flex items-end gap-0.5 h-6">
        {sparkline.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-[1px] bg-accent ${i === sparkline.length - 1 ? 'opacity-100' : 'opacity-55'}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Link>
  )
}
