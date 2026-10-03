import { useState } from 'react'
import GalleryGrid from './GalleryGrid'
import { certificateGroups, courseCredentials, trainingCourses } from '../../data/gallery'
import type { TrainingItem } from '../../data/gallery'

function TextList({ heading, items }: { heading: string; items: TrainingItem[] }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[0.78rem] uppercase tracking-wide text-accent">{heading}</div>
      <ul className="flex flex-col gap-3">
        {items.map((c) => (
          <li
            key={c.title}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-sm border border-panel-border border-l-[3px] border-l-accent bg-panel px-5 py-3.5"
          >
            <span className="min-w-[200px] flex-1 text-[0.95rem] font-semibold text-text">{c.title}</span>
            <span className="text-sm text-text-secondary">{c.detail}</span>
            <span className="font-mono text-[0.68rem] uppercase tracking-wide text-dim">{c.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CollapsedGroup({ heading, items }: { heading: string; items: (typeof certificateGroups)[number]['items'] }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-panel-border-strong px-4 py-2 font-mono text-[0.78rem] uppercase tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-text"
      >
        {open ? 'Hide' : 'Show'} {heading.toLowerCase()} ({items.length})
        <span aria-hidden="true" className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {/* Rendered only when opened, so these images never load for visitors who don't ask. */}
      {open && (
        <div className="mt-5">
          <GalleryGrid items={items} fit="contain" />
        </div>
      )}
    </div>
  )
}

export default function CertificateGallery() {
  return (
    <div className="mt-16" id="certificate-gallery">
      <h3 className="mb-2 text-xl font-bold tracking-tight text-text">Certificates and participation proof.</h3>
      <p className="mb-8 max-w-[680px] text-[0.95rem] leading-relaxed text-text-secondary">
        Competition, course and workshop certificates, shown as issued. The certifications above are the
        professional ones. Click any certificate to view it full size.
      </p>
      <div className="flex flex-col gap-10">
        {certificateGroups
          .filter((g) => !g.collapsed)
          .map((g) => (
            <div key={g.heading}>
              <div className="mb-4 font-mono text-[0.78rem] uppercase tracking-wide text-accent">{g.heading}</div>
              <GalleryGrid items={g.items} fit="contain" />
            </div>
          ))}
        <TextList heading="Professional training" items={trainingCourses} />
        <TextList heading="More badges" items={courseCredentials} />
        {certificateGroups
          .filter((g) => g.collapsed)
          .map((g) => (
            <CollapsedGroup key={g.heading} heading={g.heading} items={g.items} />
          ))}
      </div>
    </div>
  )
}
