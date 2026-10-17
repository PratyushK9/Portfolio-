import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MODES, SCENE_LABEL, SCENE_PHRASE, useScene } from './scene/useTimeOfDay'

const Icon = {
  auto: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  dawn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 4v4M5 9l2 2M19 9l-2 2" />
    </svg>
  ),
  day: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  sunset: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 9V5M9 7l3 3 3-3M3 22h18" />
    </svg>
  ),
  night: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  ),
}

// Custom scene switcher: a rotating dial that cycles Auto → Dawn → Day → Sunset → Night.
export default function ModeDial() {
  const { mode, setMode, autoScene } = useScene()
  const [hover, setHover] = useState(false)
  const idx = MODES.indexOf(mode)
  const next = MODES[(idx + 1) % MODES.length]
  const label = mode === 'auto' ? `Auto — it’s ${SCENE_PHRASE[autoScene]} where you are` : `${SCENE_LABEL[mode]} sky`

  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <motion.button
        type="button"
        onClick={() => setMode(next)}
        data-cursor={next === 'auto' ? 'Auto' : SCENE_LABEL[next]}
        aria-label={`Sky mode: ${label}. Click for ${next}.`}
        whileTap={{ scale: 0.85 }}
        className="glass relative grid h-11 w-11 place-items-center rounded-full text-ink shadow-lg"
      >
        {/* ring of dots, one per mode, rotating to the active one */}
        <motion.span className="absolute inset-0" animate={{ rotate: -idx * 72 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
          {MODES.map((m, i) => (
            <span key={m} className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
              style={{
                background: m === mode ? 'var(--accent)' : 'var(--muted)',
                opacity: m === mode ? 1 : 0.45,
                transform: `rotate(${i * 72}deg) translateY(-18px) translate(-50%, -50%)`,
                transformOrigin: '0 0',
              }} />
          ))}
        </motion.span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={mode} initial={{ rotate: -90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-accent">
            {Icon[mode]}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {hover && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="glass absolute right-0 top-14 w-max max-w-[16rem] rounded-xl px-3 py-2 text-xs text-ink shadow-xl">
            <div className="font-semibold">{label}</div>
            <div className="text-muted">Click to switch to {next === 'auto' ? 'Auto' : SCENE_LABEL[next]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
