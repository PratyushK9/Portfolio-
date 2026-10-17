import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { can3D } from './three/palette'
import Reveal, { SectionHeading } from './fx/Reveal'

const SkillSphere = lazy(() => import('./three/SkillSphere'))
const ALL = profile.skills.flatMap((g) => g.items)

// Hidden "other talents" card: blurred until hovered (or tapped on touch screens).
function SecretSkills() {
  const [shown, setShown] = useState(false)
  return (
    <Reveal delay={0.3} className="sm:col-span-2">
      <div tabIndex={0}
        onMouseEnter={() => setShown(true)} onMouseLeave={() => setShown(false)}
        onFocus={() => setShown(true)} onBlur={() => setShown(false)}
        data-cursor="Shh, secret"
        className="glass relative overflow-hidden rounded-3xl p-5"
        style={{ borderStyle: 'dashed', borderColor: 'color-mix(in srgb, var(--accent) 55%, transparent)' }}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-ink">Other talents</h3>
          <span className="font-mono text-[11px] text-muted">{shown ? 'not on the resume' : 'classified · hover to reveal'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.secretSkills.map((s, i) => (
            <motion.span key={s}
              animate={shown ? { filter: 'blur(0px)', opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 } : { filter: 'blur(6px)', opacity: 0.5, y: 4, rotate: 0 }}
              transition={{ delay: shown ? i * 0.08 : 0, type: 'spring', stiffness: 260, damping: 16 }}
              className="rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{ background: 'linear-gradient(100deg, var(--accent), var(--accent-2))', color: 'var(--on-accent)' }}>
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  const [show3D] = useState(can3D)
  const [selected, setSelected] = useState(null) // highlights the same skill in the chips and the sphere

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading kicker="02 · Toolkit" title={<>Things I’m <span className="text-gradient">good with</span>.</>}>
        From React to RAG, plus the people skills startups taught me. {show3D && 'Grab the sphere and give it a spin.'}
      </SectionHeading>

      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08} className="glass rounded-3xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-ink">{g.group}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const on = selected === s
                  return (
                    <motion.button key={s} type="button" onClick={() => setSelected(on ? null : s)}
                      data-cursor={on ? 'Unpick' : 'Pick'}
                      whileHover={{ rotate: [0, -6, 6, -3, 0], scale: 1.08, transition: { duration: 0.4 } }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                      style={on
                        ? { background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 0 18px var(--glow)' }
                        : { background: 'color-mix(in srgb, var(--text) 8%, transparent)', color: 'var(--text)' }}>
                      {s}
                    </motion.button>
                  )
                })}
              </div>
            </Reveal>
          ))}
          <SecretSkills />
        </div>

        {show3D && (
          <Reveal className="relative h-[460px]">
            <Suspense fallback={null}>
              <SkillSphere items={ALL} selected={selected} onSelect={setSelected} />
            </Suspense>
          </Reveal>
        )}
      </div>
    </section>
  )
}
