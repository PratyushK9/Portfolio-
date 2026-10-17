import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', style }) {
  const Tag = motion[as]
  return (
    <Tag className={className} style={style} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ kicker, title, children }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">{kicker}</div>
      <h2 className="section-title text-4xl text-ink md:text-6xl">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-muted">{children}</p>}
    </Reveal>
  )
}
