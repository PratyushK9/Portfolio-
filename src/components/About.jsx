import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal, { SectionHeading } from './fx/Reveal'
import Tilt from './fx/Tilt'

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
}

const STATS = [
  { value: profile.projects.length, label: 'Full-stack AI apps' },
  { value: profile.experience.length, label: 'Internships' },
  { value: profile.certifications.length, label: 'Certifications' },
]

function Portrait() {
  const src = profile.photos.portrait
  return (
    <Tilt max={12} className="rounded-[2rem]">
      <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-3 shadow-2xl"
        style={{ boxShadow: '0 40px 90px -30px var(--glow)' }}>
        {src ? (
          <img src={src} alt={`${profile.name} striking the SRK pose on a hilltop`}
            className="h-full w-full rounded-[1.5rem] object-cover" style={{ objectPosition: 'center 58%' }} />
        ) : (
          <div className="grid h-full w-full place-items-center rounded-[1.5rem]"
            style={{ background: 'linear-gradient(150deg, var(--accent), var(--accent-2))' }}>
            <div className="text-center" style={{ color: 'var(--on-accent)' }}>
              <div className="font-display text-7xl font-extrabold">{profile.initials}</div>
              <div className="mt-2 font-mono text-xs opacity-80">photo coming soon</div>
            </div>
          </div>
        )}
        <div className="glass absolute bottom-6 left-6 right-6 rounded-2xl px-4 py-3" style={{ transform: 'translateZ(40px)' }}>
          <div className="font-display text-lg font-bold text-ink">{profile.photos.portraitCaption}</div>
          <div className="text-sm text-muted">Arms wide open, one hilltop at a time</div>
        </div>
      </div>
    </Tilt>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading kicker="01 · About me" title={<>An engineer who <span className="text-gradient">ships software</span>.</>} />

      <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.2fr]">
        <Reveal><Portrait /></Reveal>

        <div className="space-y-6">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="text-lg leading-relaxed text-ink md:text-xl">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2} className="glass rounded-3xl p-5">
            <div className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Education</div>
            <div className="font-display text-xl font-bold text-ink">{profile.education.school}</div>
            <div className="text-muted">{profile.education.degree} · Expected {profile.education.graduation}</div>
            <blockquote className="mt-4 border-l-4 pl-4 font-display text-xl font-bold leading-snug text-ink md:text-2xl"
              style={{ borderColor: 'var(--accent)' }}>
              “{profile.education.motto}”
            </blockquote>
          </Reveal>

          <div className="grid grid-cols-3 gap-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-3xl font-extrabold text-accent md:text-4xl">
                  <CountUp to={s.value} decimals={s.decimals} />
                </div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>

          {profile.beyond.length > 0 && (
            <Reveal className="flex flex-wrap gap-2">
              {profile.beyond.map((b) => (
                <span key={b} className="glass rounded-full px-4 py-2 text-sm text-ink">{b}</span>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
