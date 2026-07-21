import type { HTMLAttributes, ReactNode } from 'react'
import { useSpotlight } from '../../hooks/useSpotlight'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function SpotlightCard({ children, className, ...rest }: Props) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>()
  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`spotlight-card ${className ?? ''}`} {...rest}>
      {children}
    </div>
  )
}
