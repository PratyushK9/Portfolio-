import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { useScene } from './scene/useTimeOfDay'
import { can3D } from './three/palette'
import Magnetic from './fx/Magnetic'
import Bolt from './fx/Bolt'

const HeroDesk = lazy(() => import('./three/HeroDesk'))

const GREETING = { dawn: 'Good morning', day: 'Hello there', sunset: 'Good evening', night: 'Up late too?' }

function Typewriter({ words }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    const done = !deleting && text === word
    const empty = deleting && text === ''
    const t = setTimeout(() => {
      if (done) setDeleting(true)
      else if (empty) { setDeleting(false); setI((n) => n + 1) }
      else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, done ? 1600 : empty ? 300 : deleting ? 35 : 70)
    return () => clearTimeout(t)
  }, [text, deleting, i, words])

  return <span className="caret">{text}</span>
}

function BouncyName({ text }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split('').map((ch, i) => (
        <motion.span key={i} aria-hidden className="inline-block"
          initial={{ y: 80, opacity: 0, rotate: 8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.15 + i * 0.04, type: 'spring', stiffness: 260, damping: 16 }}
          whileHover={{ y: -18, rotate: i % 2 ? 8 : -8, color: 'var(--accent)', transition: { type: 'spring', stiffness: 500, damping: 8 } }}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

function DeskFallback() {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative grid h-48 w-48 place-items-center rounded-[2.5rem] font-display text-6xl font-extrabold"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: 'var(--on-accent)', boxShadow: '0 30px 80px -20px var(--glow)', animation: 'float-y 5s ease-in-out infinite' }}>
        {profile.initials}
        <Bolt className="absolute -right-4 -top-4 h-12 w-12 text-accent" />
      </div>
    </div>
  )
}

export default function Hero() {
  const { scene, setMode } = useScene()
  const ref = useRef(null)
  // The lamp is lit whenever it's dark out; clicking it flips day <-> night
  const toggleLights = () => setMode(scene === 'day' ? 'night' : 'day')
  const [show3D] = useState(can3D)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="circuit pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-5 md:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {GREETING[scene]} — I’m
          </motion.div>

          <h1 className="section-title text-[clamp(2.9rem,8.5vw,6.4rem)] text-ink">
            <BouncyName text="Pratyush" />
            <br />
            <span className="text-gradient"><BouncyName text="Kumar Sahu" /></span>
          </h1>

          <p className="mt-6 font-mono text-lg text-ink md:text-xl">
            <span className="text-muted">&gt; </span><Typewriter words={profile.roles} />
          </p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-4 max-w-xl text-base text-muted md:text-lg">
            {profile.tagline}
          </motion.p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {profile.vibes.map((v, i) => (
              <motion.li key={v.text}
                initial={{ opacity: 0, y: 12, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                transition={{ delay: 1.1 + i * 0.12, type: 'spring', stiffness: 220, damping: 14 }}
                whileHover={{ rotate: 0, scale: 1.06, y: -3 }}
                className="glass rounded-2xl px-3.5 py-2 text-sm font-medium text-ink">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />{v.text}
              </motion.li>
            ))}
          </ul>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#experience" data-cursor="Let’s go"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold shadow-xl transition-transform hover:scale-105"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 12px 40px -10px var(--glow)' }}>
                See my experience <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} target="_blank" rel="noreferrer" data-cursor="Open CV"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink transition-transform hover:scale-105">
                Resume <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" data-cursor="Say hi" className="px-3 py-3.5 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
                Say hi
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
          className="relative h-[300px] md:h-[520px]">
          {show3D ? (
            <Suspense fallback={<DeskFallback />}>
              <HeroDesk scene={scene} onToggleLights={toggleLights} />
            </Suspense>
          ) : <DeskFallback />}
          {show3D && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
              className="glass pointer-events-none absolute left-0 top-4 rounded-2xl px-3.5 py-2 text-xs leading-snug text-ink shadow-lg">
              <span className="font-semibold text-accent">Tip:</span> click the lamp to switch<br />between day and night
            </motion.div>
          )}
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="glass grid h-12 w-7 place-items-start justify-center rounded-full pt-2">
          <span className="h-2 w-1 rounded-full bg-accent" />
        </motion.span>
      </a>
    </section>
  )
}
