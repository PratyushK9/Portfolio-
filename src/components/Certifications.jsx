import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal, { SectionHeading } from './fx/Reveal'

function Badge() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="9" r="6" /><path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7" /><path d="m9.5 9 1.8 1.8L14.8 7.3" />
    </svg>
  )
}

export default function Certifications() {
  return (
    <section id="certs" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading kicker="04 · Certifications" title={<>Always <span className="text-gradient">levelling up</span>.</>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {profile.certifications.map((c, i) => {
          const Tag = c.url ? motion.a : motion.div
          return (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <Tag {...(c.url ? { href: c.url, target: '_blank', rel: 'noreferrer', 'data-cursor': 'Verify ↗' } : {})}
                whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
                className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-5">
                <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
                <Badge />
                <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">{c.name}</h3>
                <div className="mt-auto pt-3 text-xs text-muted">{c.issuer}{c.url && <span className="text-accent"> · verify ↗</span>}</div>
              </Tag>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
