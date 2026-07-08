import { Canvas } from '@react-three/fiber'
import { ChipMark } from '../three/ChipMark'
import { Particles } from '../three/Particles'

/** Cena 3D do hero. Carregada sob demanda (lazy) e pausada quando fora da viewport. */
export default function HeroCanvas({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[-5, 4, 5]} intensity={90} color="#7FB2FF" distance={30} />
      <pointLight position={[5, -3, 4]} intensity={70} color="#56E0D0" distance={30} />
      <directionalLight position={[0, 3, -5]} intensity={0.6} color="#ffffff" />
      <ChipMark />
      <Particles />
    </Canvas>
  )
}
