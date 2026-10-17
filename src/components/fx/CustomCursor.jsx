import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

const TEXT_TAGS = 'p, li, h1, h2, h3, h4, blockquote'

// Dot + springy ring. The ring reacts to what's under it:
//   [data-cursor="label"] → grows and shows the label
//   a / button            → grows
//   [data-cursor-view]    → magnifier
//   text                  → I-beam caret
// Clicking fires a small electric spark burst.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ kind: 'default', label: '' })
  const [down, setDown] = useState(false)
  const [sparks, setSparks] = useState([])
  const [hidden, setHidden] = useState(true)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const rx = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 })
  const ry = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const classify = (t) => {
      if (!(t instanceof Element)) return
      const labelled = t.closest('[data-cursor]')
      const view = t.closest('[data-cursor-view]')
      if (labelled) setState({ kind: 'label', label: labelled.getAttribute('data-cursor') })
      else if (t.closest('a, button, [role="button"], input, textarea')) setState({ kind: 'link', label: '' })
      else if (view) setState({ kind: 'view', label: '' })
      else if (t.closest(TEXT_TAGS)) setState({ kind: 'text', label: '' })
      else setState({ kind: 'default', label: '' })
    }
    const move = (e) => {
      mx.set(e.clientX); my.set(e.clientY)
      setHidden(false)
      classify(e.target)
    }
    // Content moves under a still mouse while scrolling, so re-check what's under it
    const scroll = () => classify(document.elementFromPoint(mx.get(), my.get()))
    const leave = () => setHidden(true)
    const press = (e) => {
      setDown(true)
      const id = Math.random()
      setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 700)
    }
    const release = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('mousedown', press)
    window.addEventListener('mouseup', release)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('mousedown', press)
      window.removeEventListener('mouseup', release)
      document.removeEventListener('mouseleave', leave)
    }
  }, [mx, my])

  if (!enabled) return null

  const size = { default: 34, link: 56, label: 84, view: 96, text: 6 }[state.kind]
  const height = state.kind === 'text' ? 30 : size

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden style={{ opacity: hidden ? 0 : 1, transition: 'opacity .2s' }}>
      {/* trailing ring */}
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size, height, scale: down ? 0.8 : 1,
          borderRadius: state.kind === 'text' ? 3 : 999,
          backgroundColor: state.kind === 'default' || state.kind === 'link' ? 'rgba(0,0,0,0)' : 'var(--accent)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 rounded-[inherit]"
          style={{ border: '2px solid var(--accent)', boxShadow: '0 0 18px var(--glow)', opacity: state.kind === 'text' ? 0 : 1,
            background: state.kind === 'link' ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'transparent' }} />
        <AnimatePresence>
          {state.kind === 'label' && (
            <motion.span key={state.label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="relative px-2 text-center font-mono text-[11px] font-semibold leading-tight" style={{ color: 'var(--on-accent)' }}>
              {state.label}
            </motion.span>
          )}
          {state.kind === 'view' && (
            <motion.svg key="view" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}
              viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="var(--on-accent)" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M10.5 8v5M8 10.5h5" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {/* precise dot */}
      <motion.div className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--glow)' }}
        animate={{ opacity: state.kind === 'text' || state.kind === 'label' || state.kind === 'view' ? 0 : 1 }} />

      {/* click sparks */}
      {sparks.map((s) => (
        <div key={s.id} className="absolute" style={{ left: s.x, top: s.y }}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <motion.span key={i} className="absolute h-[2px] w-3 origin-left rounded"
                style={{ background: i % 2 ? 'var(--accent)' : 'var(--accent-2)', rotate: `${(a * 180) / Math.PI}deg`, boxShadow: '0 0 6px var(--glow)' }}
                initial={{ x: 0, y: 0, opacity: 1, scaleX: 1 }}
                animate={{ x: Math.cos(a) * 34, y: Math.sin(a) * 34, opacity: 0, scaleX: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }} />
            )
          })}
        </div>
      ))}
    </div>
  )
}
