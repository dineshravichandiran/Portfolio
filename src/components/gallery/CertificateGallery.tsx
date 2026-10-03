import GalleryGrid from './GalleryGrid'
import { certificateGroups } from '../../data/gallery'

export default function CertificateGallery() {
  return (
    <div className="mt-16" id="certificate-gallery">
      <h3 className="mb-2 text-xl font-bold tracking-tight text-text">Certificates and participation proof.</h3>
      <p className="mb-8 max-w-[680px] text-[0.95rem] leading-relaxed text-text-secondary">
        Competition, course and workshop certificates, shown as issued. The certifications above are the
        professional ones. Click any certificate to view it full size.
      </p>
      <div className="flex flex-col gap-10">
        {certificateGroups.map((g) => (
          <div key={g.heading}>
            <div className="mb-4 font-mono text-[0.78rem] uppercase tracking-wide text-accent">{g.heading}</div>
            <GalleryGrid items={g.items} fit="contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
