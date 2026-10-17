import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal, { SectionHeading } from './fx/Reveal'

// Experience timeline (a "wire" that charges as you scroll) + leadership cards.
export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading kicker="04 · Journey" title={<>Startups, research &amp; <span className="text-gradient">people</span>.</>}>
        Engineering taught me systems. Internships taught me how businesses actually run.
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div ref={ref} className="relative pl-10">
          <div className="absolute bottom-2 left-[13px] top-2 w-[3px] rounded-full" style={{ background: 'var(--line)' }} />
          <motion.div className="absolute bottom-2 left-[13px] top-2 w-[3px] origin-top rounded-full"
            style={{ scaleY, background: 'linear-gradient(var(--accent), var(--accent-2))', boxShadow: '0 0 12px var(--glow)' }} />

          <div className="space-y-6">
            {profile.experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.08} className="relative">
                <span className="absolute -left-[35px] top-6 grid h-6 w-6 place-items-center rounded-full"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 0 5px color-mix(in srgb, var(--accent) 25%, transparent)' }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--on-accent)' }} />
                </span>
                <motion.div whileHover={{ x: 6 }} className="glass rounded-3xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold"
                      style={{ background: 'color-mix(in srgb, var(--accent) 22%, transparent)', color: 'var(--text)' }}>{e.tag}</span>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">{e.role}</h3>
                  <div className="text-accent">{e.org}</div>
                  <p className="mt-2 leading-relaxed text-ink/85">{e.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent">Leadership</Reveal>
          <div className="space-y-4">
            {profile.leadership.map((l, i) => (
              <Reveal key={l.role} delay={i * 0.1}>
                <motion.div whileHover={{ rotate: i % 2 ? 1.2 : -1.2, scale: 1.02 }} className="glass rounded-3xl p-6">
                  <div className="text-2xl">{i === 0 ? '🧑‍🏫' : '🎪'}</div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">{l.role}</h3>
                  <div className="text-sm text-accent">{l.org}</div>
                  <p className="mt-2 text-ink/85">{l.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
