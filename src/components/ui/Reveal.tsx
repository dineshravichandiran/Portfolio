import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface Props {
  className?: string
  delayMs?: number
  children: ReactNode
}

export default function Reveal({ className, delayMs = 0, children }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className ?? ''}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
