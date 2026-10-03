import SectionHeader from '../ui/SectionHeader'
import GalleryGrid from '../gallery/GalleryGrid'
import { artItems, runningItems } from '../../data/gallery'

export default function Beyond() {
  return (
    <div className="container py-8 pb-16">
      <SectionHeader label="13 / Beyond Work" title="Off the clock." />
      <p className="mb-10 max-w-[680px] text-[1.05rem] leading-relaxed text-text-secondary">
        Away from the terminal I run, cycle, draw and paint. Here is some of the work and some of my races.
      </p>
      <div className="mb-4 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Drawing</div>
      <GalleryGrid items={artItems} fit="contain" />

      <div className="mb-4 mt-12 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Running</div>
      <GalleryGrid items={runningItems} fit="contain" />
    </div>
  )
}
