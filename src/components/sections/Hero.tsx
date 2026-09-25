import { useEffect, useState } from 'react'
import CursorTrackingCharacter from '../three/CursorTrackingCharacter'
import StatCounter from './StatCounter'
import MagneticLink from '../ui/MagneticLink'
import { profile } from '../../data/profile'
import { INTRO_DISMISSED_EVENT, INTRO_SESSION_KEY } from '../intro/IntroGate'

export default function Hero() {
  // The intro gate covers the whole screen for well over a second — animating
  // on mount (like every other Reveal in the app) would finish invisibly
  // behind it. Wait for the gate's dismiss event instead, unless it's not
  // going to show at all this session (returning visitor), in which case
  // there's nothing to wait for.
  const [play, setPlay] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (play) return
    function onDismiss() {
      setPlay(true)
    }
    window.addEventListener(INTRO_DISMISSED_EVENT, onDismiss)
    return () => window.removeEventListener(INTRO_DISMISSED_EVENT, onDismiss)
  }, [play])

  const fadeCls = play ? 'hero-fade-up' : 'opacity-0'

  return (
    <section className="relative border-b border-panel-border pt-16 pb-14 overflow-hidden">
      <div
        className="hidden sm:block absolute top-8 right-4 w-[220px] h-[220px] opacity-80 lg:right-10 lg:w-[340px] lg:h-[340px] lg:opacity-100 pointer-events-none z-0 shadow-[0_0_60px_rgba(62,142,222,0.25)] rounded-full"
      >
        <CursorTrackingCharacter />
      </div>

      <div className="container relative z-10">
        <div
          className={`${fadeCls} font-mono text-[0.85rem] text-dim mb-4 tracking-wide`}
          style={{ animationDelay: '0ms' }}
        >
          <span className="text-accent">dinesh@ops</span>
          :~$ whoami
          <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-pulse" />
        </div>

        <div
          className={`${fadeCls} inline-flex items-center gap-2 font-mono text-xs text-accent font-semibold mb-8 uppercase tracking-wide`}
          style={{ animationDelay: '80ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
          {profile.tag}
        </div>

        <h1
          className={`${fadeCls} text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15] tracking-tight text-balance max-w-4xl mb-6`}
          style={{ animationDelay: '160ms' }}
        >
          {profile.headline}
        </h1>

        <p
          className={`${fadeCls} text-text-secondary text-lg leading-relaxed max-w-2xl mb-10`}
          style={{ animationDelay: '240ms' }}
        >
          {profile.lede}
        </p>

        <div className={`${fadeCls} flex flex-wrap gap-3 mb-16`} style={{ animationDelay: '320ms' }}>
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

        <div
          className={`${fadeCls} bg-panel border border-panel-border rounded-lg max-w-[760px] overflow-hidden mb-16`}
          style={{ animationDelay: '400ms' }}
        >
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

        <div
          className={`${fadeCls} grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-t border-panel-border pt-8`}
          style={{ animationDelay: '480ms' }}
        >
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
