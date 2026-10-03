import type { ReactNode } from 'react'

// Animated show/hide for accordion-style cards. Height animates through the
// grid-template-rows 0fr -> 1fr trick, so no measuring in JS.
export function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className={open ? 'overflow-visible' : 'overflow-hidden'} inert={!open}>
        {children}
      </div>
    </div>
  )
}

export function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-300 ${
        open ? 'rotate-45' : ''
      }`}
    >
      +
    </span>
  )
}

// Stretches the heading's button over the whole card so any click toggles it.
export const CARD_HIT_AREA = "after:absolute after:inset-0 after:content-['']"
