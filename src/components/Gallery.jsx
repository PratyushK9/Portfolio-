import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { SectionHeading } from './fx/Reveal'

const ROT = [-6, 4, -3, 5, -5, 3]

// Polaroid scatter of personal photos from profile.js. Hidden until photos are added.
export default function Gallery() {
  const photos = profile.photos.gallery
  if (!photos.length) return null

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading kicker="05 · Off the clock" title={<>Life <span className="text-gradient">beyond the code</span>.</>}>
        Where you can find me when I’m not shipping code.
      </SectionHeading>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {photos.map((it, i) => (
          <motion.figure key={it.src}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: ROT[i % ROT.length] }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
            whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
            data-cursor={it.caption}
            className="w-60 bg-white p-3 pb-4 shadow-2xl md:w-64">
            <img src={it.src} alt={`Pratyush ${it.caption.toLowerCase()}`} loading="lazy"
              className="aspect-[4/5] w-full object-cover" style={{ objectPosition: it.focus || 'center' }} />
            <figcaption className="mt-3 text-center font-display text-base font-semibold text-neutral-700">{it.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
