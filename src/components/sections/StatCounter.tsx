import { useCountUp } from '../../hooks/useCountUp'

interface Props {
  value: number
  suffix?: string
  decimals?: number
  comma?: boolean
  label: string
}

export default function StatCounter({ value, suffix, decimals, comma, label }: Props) {
  const { ref, display } = useCountUp({ target: value, suffix, decimals, comma })
  return (
    <div
      ref={ref}
      className="pr-6 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-panel-border [&:not(:first-child)]:pl-6"
    >
      <div className="text-3xl font-bold text-accent tracking-tight leading-tight mb-1 tabular-nums">
        {display}
      </div>
      <div className="font-mono text-[0.7rem] text-dim uppercase tracking-wide">{label}</div>
    </div>
  )
}
