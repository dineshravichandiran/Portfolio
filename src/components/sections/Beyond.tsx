import SectionHeader from '../ui/SectionHeader'
import GalleryGrid from '../gallery/GalleryGrid'
import { artItems, artworks, cyclingItems, runningItems } from '../../data/gallery'

export default function Beyond() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="13 / Beyond Work" title="Off the clock." />
      <p className="mb-10 max-w-[680px] text-[1.05rem] leading-relaxed text-text-secondary">
        Away from the terminal I run, cycle, draw and paint. Here is some of the work and some of my races.
      </p>
      <div className="mb-4 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Drawing</div>
      <GalleryGrid items={artItems} fit="contain" />

      <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[0.78rem] uppercase tracking-wide text-accent">Drawings and paintings</div>
        <a
          href="/art-portfolio.pdf"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
        >
          Open the full portfolio (PDF, 91 pages) <span aria-hidden="true">↗</span>
        </a>
      </div>
      <GalleryGrid items={artworks} fit="cover" />

      <div className="mb-4 mt-12 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Running</div>
      <GalleryGrid items={runningItems} fit="contain" />

      <div className="mb-4 mt-12 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Cycling</div>
      <GalleryGrid items={cyclingItems} fit="contain" />
    </div>
  )
}
