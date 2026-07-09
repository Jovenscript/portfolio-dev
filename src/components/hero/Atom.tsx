import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { LogoMark } from '../brand/Logo'

const IC = 'assets/icons'
type Tech = { n: string; i: string }
const ORBITS: { rot: number; speed: number; items: Tech[] }[] = [
  { rot: 0, speed: 0.26, items: [{ n: 'React', i: 'react' }, { n: 'Node.js', i: 'nodejs' }, { n: 'Firebase', i: 'firebase' }] },
  { rot: 60, speed: -0.2, items: [{ n: 'JavaScript', i: 'javascript' }, { n: 'TypeScript', i: 'typescript' }, { n: 'Vite', i: 'vitejs' }] },
  { rot: 120, speed: 0.17, items: [{ n: 'Tailwind', i: 'tailwindcss' }, { n: 'Capacitor', i: 'capacitor' }, { n: 'Git', i: 'git' }] },
]

// achata os elétrons com órbita + ângulo inicial distribuído
const ELECTRONS = ORBITS.flatMap((o, oi) =>
  o.items.map((it, j) => ({ ...it, orbit: oi, rot: o.rot, speed: o.speed, base: (j / o.items.length) * Math.PI * 2 })),
)

export function Atom() {
  const reduce = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const elRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let raf = 0, t0 = performance.now(), visible = true
    let scroll = 0, target = 0

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduce) { t0 = performance.now() - (t0 ? 0 : 0); raf = requestAnimationFrame(loop) }
      else cancelAnimationFrame(raf)
    }, { threshold: 0.01 })
    io.observe(stage)

    const onScroll = () => { target = window.scrollY }

    const place = (time: number) => {
      const S = stage.clientWidth
      const cx = S / 2, cy = S / 2
      const A = S * 0.44, B = S * 0.155
      const ES = Math.max(30, S * 0.115)
      const scrollOff = scroll * 0.0018
      for (let k = 0; k < ELECTRONS.length; k++) {
        const e = ELECTRONS[k], node = elRefs.current[k]
        if (!node) continue
        const dir = e.speed < 0 ? -1 : 1
        const t = e.base + time * e.speed + scrollOff * dir
        const lx = A * Math.cos(t), ly = B * Math.sin(t)
        const rad = (e.rot * Math.PI) / 180
        const x = cx + lx * Math.cos(rad) - ly * Math.sin(rad)
        const y = cy + lx * Math.sin(rad) + ly * Math.cos(rad)
        const depth = Math.sin(t) // -1(trás) .. 1(frente)
        const sc = 0.76 + (depth + 1) / 2 * 0.4
        node.style.width = node.style.height = ES + 'px'
        node.style.transform = `translate3d(${x - ES / 2}px, ${y - ES / 2}px, 0) scale(${sc.toFixed(3)})`
        node.style.opacity = String(0.5 + (depth + 1) / 2 * 0.5)
        node.style.zIndex = depth > 0 ? '4' : '1'
      }
    }

    const loop = (now: number) => {
      scroll += (target - scroll) * 0.09
      place((now - t0) / 1000)
      if (visible) raf = requestAnimationFrame(loop)
    }

    if (reduce) {
      place(0)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      raf = requestAnimationFrame(loop)
    }
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [reduce])

  return (
    <div className="atom-wrap">
      <div className="atom-stage" ref={stageRef}>
        <svg className="atom-orbits" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7FB2FF" /><stop offset="1" stopColor="#56E0D0" />
            </linearGradient>
          </defs>
          {ORBITS.map((o, i) => (
            <ellipse key={i} cx="50" cy="50" rx="44" ry="15.5" transform={`rotate(${o.rot} 50 50)`}
              fill="none" stroke="url(#orb)" strokeWidth="0.5" opacity="0.4" />
          ))}
        </svg>

        <div className="nucleus"><LogoMark size={72} /></div>

        {ELECTRONS.map((e, k) => (
          <div key={e.n} className="electron" title={e.n} ref={(n) => { elRefs.current[k] = n }}>
            <img src={`${IC}/${e.i}.svg`} alt={e.n} loading="lazy" />
          </div>
        ))}
      </div>
      <p className="atom-cap"><span className="dot" />Meu stack, em órbita</p>
    </div>
  )
}
