import BackLink from '../ui/BackLink'
import MagneticLink from '../ui/MagneticLink'
import Reveal from '../ui/Reveal'
import { profile } from '../../data/profile'

export default function Contact() {
  return (
    <div className="container pt-8 pb-0">
      <BackLink />
      <Reveal className="py-12 pb-16 text-center">
        <div className="font-mono text-[0.78rem] text-accent tracking-wide mb-4">// Contact</div>
        <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight mb-5 text-balance">
          Let's build something <span className="text-accent">reliable</span>.
        </h2>
        <p className="text-text-secondary text-[1.05rem] leading-relaxed max-w-[60ch] mx-auto mb-10">
          Open to <strong>Cloud, SRE, DevOps &amp; Platform Engineering</strong> roles. I solve real
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
