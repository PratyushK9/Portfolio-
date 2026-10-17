import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Reveal, { SectionHeading } from './fx/Reveal'
import Tilt from './fx/Tilt'

// Mini illustrated UI for each project
function ChatVisual() {
  return (
    <div className="space-y-2 p-4 font-mono text-[11px]">
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm px-3 py-2" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
        When does the next placement drive open?
      </div>
      <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
        className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-ink" style={{ background: 'color-mix(in srgb, var(--text) 10%, transparent)' }}>
        Here’s what the uploaded T&P notice says…
        <div className="mt-1.5 inline-block rounded-md px-1.5 py-0.5 text-[10px]" style={{ background: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
          📎 source: tnp_notice.pdf · p.2
        </div>
      </motion.div>
    </div>
  )
}

function FlashcardVisual() {
  const [flip, setFlip] = useState(false)
  return (
    <div className="grid h-full place-items-center p-4" style={{ perspective: 800 }}>
      <motion.button type="button" onClick={() => setFlip((f) => !f)} data-cursor="Flip!"
        animate={{ rotateY: flip ? 180 : 0 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        className="relative h-24 w-44" style={{ transformStyle: 'preserve-3d' }}>
        <span className="absolute inset-0 grid place-items-center rounded-xl px-3 text-center font-display text-sm font-bold text-ink shadow-lg"
          style={{ backfaceVisibility: 'hidden', background: 'color-mix(in srgb, var(--text) 10%, var(--card))', border: '1px solid var(--line)' }}>
          What is OCR used for here?
        </span>
        <span className="absolute inset-0 grid place-items-center rounded-xl px-3 text-center text-xs font-semibold shadow-lg"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--accent)', color: 'var(--on-accent)' }}>
          Reading scanned / image-only PDFs (tesseract.js fallback)
        </span>
      </motion.button>
    </div>
  )
}

const VISUALS = { chat: ChatVisual, flashcard: FlashcardVisual }

function ProjectCard({ p, index, dim, lit }) {
  const Visual = VISUALS[p.visual]
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <div id={`project-${p.id}`} className="h-full scroll-mt-28 transition-all duration-500"
        style={{ opacity: dim ? 0.35 : 1, filter: dim ? 'grayscale(0.6)' : 'none' }}>
        <Tilt max={6} className="rounded-[2rem]">
          <article data-cursor-view className="glass flex h-full flex-col overflow-hidden rounded-[2rem] shadow-2xl"
            style={lit ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 2px var(--accent), 0 30px 80px -30px var(--glow)' } : undefined}>
            <div className="relative h-44 border-b" style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}>
              <div className="absolute left-4 top-3 flex gap-1.5">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
              </div>
              <div className="h-full pt-5"><Visual /></div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7" style={{ transform: 'translateZ(30px)' }}>
              <div className="font-mono text-xs text-accent">0{index + 1}</div>
              <h3 className="mt-1 font-display text-3xl font-extrabold text-ink">{p.title}</h3>
              <div className="text-muted">{p.subtitle}</div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md px-2 py-1 font-mono text-[11px] text-ink"
                    style={{ background: 'color-mix(in srgb, var(--text) 8%, transparent)' }}>{s}</span>
                ))}
              </div>

              <ul className="mt-5 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
                    <span className="mt-1 text-accent">⚡</span><span>{h}</span>
                  </li>
                ))}
              </ul>

              {(p.links.github || p.links.live) && (
                <div className="mt-auto flex gap-3 pt-6">
                  {p.links.live && <a href={p.links.live} target="_blank" rel="noreferrer" data-cursor="Open" className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>Live ↗</a>}
                  {p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer" data-cursor="Code" className="glass rounded-full px-4 py-2 text-sm font-semibold text-ink">GitHub ↗</a>}
                </div>
              )}
            </div>
          </article>
        </Tilt>
      </div>
    </Reveal>
  )
}

export default function Projects({ selected }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading kicker="03 · Projects" title={<>Built end-to-end, <span className="text-gradient">tested for real</span>.</>}>
        A placement portal whose AI cites its sources, and a study app that turns PDFs into flashcards. Hover the cards, and flip the flashcard.
      </SectionHeading>
      <div className="grid gap-8 md:grid-cols-2">
        {profile.projects.map((p, i) => {
          const uses = selected ? p.skills.includes(selected) : false
          return <ProjectCard key={p.id} p={p} index={i} dim={!!selected && !uses} lit={uses} />
        })}
      </div>
    </section>
  )
}
