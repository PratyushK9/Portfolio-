import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScene } from './useTimeOfDay'

// Hand-drawn, animated SVG "pictures" for each time of day.
const CFG = {
  dawn: {
    sky: ['#5b4a9b', '#e98fb0', '#ffd2a8'],
    orb: { type: 'sun', x: '16%', y: '58%', r: 80, color: '#fff3d1', glow: '#ffb38a', from: 80 },
    stars: 0.25, clouds: { color: '#ffe6ee', opacity: 0.75, n: 4 },
    hills: ['#dd93b0', '#ab6b98', '#6c4476'], city: '#4c2f5e', windows: 0.12, birds: false, shooting: false, wire: '#ffd6a8',
  },
  day: {
    sky: ['#3aa6f5', '#8fd4ff', '#eaf8ff'],
    orb: { type: 'sun', x: '82%', y: '14%', r: 64, color: '#fffbe0', glow: '#ffe08a', from: 0 },
    stars: 0, clouds: { color: '#ffffff', opacity: 0.95, n: 6 },
    hills: ['#a7dbb2', '#6bbb83', '#3b885b'], city: '#3a6b80', windows: 0, birds: true, shooting: false, wire: '#2b4a5a',
  },
  sunset: {
    sky: ['#241347', '#9a3a78', '#ff8f4d'],
    orb: { type: 'sun', x: '70%', y: '64%', r: 100, color: '#ffd38a', glow: '#ff7a4d', from: -60 },
    stars: 0.18, clouds: { color: '#c75b8c', opacity: 0.55, n: 4 },
    hills: ['#7f3667', '#4f1f4f', '#2a1033'], city: '#1c0b26', windows: 0.45, birds: true, shooting: false, wire: '#ffd166',
  },
  night: {
    sky: ['#03050f', '#0b1338', '#1a2766'],
    orb: { type: 'moon', x: '80%', y: '16%', r: 50, color: '#f5f1e2', glow: '#9fb6ff', from: 0 },
    stars: 1, clouds: { color: '#2a3570', opacity: 0.35, n: 3 },
    hills: ['#1a245c', '#10183f', '#080d26'], city: '#060a1f', windows: 0.65, birds: false, shooting: true, wire: '#7cf7ff',
  },
}

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function useStatic() {
  return useMemo(() => {
    const r = rng(1304)
    const stars = Array.from({ length: 140 }, () => ({
      x: r() * 100, y: r() * 62, s: r() < 0.12 ? 2.6 : 1 + r() * 1.2, d: 2 + r() * 4, delay: r() * 5,
    }))
    const clouds = Array.from({ length: 6 }, (_, i) => ({
      y: 6 + r() * 34, scale: 0.6 + r() * 0.9, dur: 70 + r() * 80, delay: -r() * 120 - i * 10,
    }))
    const buildings = []
    let x = 960
    while (x < 1300) {
      const w = 22 + Math.floor(r() * 34)
      const h = 30 + Math.floor(r() * 85)
      const win = []
      for (let wy = 300 - h + 10; wy < 290; wy += 14) {
        for (let wx = x + 6; wx < x + w - 8; wx += 11) win.push({ x: wx, y: wy, lit: r() })
      }
      buildings.push({ x, w, h, win })
      x += w + 2 + Math.floor(r() * 6)
    }
    return { stars, clouds, buildings }
  }, [])
}

function Pylon({ x, y, s = 1, color }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="2.2" fill="none" strokeLinejoin="round">
      <path d="M-14 0 L-3 -110 L3 -110 L14 0 M-11 -25 L11 -25 M-8 -55 L8 -55 M-5 -82 L5 -82 M-14 0 L8 -55 M14 0 L-8 -55 M-8 -55 L5 -82 M8 -55 L-5 -82" />
      <path d="M-26 -90 L26 -90 M-20 -102 L20 -102 M-3 -110 L0 -122 L3 -110" />
    </g>
  )
}

function Landscape({ c, buildings }) {
  // Wires hang from pylon arms at (x±26, -90) / (x±20, -102)
  const wires = [
    'M174 170 Q 510 240 844 180', 'M226 170 Q 550 250 896 180',
    'M844 180 Q 1110 235 1375 164', 'M896 180 Q 1150 245 1425 164',
  ]
  return (
    <svg className="absolute bottom-0 left-0 w-full h-[34vh] min-h-[200px]" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <path d="M0 260 C 180 200 320 230 480 210 C 660 185 820 240 1000 215 C 1180 190 1300 220 1440 200 L1440 400 L0 400Z" fill={c.hills[0]} style={{ transition: 'fill 1s' }} />
      <Pylon x={200} y={260} color={c.city} />
      <Pylon x={870} y={270} color={c.city} />
      <Pylon x={1400} y={250} s={0.95} color={c.city} />
      {wires.map((d) => <path key={d} d={d} stroke={c.city} strokeWidth="1.2" fill="none" opacity="0.8" />)}
      {wires.map((d, i) => (
        <path key={'c' + d} d={d} stroke={c.wire} strokeWidth="2.2" fill="none" className="wire-current"
          style={{ animationDelay: `${i * -0.6}s`, filter: `drop-shadow(0 0 4px ${c.wire})` }} />
      ))}
      <path d="M0 300 C 200 270 380 300 560 285 C 760 268 940 300 1140 285 C 1280 275 1380 290 1440 282 L1440 400 L0 400Z" fill={c.hills[1]} />
      {buildings.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y={300 - b.h} width={b.w} height={b.h + 20} fill={c.city} />
          {c.windows > 0 && b.win.filter((w) => w.lit < c.windows).map((w) => (
            <rect key={w.x + '-' + w.y} x={w.x} y={w.y} width="5" height="7" fill="#ffd77a" opacity={0.55 + w.lit * 0.6} />
          ))}
        </g>
      ))}
      <path d="M0 340 C 240 310 420 350 640 335 C 880 318 1060 352 1260 332 C 1340 325 1400 330 1440 328 L1440 400 L0 400Z" fill={c.hills[2]} />
    </svg>
  )
}

function Orb({ o }) {
  return (
    <motion.div
      className="absolute rounded-full"
      initial={{ y: o.from, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.4, ease: 'easeOut' }}
      style={{
        left: o.x, top: o.y, width: o.r * 2, height: o.r * 2, marginLeft: -o.r, marginTop: -o.r,
        background: `radial-gradient(circle at 35% 35%, #fff, ${o.color} 55%, ${o.glow})`,
        boxShadow: `0 0 ${o.r}px ${o.r / 2}px ${o.glow}66, 0 0 ${o.r * 3}px ${o.r}px ${o.glow}33`,
      }}
    >
      {o.type === 'moon' && (
        <>
          <span className="absolute rounded-full bg-black/10" style={{ width: '22%', height: '22%', left: '22%', top: '30%' }} />
          <span className="absolute rounded-full bg-black/10" style={{ width: '14%', height: '14%', left: '58%', top: '55%' }} />
          <span className="absolute rounded-full bg-black/10" style={{ width: '10%', height: '10%', left: '50%', top: '20%' }} />
        </>
      )}
    </motion.div>
  )
}

function Cloud({ color, opacity, cl }) {
  return (
    <div className="absolute left-0" style={{ top: `${cl.y}%`, animation: `drift ${cl.dur}s linear ${cl.delay}s infinite` }}>
      <svg width={220 * cl.scale} height={80 * cl.scale} viewBox="0 0 220 80" style={{ opacity }}>
        <path d="M30 70 C 0 70 0 40 28 40 C 30 18 62 10 78 28 C 90 4 140 4 150 30 C 175 18 205 34 196 54 C 220 60 210 74 190 72 Z" fill={color} />
      </svg>
    </div>
  )
}

function Bird({ top, delay, dur, size }) {
  return (
    <div className="absolute left-0" style={{ top, animation: `fly ${dur}s linear ${delay}s infinite` }}>
      <svg width={size} height={size / 2} viewBox="0 0 40 20" style={{ animation: 'flap 0.6s ease-in-out infinite' }}>
        <path d="M0 10 Q 10 0 20 10 Q 30 0 40 10" stroke="#2a1033" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function SceneLayer({ name }) {
  const c = CFG[name]
  const { stars, clouds, buildings } = useStatic()
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      style={{ background: `linear-gradient(180deg, ${c.sky[0]} 0%, ${c.sky[1]} 55%, ${c.sky[2]} 100%)` }}
    >
      {c.stars > 0 && stars.map((s, i) => (
        <span key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: c.stars,
            animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite` }} />
      ))}
      {c.shooting && (
        <span className="absolute h-[2px] w-40 origin-right"
          style={{ right: '8%', top: '10%', background: 'linear-gradient(90deg, transparent, #fff)', animation: 'shoot 9s ease-out 3s infinite' }} />
      )}
      <Orb o={c.orb} />
      {clouds.slice(0, c.clouds.n).map((cl, i) => <Cloud key={i} color={c.clouds.color} opacity={c.clouds.opacity} cl={cl} />)}
      {c.birds && (
        <>
          <Bird top="22%" delay={0} dur={38} size={26} />
          <Bird top="25%" delay={-2} dur={40} size={18} />
          <Bird top="19%" delay={-14} dur={46} size={22} />
        </>
      )}
      <Landscape c={c} buildings={buildings} />
    </motion.div>
  )
}

export default function SkyBackground() {
  const { scene } = useScene()
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <AnimatePresence initial={false}>
        <SceneLayer key={scene} name={scene} />
      </AnimatePresence>
    </div>
  )
}

export const SCENE_CFG = CFG
