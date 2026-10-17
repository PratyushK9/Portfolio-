import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { SCENE_LABEL, useScene } from './scene/useTimeOfDay'
import Reveal from './fx/Reveal'
import Magnetic from './fx/Magnetic'

const Social = {
  linkedin: <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z" /></svg>,
  github: <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>,
  mail: <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const { email, linkedin, github, phone, showPhone } = profile.contact

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-5 py-24 md:py-36">
      <Reveal className="glass relative overflow-hidden rounded-[2.5rem] p-8 text-center md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: 'var(--accent)' }} />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--accent-2)' }} />

        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">07 · Contact</div>
          <h2 className="section-title mt-4 text-5xl text-ink md:text-7xl">
            Let’s build <span className="text-gradient">something</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Internships, projects, or a chat about AI that doesn’t make things up. My inbox is open.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Magnetic strength={0.25}>
              <button type="button" onClick={copy} data-cursor={copied ? 'Copied!' : 'Copy'}
                className="relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-sm font-semibold shadow-xl md:text-base"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 16px 50px -12px var(--glow)' }}>
                {Social.mail}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={copied ? 'c' : 'e'} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
                    {copied ? 'Copied to clipboard!' : email}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
            {showPhone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-mono text-sm text-muted">{phone}</a>}

            <div className="mt-2 flex gap-3">
              {[['linkedin', linkedin, 'LinkedIn'], ['github', github, 'GitHub'], ['mail', `mailto:${email}`, 'Email']]
                .filter(([, href]) => href)
                .map(([k, href, label]) => (
                  <Magnetic key={k} strength={0.5}>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label} data-cursor={label}
                      className="glass grid h-14 w-14 place-items-center rounded-2xl text-ink transition-colors hover:text-accent">
                      {Social[k]}
                    </a>
                  </Magnetic>
                ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const { scene, mode } = useScene()
  return (
    <footer className="relative mx-auto max-w-6xl px-5 pb-10 pt-4">
      <div className="glass flex flex-col items-center justify-between gap-2 rounded-2xl px-5 py-4 text-center text-sm text-muted md:flex-row md:text-left">
        <span>© {new Date().getFullYear()} {profile.name}. Built with React, three.js &amp; a lot of coffee.</span>
        <span className="font-mono text-xs">
          {mode === 'auto' ? `${SCENE_LABEL[scene]} sky, matched to your clock` : `${SCENE_LABEL[scene]} sky, picked by you`}
        </span>
      </div>
    </footer>
  )
}
