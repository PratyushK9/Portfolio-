import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Konami code → confetti + a note.
export default function EasterEgg() {
  const [found, setFound] = useState(false)

  useEffect(() => {
    let pos = 0
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = k === CODE[pos] ? pos + 1 : k === CODE[0] ? 1 : 0
      if (pos === CODE.length) {
        pos = 0
        setFound(true)
        const colors = ['--accent', '--accent-2'].map((v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim())
        confetti({ particleCount: 160, spread: 90, origin: { y: 0.7 }, colors: [...colors, '#ffffff'] })
        setTimeout(() => setFound(false), 5000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {found && (
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40 }}
          className="glass fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-6 py-4 text-center shadow-2xl">
          <div className="font-display text-xl font-extrabold text-ink">You found it!</div>
          <div className="text-sm text-muted">Curious people are my favourite kind. Now hire me.</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
