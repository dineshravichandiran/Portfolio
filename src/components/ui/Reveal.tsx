import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'clip'

// Each section that uses Reveal picks its own variant so scrolling through
// the page doesn't feel like the exact same fade-up repeating everywhere.
// `clip` is driven by inline style (below) rather than a Tailwind arbitrary
// class, since its value changes dynamically with `visible`.
const HIDDEN: Record<RevealVariant, string> = {
  up: 'opacity-0 translate-y-6',
  left: 'opacity-0 -translate-x-10',
  right: 'opacity-0 translate-x-10',
  scale: 'opacity-0 scale-90',
  clip: 'opacity-0',
}

const VISIBLE: Record<RevealVariant, string> = {
  up: 'opacity-100 translate-y-0',
  left: 'opacity-100 translate-x-0',
  right: 'opacity-100 translate-x-0',
  scale: 'opacity-100 scale-100',
  clip: 'opacity-100',
}

interface Props {
  className?: string
  delayMs?: number
  variant?: RevealVariant
  children: ReactNode
}

export default function Reveal({ className, delayMs = 0, variant = 'up', children }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    // The observed element must stay geometrically "normal" — a self-applied
    // clip-path collapses its own intersection area to zero in Chromium, so
    // an element clipped to 0% width can never report isIntersecting: true.
    // The ref lives on this outer, always-unclipped wrapper; the animated
    // variant styling lives on the inner element instead.
    <div ref={ref} className={className}>
      <div
        className={`h-full transition-all duration-700 ease-out ${visible ? VISIBLE[variant] : HIDDEN[variant]}`}
        style={{
          transitionDelay: `${delayMs}ms`,
          ...(variant === 'clip' ? { clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' } : null),
        }}
      >
        {children}
      </div>
    </div>
  )
}
