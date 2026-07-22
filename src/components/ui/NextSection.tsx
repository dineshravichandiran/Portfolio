import { scrollToSection } from '../../utils/scrollToSection'

export default function NextSection({ to, label }: { to: string; label: string }) {
  return (
    <div className="container flex justify-center py-8">
      <button
        type="button"
        onClick={() => scrollToSection(to)}
        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold border border-panel-border-strong text-text-secondary hover:border-accent hover:text-text transition-colors cursor-pointer"
      >
        <span className="font-mono text-[0.7rem] text-dim uppercase tracking-wide">Next</span>
        <span>{label}</span>
        <span className="transition-transform group-hover:translate-y-0.5">↓</span>
      </button>
    </div>
  )
}
