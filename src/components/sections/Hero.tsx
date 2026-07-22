import HeroGlobe from '../three/HeroGlobe'
import StatCounter from './StatCounter'
import MagneticLink from '../ui/MagneticLink'
import { profile } from '../../data/profile'

export default function Hero() {
  return (
    <section className="relative border-b border-panel-border pt-16 pb-14 overflow-hidden">
      <div
        className="hidden sm:block absolute top-8 right-4 w-[220px] h-[220px] opacity-45 lg:right-10 lg:w-[340px] lg:h-[340px] lg:opacity-90 pointer-events-none z-0"
      >
        <HeroGlobe />
      </div>

      <div className="container relative z-10">
        <div className="font-mono text-[0.85rem] text-dim mb-4 tracking-wide">
          <span className="text-accent">dinesh@ops</span>
          :~$ whoami
          <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent font-semibold mb-8 uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
          {profile.tag}
        </div>

        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15] tracking-tight text-balance max-w-4xl mb-6">
          {profile.headline}
        </h1>

        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-10">
          {profile.lede}
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <MagneticLink
            href={`mailto:${profile.email}`}
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-hover"
          >
            Get in touch
          </MagneticLink>
          <MagneticLink
            href="/Dinesh_Ravichandiran_SRE.pdf"
            download
            className="px-6 py-3 rounded-lg text-sm font-semibold border border-panel-border-strong text-text hover:border-accent"
          >
            Download Resume
          </MagneticLink>
          <MagneticLink
            href="https://linkedin.com/in/dineshravichandiran"
            target="_blank"
            rel="noopener"
            className="px-6 py-3 rounded-lg text-sm font-semibold border border-panel-border-strong text-text hover:border-accent"
          >
            LinkedIn
          </MagneticLink>
        </div>

        <div className="bg-panel border border-panel-border rounded-lg max-w-[760px] overflow-hidden mb-16">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-panel-hover border-b border-panel-border">
            <span className="w-2.5 h-2.5 rounded-full bg-crit/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-ok/70" />
            <span className="font-mono text-xs text-dim ml-2">dinesh@ops:~$ cat now.txt</span>
          </div>
          <div className="p-6">
            <div className="font-mono text-[0.7rem] font-bold text-accent uppercase tracking-[0.15em] mb-2.5">
              Now
            </div>
            <div className="text-base text-text-secondary leading-relaxed">{profile.now}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-t border-panel-border pt-8">
          {profile.stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              comma={s.comma}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
