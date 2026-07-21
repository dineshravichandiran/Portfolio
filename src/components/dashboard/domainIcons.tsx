import type { ReactElement, SVGProps } from 'react'

export type DomainIconName =
  | 'activity'
  | 'cloud'
  | 'eye'
  | 'box'
  | 'code'
  | 'sliders'
  | 'refresh'
  | 'layers'
  | 'alert'
  | 'scan'

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths: Record<DomainIconName, ReactElement> = {
  activity: <polyline points="2 12 6 12 9 4 14 20 17 12 22 12" />,
  cloud: <path d="M6 18a4 4 0 1 1 .9-7.9 5 5 0 0 1 9.6 1.4A3.5 3.5 0 0 1 17 18H6z" />,
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  box: (
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  code: (
    <>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 13.9-5.4" />
      <path d="M20 12a8 8 0 0 1-13.9 5.4" />
      <polyline points="17 4 18 7 15 8" />
      <polyline points="7 20 6 17 9 16" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 13 12 18 21 13" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  scan: (
    <>
      <path d="M3 7V4a1 1 0 0 1 1-1h3" />
      <path d="M17 3h3a1 1 0 0 1 1 1v3" />
      <path d="M21 17v3a1 1 0 0 1-1 1h-3" />
      <path d="M7 21H4a1 1 0 0 1-1-1v-3" />
    </>
  ),
}

export default function DomainIcon({ name, className }: { name: DomainIconName; className?: string }) {
  return (
    <svg {...base} className={className}>
      {paths[name]}
    </svg>
  )
}
