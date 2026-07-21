import type { ReactNode } from 'react'
import { useTilt } from '../../hooks/useTilt'

interface Props {
  className?: string
  children: ReactNode
}

export default function TiltCard({ className, children }: Props) {
  const ref = useTilt<HTMLDivElement>()
  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.3s ease-out' }}>
      {children}
    </div>
  )
}
