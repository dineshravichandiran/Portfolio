import { useEffect, useRef, useState } from 'react'
import MagneticLink from '../ui/MagneticLink'
import Reveal from '../ui/Reveal'
import { profile } from '../../data/profile'

function Headline() {
  const ref = useRef<HTMLHeadingElement>(null)
  const [inView, setInView] = useState(false)

  // One-shot: the line wipes in once and stays revealed, it doesn't
  // replay if you scroll away and back.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <h2
      ref={ref}
      className={`headline-reveal ${inView ? 'in-view' : ''} text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight mb-5 text-balance`}
    >
      <span className="headline-reveal-text">
        Let's build something <span className="word-reliable">reliable</span>.
      </span>
      <span className="headline-reveal-bar" aria-hidden="true" />
    </h2>
  )
}

export default function Contact() {
  return (
    <div className="container pt-8 pb-0">
      <Reveal className="py-12 pb-16 text-center">
        <div className="font-mono text-[0.78rem] text-accent tracking-wide mb-4">// Contact</div>
        <Headline />
        <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[60ch] mx-auto mb-10">
          Open to <strong>Site Reliability Engineering (SRE)</strong> roles. I solve real
          production problems, learn fast, and take ownership. If you're hiring someone reliable
          who keeps growing, let's talk.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {profile.socialLinks.map((link) => (
            <MagneticLink
              key={link.label}
              href={link.href}
              className="bg-panel border border-panel-border rounded-full px-5 py-2.5 text-sm font-semibold text-text-secondary hover:border-accent hover:text-accent"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener' : undefined}
              download={link.download}
            >
              {link.label}
            </MagneticLink>
          ))}
        </div>
        <div className="flex justify-center gap-6 flex-wrap text-xs text-dim border-t border-panel-border pt-6">
          <span>© 2026 {profile.name} · All rights reserved</span>
          <span>
            Designed &amp; built by {profile.name} · {profile.location}
          </span>
        </div>
      </Reveal>
    </div>
  )
}
