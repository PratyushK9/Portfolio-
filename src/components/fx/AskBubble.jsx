import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq, profile } from '../../data/profile'
import Bolt from './Bolt'

const FALLBACK = {
  a: 'I only answer from my sources (same rule as my RAG projects). Try one of the suggested questions!',
  source: 'No matching source',
}

function answerFor(text) {
  const t = text.toLowerCase()
  let best = null
  let score = 0
  for (const f of faq) {
    const s = f.keys.filter((k) => t.includes(k)).length
    if (s > score) { score = s; best = f }
  }
  return best || FALLBACK
}

// A tiny client-side "assistant" that answers from profile.js, with a cited source.
export default function AskBubble() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: `Hi! I’m ${profile.firstName}’s mini assistant. Ask me about projects, skills or experience.`, source: null }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const end = useRef(null)

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [msgs, typing])

  const ask = (q, preset) => {
    if (!q.trim() || typing) return
    const hit = preset || answerFor(q)
    setMsgs((m) => [...m, { from: 'me', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { from: 'bot', text: hit.a, source: hit.source }])
    }, 650)
  }

  const asked = new Set(msgs.filter((m) => m.from === 'me').map((m) => m.text))

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ transformOrigin: 'bottom right' }}
            className="glass absolute bottom-16 right-0 flex h-[460px] max-h-[70vh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--line)' }}>
              <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}><Bolt /></span>
              <div>
                <div className="font-display font-bold text-ink">Ask {profile.firstName}</div>
                <div className="font-mono text-[10px] text-muted">answers cite sources · no API calls</div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.from === 'me' ? 'ml-auto rounded-br-sm' : 'rounded-bl-sm text-ink'}`}
                  style={m.from === 'me'
                    ? { background: 'var(--accent)', color: 'var(--on-accent)' }
                    : { background: 'color-mix(in srgb, var(--text) 9%, transparent)' }}>
                  {m.text}
                  {m.source && <div className="mt-1.5 font-mono text-[10px] text-accent">Source: {m.source}</div>}
                </motion.div>
              ))}
              {typing && (
                <div className="flex w-fit gap-1 rounded-2xl px-3 py-3" style={{ background: 'color-mix(in srgb, var(--text) 9%, transparent)' }}>
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.12 }} />
                  ))}
                </div>
              )}
              <div ref={end} />
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {faq.filter((f) => !asked.has(f.q)).slice(0, 3).map((f) => (
                <button key={f.q} type="button" onClick={() => ask(f.q, f)}
                  className="rounded-full px-2.5 py-1 text-xs text-ink" style={{ border: '1px solid var(--line)' }}>
                  {f.q}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="flex gap-2 border-t p-3" style={{ borderColor: 'var(--line)' }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question…" aria-label="Your question"
                className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-muted"
                style={{ border: '1px solid var(--line)' }} />
              <button type="submit" className="rounded-full px-4 text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>Ask</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close assistant' : 'Ask Pratyush'}
        data-cursor={open ? 'Close' : 'Ask me'}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
        className="grid h-14 w-14 place-items-center rounded-full text-2xl shadow-2xl"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', boxShadow: '0 12px 40px -8px var(--glow)' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'x' : 'q'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
            style={{ color: 'var(--on-accent)' }}>
            {open
              ? <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              : <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /></svg>}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
