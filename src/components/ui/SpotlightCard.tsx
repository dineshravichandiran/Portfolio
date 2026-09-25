import type { HTMLAttributes, ReactNode } from 'react'
import { useSpotlight } from '../../hooks/useSpotlight'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Adds a subtle perspective tilt that follows the cursor, in addition to the glow. */
  tilt?: boolean
}

export default function SpotlightCard({ children, className, tilt = false, ...rest }: Props) {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>({ tilt })
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`spotlight-card ${tilt ? 'transition-transform duration-200 ease-out will-change-transform' : ''} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </div>
  )
}
