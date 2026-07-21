import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export default function MagneticLink({ children, ...rest }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      {...rest}
      style={{ transition: 'transform 0.15s ease-out, background-color 0.15s, border-color 0.15s, color 0.15s' }}
    >
      {children}
    </a>
  )
}
