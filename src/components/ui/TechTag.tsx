import { useSpotlight } from '../../hooks/useSpotlight'
import { TOOL_ICON_MAP } from '../../data/skills'

/** Bare label -> icon URL if it exactly matches a known tool badge. */
function exactIcon(tag: string): string | undefined {
  return TOOL_ICON_MAP[tag]
}

/**
 * Best-effort fuzzy match for tags that reference a known tool without
 * matching its label exactly — e.g. a project tag "Kubernetes" against the
 * Tech Stack badge "Kubernetes (AKS)", or "AWS & Azure" against "AWS".
 */
function fuzzyIcon(tag: string): string | undefined {
  const tagLower = tag.toLowerCase()
  for (const [label, icon] of Object.entries(TOOL_ICON_MAP)) {
    const core = label.toLowerCase().replace(/\s*\(.+?\)\s*/g, '').trim()
    if (core.length < 3) continue
    if (tagLower === core || tagLower.includes(core) || core.includes(tagLower)) return icon
  }
  return undefined
}

/**
 * A tech/tool tag styled the same as the Tech Stack badges — same pill
 * shape, same cursor-spotlight glow, same icon treatment where one is
 * known — instead of the plain bordered text pill used elsewhere.
 */
export default function TechTag({ label, compact = false }: { label: string; compact?: boolean }) {
  const { ref, onMouseMove } = useSpotlight<HTMLSpanElement>()
  const icon = exactIcon(label) ?? fuzzyIcon(label)
  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card inline-flex items-center gap-1.5 bg-panel border border-panel-border rounded-full text-text-secondary hover:border-accent transition-colors ${
        compact ? 'px-2 py-0.5 text-[0.65rem]' : 'px-3 py-1 text-[0.72rem]'
      }`}
    >
      {icon && <img src={icon} alt="" className={compact ? 'w-2.5 h-2.5' : 'w-3 h-3'} />}
      {label}
    </span>
  )
}
