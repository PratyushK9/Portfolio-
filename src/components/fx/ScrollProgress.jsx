import { motion, useScroll, useSpring } from 'framer-motion'

// A live "wire" across the top that fills as you scroll, with a spark at its tip.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <motion.div className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--accent-2), var(--accent))', boxShadow: '0 0 12px var(--glow)' }} />
  )
}
