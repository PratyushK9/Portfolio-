import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { PAL } from './palette'

function useCodeTexture(p) {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 640; c.height = 400
    const g = c.getContext('2d')
    g.fillStyle = p.screenBg; g.fillRect(0, 0, 640, 400)
    g.fillStyle = 'rgba(255,255,255,0.08)'; g.fillRect(0, 0, 640, 34)
    ;['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.arc(22 + i * 22, 17, 7, 0, 7); g.fill() })
    g.font = '600 22px "JetBrains Mono", monospace'
    const lines = [
      [['const ', '#c792ea'], ['pratyush', p.accent], [' = {', '#e6e6e6']],
      [['  studies: ', '#e6e6e6'], ['"Electrical Eng."', '#c3e88d'], [',', '#e6e6e6']],
      [['  builds: ', '#e6e6e6'], ['["React", "Node"]', '#c3e88d'], [',', '#e6e6e6']],
      [['  ai: ', '#e6e6e6'], ['"RAG + citations"', '#c3e88d'], [',', '#e6e6e6']],
      [['  ships: ', '#e6e6e6'], ['true', '#f78c6c'], [',', '#e6e6e6']],
      [['}', '#e6e6e6']],
      [],
      [['// hover around. click the bulb.', '#7f8ea3']],
    ]
    lines.forEach((parts, i) => {
      let x = 26
      parts.forEach(([t, col]) => { g.fillStyle = col; g.fillText(t, x, 78 + i * 38); x += g.measureText(t).width })
    })
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [p])
}

function Laptop({ p }) {
  const tex = useCodeTexture(p)
  return (
    <group position={[-0.15, 0.06, -0.05]}>
      <RoundedBox args={[1.5, 0.06, 1]} radius={0.03} castShadow>
        <meshStandardMaterial color="#c7ccd6" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.032, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.25, 0.45]} />
        <meshStandardMaterial color="#2a2e38" roughness={0.8} />
      </mesh>
      <group position={[0, 0.03, -0.49]} rotation={[-0.28, 0, 0]}>
        <RoundedBox args={[1.5, 0.98, 0.04]} radius={0.03} position={[0, 0.49, 0]} castShadow>
          <meshStandardMaterial color="#b9bfca" metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.5, 0.022]}>
          <planeGeometry args={[1.38, 0.86]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

// The bulb is the website's light switch: clicking it flips the whole sky between day and night.
function Bulb({ p, on, onToggle, onHover }) {
  const group = useRef()
  const glass = useRef()
  const light = useRef()
  const bounce = useRef(0)
  useFrame(({ clock }, dt) => {
    const flick = on ? 2.2 + Math.sin(clock.elapsedTime * 3) * 0.25 : 0.05
    glass.current.emissiveIntensity = THREE.MathUtils.lerp(glass.current.emissiveIntensity, flick, 0.15)
    light.current.intensity = THREE.MathUtils.lerp(light.current.intensity, on ? 4 : 0, 0.15)
    bounce.current = Math.max(0, bounce.current - dt * 2.5)
    group.current.scale.setScalar(1 + Math.sin(bounce.current * Math.PI * 3) * bounce.current * 0.25)
  })
  return (
    <group ref={group} position={[0.95, 0.06, 0.15]}
      onClick={(e) => { e.stopPropagation(); bounce.current = 1; onToggle() }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true) }}
      onPointerOut={() => onHover(false)}>
      {/* generous invisible hit area so the bulb is easy to click */}
      <mesh position={[0, 0.3, 0]} visible={false}>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshBasicMaterial />
      </mesh>
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.12, 24]} />
        <meshStandardMaterial color="#3a3f4b" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 24]} />
        <meshStandardMaterial color="#d8c27a" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial ref={glass} color={on ? p.bulb : '#9aa0aa'} emissive={p.bulb} emissiveIntensity={2} transparent opacity={0.92} roughness={0.15} />
      </mesh>
      <pointLight ref={light} position={[0, 0.4, 0]} color={p.bulb} intensity={4} distance={3} decay={2} />
    </group>
  )
}

function CircuitBoard({ p }) {
  const led = useRef()
  useFrame(({ clock }) => { led.current.emissiveIntensity = (Math.sin(clock.elapsedTime * 4) + 1) * 1.5 })
  const traces = [[-0.2, 0.1, 0.4, 0], [0.1, -0.12, 0.3, Math.PI / 2], [0.2, 0.05, 0.25, 0], [-0.25, -0.1, 0.2, Math.PI / 2]]
  return (
    <group position={[-0.95, 0.06, 0.62]} rotation={[0, 0.35, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.78, 0.04, 0.52]} />
        <meshStandardMaterial color="#1e7a4a" roughness={0.6} />
      </mesh>
      {traces.map(([x, z, len, r], i) => (
        <mesh key={i} position={[x, 0.022, z]} rotation={[0, r, 0]}>
          <boxGeometry args={[len, 0.004, 0.018]} />
          <meshStandardMaterial color="#e3b341" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0.05, 0.05, 0]} castShadow>
        <boxGeometry args={[0.22, 0.05, 0.22]} />
        <meshStandardMaterial color="#14161c" roughness={0.5} />
      </mesh>
      <mesh position={[-0.24, 0.04, 0.14]}>
        <boxGeometry args={[0.12, 0.035, 0.08]} />
        <meshStandardMaterial color="#14161c" />
      </mesh>
      <mesh position={[0.28, 0.05, -0.16]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial ref={led} color={p.accent2} emissive={p.accent2} emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function Mug({ p }) {
  return (
    <group position={[0.75, 0.06, -0.55]}>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.12, 0.28, 32]} />
        <meshStandardMaterial color={p.accent2} roughness={0.4} />
      </mesh>
      <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.065, 0.02, 12, 24]} />
        <meshStandardMaterial color={p.accent2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.115, 32]} />
        <meshStandardMaterial color="#3b2416" roughness={0.2} />
      </mesh>
    </group>
  )
}

function Atom({ p }) {
  const g = useRef()
  useFrame((_, dt) => { g.current.rotation.y += dt * 0.8; g.current.rotation.z += dt * 0.3 })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={g} position={[-0.2, 1.75, -0.2]} scale={0.8}>
        {[0, Math.PI / 3, -Math.PI / 3].map((r) => (
          <mesh key={r} rotation={[Math.PI / 2, r, 0]}>
            <torusGeometry args={[0.38, 0.014, 12, 64]} />
            <meshStandardMaterial color={p.accent} emissive={p.accent} emissiveIntensity={1.4} toneMapped={false} />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color={p.accent} emissive={p.accent} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

// Whole-page mouse position (-1..1) for the tilt; clicks are handled by r3f on the canvas itself.
const mouse = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }, { passive: true })
}

function Desk({ scene, onToggleLights, onHoverBulb }) {
  const p = PAL[scene]
  const g = useRef()
  useFrame(() => {
    const { x, y } = mouse
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, -0.45 + x * 0.35, 0.05)
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, 0.08 - y * 0.12, 0.05)
  })
  return (
    <group ref={g} position={[0, -0.55, 0]}>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.35}>
        <RoundedBox args={[3, 0.12, 1.8]} radius={0.05} receiveShadow castShadow>
          <meshStandardMaterial color={p.desk} roughness={0.7} />
        </RoundedBox>
        <Laptop p={p} />
        <Bulb p={p} on={scene !== 'day'}onToggle={onToggleLights} onHover={onHoverBulb} />
        <CircuitBoard p={p} />
        <Mug p={p} />
      </Float>
      <Atom p={p} />
      <ContactShadows position={[0, -0.75, 0]} opacity={0.45} scale={6} blur={2.6} far={2} />
    </group>
  )
}

export default function HeroDesk({ scene, onToggleLights }) {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const [bulbHover, setBulbHover] = useState(false)
  const p = PAL[scene]

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="relative h-full w-full" data-cursor={bulbHover ? (scene === 'day' ? 'Make it night' : 'Make it day') : 'Click the lamp'}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [2.7, 2.2, 4.4], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={p.amb} />
        <directionalLight position={[3, 5, 2]} intensity={p.keyI} color={p.key} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color={p.fill} />
        <Desk scene={scene} onToggleLights={onToggleLights} onHoverBulb={setBulbHover} />
        <Sparkles count={40} scale={[4, 3, 3]} size={2.5} speed={0.4} color={p.accent} opacity={scene === 'day' ? 0.5 : 0.9} />
      </Canvas>
    </div>
  )
}
