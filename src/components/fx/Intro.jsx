import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset } from '../../data/profile'

// Iron Man "Daddy's home" intro.
// Browsers block autoplay with sound, so a "Power up" click starts the clip.
// Put your clip at public/intro.mp4. If it's missing, an arc-reactor animation plays instead.
// Shown once per browser session; add ?intro=1 to the URL to force it.
const SEEN = 'pks-intro-seen'
const VIDEO = asset('/intro.mp4')

function shouldShow() {
  if (new URLSearchParams(window.location.search).has('intro')) return true
  try { return !sessionStorage.getItem(SEEN) } catch { return true }
}

function ArcReactor({ on }) {
  return (
    <motion.div className="relative grid h-44 w-44 place-items-center rounded-full"
      animate={{ boxShadow: on ? '0 0 80px 30px rgba(124,247,255,.55), inset 0 0 40px rgba(124,247,255,.8)' : '0 0 30px 6px rgba(124,247,255,.25), inset 0 0 20px rgba(124,247,255,.3)' }}
      transition={{ duration: 1.2 }}
      style={{ background: 'radial-gradient(circle, #e9feff 0%, #7cf7ff 22%, #0d3b4d 48%, #071520 70%)', border: '6px solid #2a3b48' }}>
      <motion.div className="absolute inset-4 rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: on ? 2 : 8, ease: 'linear' }}
        style={{ background: 'repeating-conic-gradient(rgba(124,247,255,.55) 0 10deg, transparent 10deg 36deg)', mask: 'radial-gradient(circle, transparent 42%, #000 44%, #000 62%, transparent 64%)', WebkitMask: 'radial-gradient(circle, transparent 42%, #000 44%, #000 62%, transparent 64%)' }} />
      <motion.div className="h-12 w-12 rounded-full bg-white" animate={{ opacity: on ? [0.7, 1, 0.8, 1] : 0.5, scale: on ? 1.15 : 1 }}
        transition={{ duration: 1.2, repeat: on ? Infinity : 0, repeatType: 'mirror' }}
        style={{ boxShadow: '0 0 30px 10px #7cf7ff' }} />
    </motion.div>
  )
}

export default function Intro() {
  const [phase, setPhase] = useState(() => (shouldShow() ? 'gate' : 'done')) // gate → video | reactor → done
  const video = useRef(null)
  const [hasVideo, setHasVideo] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = phase === 'done' ? '' : 'hidden'
    if (phase === 'done') { try { sessionStorage.setItem(SEEN, '1') } catch { /* storage unavailable */ } }
  }, [phase])

  useEffect(() => {
    if (phase !== 'reactor') return
    const t = setTimeout(() => setPhase('done'), 3200)
    return () => clearTimeout(t)
  }, [phase])

  const start = async () => {
    if (!hasVideo || !video.current) return setPhase('reactor')
    setPhase('video')
    try {
      video.current.currentTime = 0
      await video.current.play()
    } catch {
      setPhase('reactor')
    }
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div key="intro" className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[#03060d] text-white"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }} transition={{ duration: 0.9, ease: 'easeInOut' }}>
          <video ref={video} src={VIDEO} preload="auto" playsInline
            onError={() => setHasVideo(false)}
            onEnded={() => setPhase('done')}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${phase === 'video' ? 'opacity-100' : 'opacity-0'}`} />

          {phase !== 'video' && (
            <div className="relative flex flex-col items-center gap-8 px-6 text-center">
              <ArcReactor on={phase === 'reactor'} />
              {phase === 'gate' ? (
                <>
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-200/70">J.A.R.V.I.S. standing by</p>
                  <motion.button type="button" onClick={start} data-cursor="Suit up"
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    animate={{ boxShadow: ['0 0 0 0 rgba(124,247,255,.6)', '0 0 0 18px rgba(124,247,255,0)'] }}
                    transition={{ boxShadow: { repeat: Infinity, duration: 1.6 } }}
                    className="rounded-full border border-cyan-300/60 bg-cyan-300/10 px-8 py-3.5 font-display text-lg font-bold tracking-wide text-cyan-100">
                    Power up {hasVideo && <span className="text-sm opacity-70">(sound on)</span>}
                  </motion.button>
                </>
              ) : (
                <motion.h1 initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.04em' }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                  className="font-display text-5xl font-extrabold md:text-7xl" style={{ textShadow: '0 0 30px #7cf7ff' }}>
                  Daddy’s home.
                </motion.h1>
              )}
            </div>
          )}

          <button type="button" onClick={() => { video.current?.pause(); setPhase('done') }}
            className="absolute bottom-6 right-6 rounded-full border border-white/20 px-4 py-2 font-mono text-xs text-white/70 hover:text-white">
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
