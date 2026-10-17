import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal from './fx/Reveal'

// Compact strip of real experience + leadership, from profile.js.
export default function Internships() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
      <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">03 · Where I’ve worked</div>
          <h2 className="section-title text-3xl text-ink md:text-4xl">Real experience, <span className="text-gradient">real people</span>.</h2>
        </div>
        <span className="font-mono text-xs text-muted">(unlike the fan mail further down)</span>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {profile.experience.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.08} className="h-full">
            <motion.div whileHover={{ y: -6 }} className="glass flex h-full flex-col rounded-3xl p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink"
                  style={{ background: 'color-mix(in srgb, var(--accent) 22%, transparent)' }}>{e.tag}</span>
                <span className="font-mono text-[11px] text-muted">{e.period}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">{e.role}</h3>
              <div className="text-sm text-accent">{e.org}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{e.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Leadership:</span>
        {profile.leadership.map((l) => (
          <span key={l.role} title={l.text} className="glass rounded-full px-4 py-1.5 text-sm text-ink">
            {l.role} <span className="text-muted">· {l.org}</span>
          </span>
        ))}
      </Reveal>
    </section>
  )
}
