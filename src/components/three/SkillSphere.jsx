import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const R = 2.1

function Labels({ items, selected, onSelect }) {
  const refs = useRef([])
  const camera = useThree((s) => s.camera)
  const pts = useMemo(() => items.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / items.length)
    const theta = Math.sqrt(items.length * Math.PI) * phi
    return new THREE.Vector3().setFromSphericalCoords(R, phi, theta)
  }), [items])

  const dir = useMemo(() => new THREE.Vector3(), [])
  const n = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    dir.copy(camera.position).normalize()
    refs.current.forEach((el, i) => {
      if (!el) return
      const t = (n.copy(pts[i]).normalize().dot(dir) + 1) / 2 // 0 = back, 1 = front
      el.style.opacity = String(0.18 + t * 0.82)
      el.style.transform = `scale(${0.62 + t * 0.55})`
      el.style.filter = t < 0.35 ? 'blur(1px)' : 'none'
    })
  })

  return items.map((label, i) => (
    <Html key={label} position={pts[i]} center zIndexRange={[20, 0]}>
      <button
        type="button"
        ref={(el) => (refs.current[i] = el)}
        onClick={() => onSelect(selected === label ? null : label)}
        data-cursor={selected === label ? 'Unpick' : 'Pick'}
        className="whitespace-nowrap rounded-full px-3 py-1 font-mono text-xs font-semibold transition-colors"
        style={selected === label
          ? { background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 0 16px var(--glow)' }
          : { background: 'color-mix(in srgb, var(--accent) 16%, var(--card))', color: 'var(--text)', border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)', backdropFilter: 'blur(6px)' }}
      >
        {label}
      </button>
    </Html>
  ))
}

function Core() {
  const m = useRef()
  useFrame((_, dt) => { m.current.rotation.y += dt * 0.3; m.current.rotation.x += dt * 0.1 })
  return (
    <mesh ref={m}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.18} />
    </mesh>
  )
}

export default function SkillSphere({ items, selected, onSelect }) {
  return (
    <div className="h-full w-full" data-cursor="Drag to spin">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 50 }} gl={{ alpha: true }}>
        <Core />
        <Labels items={items} selected={selected} onSelect={onSelect} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.4} rotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}
