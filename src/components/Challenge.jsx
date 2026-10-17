import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal from './fx/Reveal'
import Magnetic from './fx/Magnetic'

// "Try this challenge": opens Pratyush's challenge video in a modal.
// Video: public/challenge.mp4 (or set profile.challenge.link to a YouTube/Instagram URL to open that instead).
export default function Challenge() {
  const { video, link } = profile.challenge
  const [open, setOpen] = useState(false)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' }
  }, [open])

  const buttonProps = link
    ? { as: 'a', href: link, target: '_blank', rel: 'noreferrer' }
    : { as: 'button', type: 'button', onClick: () => setOpen(true) }
  const Tag = buttonProps.as === 'a' ? motion.a : motion.button
  const { as, ...rest } = buttonProps

  return (
    <section id="challenge" className="relative mx-auto max-w-5xl px-5 pb-20">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] p-8 text-center md:p-12"
        style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, var(--card)), color-mix(in srgb, var(--accent-2) 22%, var(--card)))', border: '1px solid var(--line)' }}>
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">One last thing…</div>
        <h2 className="section-title mt-3 text-4xl text-ink md:text-6xl">
          I bet you <span className="text-gradient">can’t do this</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          I recorded a challenge just for you. Watch it, try it, and tell me how it went. Bragging rights are on the line.
        </p>
        <div className="mt-8">
          <Magnetic strength={0.3}>
            <Tag {...rest} data-cursor="Dare accepted?"
              whileHover={{ scale: 1.06, rotate: -1 }} whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 0 0 var(--glow)', '0 0 0 16px rgba(0,0,0,0)'] }}
              transition={{ boxShadow: { repeat: Infinity, duration: 1.8 } }}
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-lg font-extrabold"
              style={{ background: 'linear-gradient(100deg, var(--accent), var(--accent-2))', color: 'var(--on-accent)' }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              Try this challenge (if you dare)
            </Tag>
          </Magnetic>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
              {missing ? (
                <div className="grid aspect-video w-[min(48rem,90vw)] place-items-center p-8 text-center text-white">
                  <div>
                    <div className="font-display text-3xl font-extrabold">The challenge is loading…</div>
                    <p className="mt-2 text-white/70">I’m still recording it. Come back soon, and start warming up.</p>
                  </div>
                </div>
              ) : (
                <video src={video} controls autoPlay playsInline onError={() => setMissing(true)} className="block max-h-[85vh] w-auto max-w-full bg-black" />
              )}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
