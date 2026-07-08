import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const BLUE = '#7FB2FF'
const AQUA = '#56E0D0'

// Centro-linha do "M" (esquerda→direita)
const P = {
  A: new THREE.Vector2(-2.4, -1.7),
  B: new THREE.Vector2(-1.3, 1.7),
  C: new THREE.Vector2(0, -0.35),
  D: new THREE.Vector2(1.3, 1.7),
  E: new THREE.Vector2(2.4, -1.7),
}
const SEGMENTS: [THREE.Vector2, THREE.Vector2, string][] = [
  [P.A, P.B, BLUE],
  [P.B, P.C, BLUE],
  [P.C, P.D, AQUA],
  [P.D, P.E, AQUA],
]

function Segment({ a, b, color }: { a: THREE.Vector2; b: THREE.Vector2; color: string }) {
  const mid = a.clone().add(b).multiplyScalar(0.5)
  const len = a.distanceTo(b)
  const angle = Math.atan2(b.y - a.y, b.x - a.x)
  return (
    <RoundedBox
      args={[len + 0.18, 0.44, 0.5]}
      radius={0.16}
      smoothness={4}
      position={[mid.x, mid.y, 0.62]}
      rotation={[0, 0, angle]}
    >
      <meshStandardMaterial
        color="#0C1526"
        emissive={color}
        emissiveIntensity={1.15}
        metalness={0.3}
        roughness={0.4}
      />
    </RoundedBox>
  )
}

function Node({ p, r = 0.32, color = '#EAF6FF' }: { p: THREE.Vector2; r?: number; color?: string }) {
  return (
    <mesh position={[p.x, p.y, 0.66]}>
      <sphereGeometry args={[r, 24, 24]} />
      <meshStandardMaterial color="#0C1526" emissive={color} emissiveIntensity={1.4} roughness={0.35} />
    </mesh>
  )
}

export function ChipMark() {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })

  // Hexágono extrudado (chip)
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const R = 3.15
    for (let i = 0; i < 6; i++) {
      const ang = Math.PI / 2 + (i * Math.PI) / 3
      const x = Math.cos(ang) * R
      const y = Math.sin(ang) * R
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
    }
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.9, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.18, bevelSegments: 3,
    })
    g.translate(0, 0, -0.45)
    g.computeVertexNormals()
    return g
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const sy = window.scrollY || 0
    target.current.x = state.pointer.x * 0.35 + sy * 0.0007
    target.current.y = -state.pointer.y * 0.28 + sy * 0.0004
    g.rotation.y += (target.current.x - g.rotation.y) * 0.06
    g.rotation.x += (target.current.y - g.rotation.x) * 0.06
    g.position.y = -Math.min(sy, 700) * 0.0016
  })

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.55}>
      <group ref={group} scale={0.92}>
        {/* corpo do chip */}
        <mesh geometry={geo} castShadow>
          <meshStandardMaterial color="#0C1220" metalness={0.86} roughness={0.26} envMapIntensity={0.7} />
        </mesh>
        {/* aro interno sutil */}
        <mesh position={[0, 0, 0.5]}>
          <ringGeometry args={[2.72, 2.86, 6]} />
          <meshStandardMaterial color="#0C1526" emissive={BLUE} emissiveIntensity={0.35} side={THREE.DoubleSide} />
        </mesh>
        {/* M */}
        {SEGMENTS.map(([a, b, c], i) => (
          <Segment key={i} a={a} b={b} color={c} />
        ))}
        <Node p={P.B} />
        <Node p={P.D} />
        <Node p={P.C} r={0.24} color={AQUA} />
      </group>
    </Float>
  )
}
