import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './fx/Reveal'
import { asset } from '../data/profile'

// 100% imaginary, clearly-labelled parody testimonials. Quotes are made up.
const ROW_1 = [
  { name: 'Kunal Shah', co: 'CRED', color: '#1f1f1f', quote: 'His code is so clean I’d reward it with CRED coins. Don’t ask me what they’re worth.' },
  { name: 'Elon Musk', co: 'SpaceX', color: '#e31937', quote: 'Asked him to fix X. He asked for a PRD first. Respect.' },
  { name: 'Nithin Kamath', co: 'Zerodha', color: '#387ed1', quote: 'Zero brokerage, 100% returns. Going long on Pratyush.' },
  { name: 'Jensen Huang', co: 'NVIDIA', color: '#76b900', quote: 'The more Pratyush you hire, the more you save.' },
  { name: 'Deepinder Goyal', co: 'Zomato', color: '#e23744', quote: 'Ships features faster than 10-minute delivery. Hot, fresh, bug-free.' },
  { name: 'Sam Altman', co: 'OpenAI', color: '#10a37f', quote: 'His AI actually cites its sources. Asking for a friend… how?' },
  { name: 'Aman Gupta', co: 'boAt', color: '#ff2d2d', quote: 'Yeh RAG pipeline? Ekdum boAt-iful. I’m in, 100% equity.' },
]

const ROW_2 = [
  { name: 'Bill Gates', co: 'Microsoft', color: '#00a4ef', quote: 'If I’d had Pratyush in 1975, Windows would never have crashed. Probably.' },
  { name: 'Anupam Mittal', co: 'Shaadi.com', color: '#ff5a60', quote: 'Matched millions of people. Pratyush + your team = perfect match.' },
  { name: 'Jeff Bezos', co: 'Amazon', color: '#ff9900', quote: '24 tests before shipping? That’s customer obsession. Prime approved.' },
  { name: 'Falguni Nayar', co: 'Nykaa', color: '#fc2779', quote: 'His UI needs zero makeup. Flawless, no filter.' },
  { name: 'Mark Zuckerberg', co: 'Meta', color: '#0866ff', quote: 'Tried to acquire him. He said he’s still in college. Still processing it.' },
  { name: 'Ritesh Agarwal', co: 'OYO', color: '#ee2a24', quote: 'Would give him a free room at OYO. Okay fine, a discount.' },
  { name: 'Sara Blakely', co: 'Spanx', color: '#c2185b', quote: 'Stretches every deadline’s potential without ever missing one.' },
]

// Attribution for the Wikimedia Commons photos in public/founders (see CREDITS.md there)
const CREDITS = [
  ['Elon Musk', 'Gage Skidmore', 'CC BY-SA 4.0', 'File:Elon_Musk_-_54820081119_(cropped).jpg'],
  ['Nithin Kamath', 'Karthik Rangappa', 'CC BY 2.0', 'File:Nithin_Kamath_(Zerodha_Broking_Limited).jpg'],
  ['Jensen Huang', 'The White House', 'Public domain', 'File:Jen-Hsun_Huang_2025.jpg'],
  ['Sam Altman', 'Office of the Prime Minister of Japan', 'CC BY 4.0', 'File:Meeting_with_Masayoshi_Son_and_Sam_Altman_(February_3,_2025)_(3x4_cropped_on_Altman).jpg'],
  ['Aman Gupta', 'Prime Minister’s Office (India)', 'GODL-India', 'File:Aman_Gupta_of_boAt_Lifestyle.jpg'],
  ['Bill Gates', 'Bogdan Hoyaux / European Union', 'CC BY 4.0', 'File:Bill_Gates_at_the_European_Commission_-_P067383-987995_(cropped)_5.jpg'],
  ['Anupam Mittal', 'Bollywood Hungama', 'CC BY 3.0', 'File:Anupam_Mittal.jpg'],
  ['Jeff Bezos', 'U.S. Department of Defense', 'Public domain', 'File:260202-D-PM193-2205_SECWAR_Arsenal_of_Freedom_Tour_-_Florida_(3x4_cropped_on_Bezos_and_rotated).jpg'],
  ['Mark Zuckerberg', 'The White House', 'Public domain', 'File:P20260929DT-1655_(55561811540)_(cropped_2).jpg'],
  ['Ritesh Agarwal', 'Steve Jurvetson', 'CC BY 2.0', 'File:Ritesh_Agrawal_OYO_(cropped).jpg'],
  ['Sara Blakely', 'Gillian Zoe Segal', 'CC BY-SA 4.0', 'File:Sara_Blakely.jpg'],
]

const slug = (name) => name.toLowerCase().replace(/[^a-z]+/g, '-')

// Photo from public/founders/<slug>.jpg; falls back to a big initials panel if the file isn't there.
function Photo({ t }) {
  const [failed, setFailed] = useState(false)
  const initials = t.name.split(' ').map((w) => w[0]).join('')
  if (failed) {
    return (
      <div className="relative grid h-full w-full place-items-center"
        style={{ background: `radial-gradient(circle at 30% 25%, #ffffff40, transparent 55%), linear-gradient(150deg, ${t.color}, #111)` }}>
        <span className="font-display text-7xl font-extrabold text-white/90">{initials}</span>
      </div>
    )
  }
  return (
    <img src={asset(`/founders/${slug(t.name)}.jpg`)} alt={`${t.name} (parody card)`}
      onError={() => setFailed(true)} className="h-full w-full object-cover object-top" />
  )
}

function Card({ t, i }) {
  return (
    <motion.figure
      whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      data-cursor="Totally real"
      className="glass relative mx-4 flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[2rem] shadow-2xl md:w-[400px]">
      <div className="relative h-64 overflow-hidden md:h-80">
        <Photo t={t} />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="font-display text-2xl font-extrabold leading-tight">{t.name}</div>
          <div className="text-sm text-white/75">Founder, {t.co}</div>
        </figcaption>
      </div>
      <blockquote className="relative flex-1 p-5 text-base leading-relaxed text-ink md:text-lg">
        <span className="absolute right-4 top-1 font-display text-6xl leading-none text-accent opacity-30">”</span>
        “{t.quote}”
      </blockquote>
    </motion.figure>
  )
}

function Row({ items, reverse, speed }) {
  return (
    <div className="marquee group relative flex overflow-hidden py-4">
      <div className="marquee-track flex w-max" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {[...items, ...items].map((t, i) => <Card key={i} t={t} i={i} />)}
      </div>
    </div>
  )
}

export default function FanMail() {
  return (
    <section id="fanmail" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="06 · Fan mail" title={<>Founders have a lot to say about me. <span className="text-gradient">What’s your opinion?</span></>}>
          Totally imaginary testimonials. None of these founders have said this (yet), so it’s parody, not endorsements. Hover to pause the hype.
        </SectionHeading>
      </div>
      <div style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <Row items={ROW_1} speed={75} />
        <Row items={ROW_2} speed={85} reverse />
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
        <a href="#contact" data-cursor="Your turn"
          className="rounded-full px-6 py-3 font-semibold shadow-xl transition-transform hover:scale-105"
          style={{ background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 12px 40px -10px var(--glow)' }}>
          Add your (real) opinion ↓
        </a>
        <p className="font-mono text-xs text-muted">* All quotes are made up for fun. Real references available on request.</p>
        <details className="max-w-2xl text-left font-mono text-[11px] text-muted">
          <summary className="cursor-pointer text-center">Photo credits</summary>
          <p className="mt-2">Photos from Wikimedia Commons, resized. Their use here doesn’t imply any endorsement.</p>
          <ul className="mt-1 space-y-0.5">
            {CREDITS.map(([who, author, lic, file]) => (
              <li key={who}>
                {who}: <a className="underline" href={`https://commons.wikimedia.org/wiki/${file}`} target="_blank" rel="noreferrer">photo</a> by {author}, {lic}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
