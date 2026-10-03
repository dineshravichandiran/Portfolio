import { useEffect, useRef } from 'react'
import type { GalleryItem } from '../../data/gallery'

interface Props {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const hasMany = items.length > 1

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && hasMany) onIndex((index + 1) % items.length)
      else if (e.key === 'ArrowLeft' && hasMany) onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, hasMany, onClose, onIndex])

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/50 text-xl text-white transition-colors hover:bg-black/80'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/50 text-xl text-white transition-colors hover:bg-black/80"
      >
        ✕
      </button>

      {hasMany && (
        <>
          <button type="button" aria-label="Previous image" onClick={() => onIndex((index - 1 + items.length) % items.length)} className={`${navBtn} left-3 sm:left-6`}>
            ←
          </button>
          <button type="button" aria-label="Next image" onClick={() => onIndex((index + 1) % items.length)} className={`${navBtn} right-3 sm:right-6`}>
            →
          </button>
        </>
      )}

      <img
        key={item.src}
        src={item.src}
        alt={item.alt}
        className="max-h-[74vh] max-w-full rounded-sm bg-white object-contain shadow-2xl"
      />

      <div className="mt-4 max-w-[640px] text-center">
        <div className="text-base font-semibold text-white">{item.title}</div>
        <div className="mt-1 text-sm text-white/70">{item.detail}</div>
        <div className="mt-1 font-mono text-xs text-white/50">
          {[item.date, hasMany ? `${index + 1} / ${items.length}` : ''].filter(Boolean).join(' · ')}
        </div>
      </div>
    </div>
  )
}
