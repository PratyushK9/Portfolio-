import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ModeDial from './ModeDial'
import { profile } from '../data/profile'

const LINKS = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['certs', 'Certs'],
  ['fanmail', 'Fan Mail'],
  ['contact', 'Contact'],
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-4">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${scrolled ? 'glass shadow-xl' : ''}`}>
        <a href="#top" data-cursor="Home" className="pl-3">
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">{profile.firstName}<span className="text-accent">.</span></span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="relative rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink">
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full"
                    style={{ background: 'color-mix(in srgb, var(--accent) 22%, transparent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ModeDial />
          <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}
            className="glass grid h-11 w-11 place-items-center rounded-full text-ink md:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 md:hidden">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-medium text-ink">{label}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
