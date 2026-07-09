import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { LogoMark } from '../brand/Logo'

const IC = 'assets/icons'
const ORBITS: { rot: number; speed: number; items: { n: string; i: string }[] }[] = [
  { rot: 0, speed: 0.24, items: [{ n: 'React', i: 'react' }, { n: 'Node.js', i: 'nodejs' }, { n: 'Firebase', i: 'firebase' }] },
  { rot: 60, speed: -0.19, items: [{ n: 'JavaScript', i: 'javascript' }, { n: 'TypeScript', i: 'typescript' }, { n: 'Vite', i: 'vitejs' }] },
  { rot: 120, speed: 0.16, items: [{ n: 'Tailwind', i: 'tailwindcss' }, { n: 'Capacitor', i: 'capacitor' }, { n: 'Git', i: 'git' }] },
]
const ELECTRONS = ORBITS.flatMap((o, oi) =>
  o.items.map((it, j) => ({ ...it, orbit: oi, rot: o.rot, speed: o.speed, base: (j / o.items.length) * Math.PI * 2 })),
)

/**
 * Fundo fixo de tela cheia (position:fixed), vivo o tempo todo:
 *  - átomo: núcleo = logo, elétrons = techs orbitando em 3 anéis
 *  - rede de partículas/circuito piscando + pulsos de sinal
 *  - parallax por profundidade no scroll; leve zoom de câmera
 * Um único requestAnimationFrame. Content passa por cima (glass).
 */
export function Backdrop() {
  const reduce = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const atomRef = useRef<HTMLDivElement>(null)
  const elRefs = useRef<(HTMLDivElement | null)[]>([])
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 2400], [0, -140])

  useEffect(() => {
    const canvas = canvasRef.current, atom = atomRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })!
    let raf = 0, W = 0, H = 0, DPR = 1, maxScroll = 1
    let scroll = 0, target = 0
    const t0 = performance.now()
    const mobile = window.matchMedia('(max-width: 860px)').matches
    const COUNT = mobile ? 44 : 90
    const LINK = mobile ? 150 : 180, LINK2 = LINK * LINK
    const BLUE = [127, 178, 255], AQUA = [86, 224, 208]
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const makeGlow = (rgb: number[]) => {
      const s = 48, c = document.createElement('canvas'); c.width = c.height = s
      const g = c.getContext('2d')!, grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
      grd.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.85)`); grd.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
      g.fillStyle = grd; g.fillRect(0, 0, s, s); return c
    }
    const glowBlue = makeGlow(BLUE), glowAqua = makeGlow(AQUA)

    type Node = { x: number; y: number; vx: number; vy: number; r: number; d: number; c: number[]; ph: number }
    let nodes: Node[] = []
    type Pulse = { a: number; b: number; t: number; s: number }
    let pulses: Pulse[] = []
    const spawnPulse = (): Pulse => { const a = (Math.random() * COUNT) | 0; return { a, b: (a + 1 + ((Math.random() * 4) | 0)) % COUNT, t: Math.random(), s: rand(0.004, 0.011) } }
    const initField = () => {
      nodes = Array.from({ length: COUNT }, () => {
        const d = Math.random()
        return { x: Math.random() * W, y: Math.random() * H, vx: rand(-0.14, 0.14) * (1 - d * 0.5), vy: rand(-0.12, 0.12) * (1 - d * 0.5), r: rand(1.1, 2.6) * (1 - d * 0.45), d, c: Math.random() > 0.5 ? BLUE : AQUA, ph: Math.random() * 6.28 }
      })
      pulses = Array.from({ length: mobile ? 5 : 9 }, spawnPulse)
    }

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      maxScroll = Math.max(1, document.body.scrollHeight - H)
      if (!nodes.length) initField()
    }

    const drawField = (time: number) => {
      const prog = Math.min(scroll / maxScroll, 1), zoom = 1 + prog * 0.1
      const cx = W / 2, cy = H / 2
      ctx.clearRect(0, 0, W, H)
      const px: number[] = [], py: number[] = []
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i]
        n.x += n.vx; n.y += n.vy
        if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20
        const par = -scroll * (0.03 + (1 - n.d) * 0.12)
        let yy = n.y + par; yy = ((yy % (H + 40)) + (H + 40)) % (H + 40) - 20
        px[i] = cx + (n.x - cx) * zoom; py[i] = cy + (yy - cy) * zoom
      }
      ctx.lineWidth = 1
      for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
        const dx = px[i] - px[j], dy = py[i] - py[j], d2 = dx * dx + dy * dy
        if (d2 < LINK2) {
          const a = (1 - Math.sqrt(d2) / LINK) * 0.32 * (1 - nodes[i].d * 0.5)
          ctx.strokeStyle = `rgba(120,180,255,${a})`
          ctx.beginPath(); ctx.moveTo(px[i], py[i]); ctx.lineTo(px[j], py[j]); ctx.stroke()
        }
      }
      ctx.globalCompositeOperation = 'lighter'
      for (const p of pulses) {
        p.t += p.s; if (p.t >= 1) { const np = spawnPulse(); p.a = np.a; p.b = np.b; p.t = 0; p.s = np.s }
        const x = px[p.a] + (px[p.b] - px[p.a]) * p.t, y = py[p.a] + (py[p.b] - py[p.a]) * p.t
        ctx.drawImage(glowAqua, x - 9, y - 9, 18, 18)
      }
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i], g = n.c === BLUE ? glowBlue : glowAqua
        const twinkle = 0.65 + 0.35 * Math.sin(time * 2 + n.ph) // piscar
        const gs = n.r * 7 * (1 - n.d * 0.3)
        ctx.globalAlpha = 0.5 * (1 - n.d * 0.4) * twinkle
        ctx.drawImage(g, px[i] - gs / 2, py[i] - gs / 2, gs, gs)
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i]
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.9 * (1 - n.d * 0.4)})`
        ctx.beginPath(); ctx.arc(px[i], py[i], n.r, 0, 6.2832); ctx.fill()
      }
    }

    const placeAtom = (time: number) => {
      if (!atom) return
      const S = atom.clientWidth, cx = S / 2, cy = S / 2
      const A = S * 0.44, B = S * 0.15, ES = Math.max(30, S * 0.09)
      const scrollOff = scroll * 0.0016
      atom.style.transform = `translate(-50%,-50%) translateY(${(-scroll * 0.02).toFixed(1)}px)`
      for (let k = 0; k < ELECTRONS.length; k++) {
        const e = ELECTRONS[k], node = elRefs.current[k]; if (!node) continue
        const dir = e.speed < 0 ? -1 : 1
        const t = e.base + time * e.speed + scrollOff * dir
        const lx = A * Math.cos(t), ly = B * Math.sin(t)
        const rad = (e.rot * Math.PI) / 180
        const x = cx + lx * Math.cos(rad) - ly * Math.sin(rad)
        const y = cy + lx * Math.sin(rad) + ly * Math.cos(rad)
        const depth = Math.sin(t), sc = 0.72 + (depth + 1) / 2 * 0.4
        node.style.width = node.style.height = ES + 'px'
        node.style.transform = `translate3d(${x - ES / 2}px, ${y - ES / 2}px, 0) scale(${sc.toFixed(3)})`
        node.style.opacity = String((0.45 + (depth + 1) / 2 * 0.5) * 0.92)
        node.style.zIndex = depth > 0 ? '4' : '1'
      }
    }

    const loop = (now: number) => {
      scroll += (target - scroll) * 0.08
      const time = (now - t0) / 1000
      drawField(time); placeAtom(time)
      raf = requestAnimationFrame(loop)
    }
    const onScroll = () => { target = window.scrollY }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) raf = requestAnimationFrame(loop) }

    resize()
    if (reduce) { drawField(0); placeAtom(0) }
    else {
      raf = requestAnimationFrame(loop)
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVis)
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis) }
  }, [reduce])

  return (
    <div className="backdrop" aria-hidden>
      <canvas ref={canvasRef} className="backdrop-canvas" />
      <motion.div className="grid-layer" style={{ y: gridY }} />
      <div className="atom-bg" ref={atomRef}>
        <svg className="atom-orbits" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7FB2FF" /><stop offset="1" stopColor="#56E0D0" /></linearGradient>
          </defs>
          {ORBITS.map((o, i) => (
            <ellipse key={i} cx="50" cy="50" rx="44" ry="15" transform={`rotate(${o.rot} 50 50)`} fill="none" stroke="url(#orb)" strokeWidth="0.4" opacity="0.35" />
          ))}
        </svg>
        <div className="nucleus"><LogoMark size={96} /></div>
        {ELECTRONS.map((e, k) => (
          <div key={e.n} className="electron" title={e.n} ref={(n) => { elRefs.current[k] = n }}>
            <img src={`${IC}/${e.i}.svg`} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <div className="backdrop-vignette" />
    </div>
  )
}
