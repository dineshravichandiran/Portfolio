import PhotoStrip from '../gallery/PhotoStrip'
import { awardsStrip } from '../../data/gallery'

interface Props {
  title?: string
  direction?: 'left' | 'right'
}

// Real certificates, medals and drawings that move on their own, placed where a
// visitor is already weighing the claims around them.
export default function Recognition({
  title = 'Hackathon winner, race finisher, and a drawing award.',
  direction = 'left',
}: Props) {
  return (
    <PhotoStrip
      items={awardsStrip}
      label="Awards, competitions and drawings"
      speed={direction === 'right' ? 36 : 42}
      size="large"
      direction={direction}
      header={
        <div className="max-w-[640px]">
          <div className="mb-1.5 font-mono text-[0.78rem] uppercase tracking-wide text-accent">Awards and competitions</div>
          <div className="text-[clamp(1.15rem,2.6vw,1.7rem)] font-bold leading-tight tracking-tight text-balance">{title}</div>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-text-secondary sm:block">
            The certificates and medals are real. Tap any photo to see it full size.
          </p>
        </div>
      }
    />
  )
}
