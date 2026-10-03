import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Lightbox from './Lightbox'
import type { GalleryItem } from '../../data/gallery'

interface Props {
  items: GalleryItem[]
  // Certificates keep their whole page visible on a white mat; photos fill the frame.
  fit?: 'contain' | 'cover'
}

export default function GalleryGrid({ items, fit = 'contain' }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
        {items.map((it, i) => {
          const itemFit = it.fit ?? fit
          return (
          <li key={it.src}>
            <Reveal variant="scale" delayMs={(i % 6) * 50}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View larger: ${it.title}`}
                className="group h-full w-full cursor-pointer overflow-hidden rounded-md border border-panel-border bg-panel text-left transition-colors hover:border-accent"
              >
                <div className={`aspect-[4/3] overflow-hidden ${itemFit === 'contain' ? 'bg-white' : 'bg-bg-raised'}`}>
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    decoding="async"
                    style={itemFit === 'cover' ? { objectPosition: it.focus ?? '50% 30%' } : undefined}
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                      itemFit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <div className="p-3.5">
                  <div className="text-sm font-semibold leading-snug text-text">{it.title}</div>
                  <div className="mt-1 text-xs leading-snug text-text-secondary">{it.detail}</div>
                  {it.date && (
                    <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-wide text-dim">{it.date}</div>
                  )}
                </div>
              </button>
            </Reveal>
          </li>
          )
        })}
      </ul>

      {open !== null && (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </>
  )
}
