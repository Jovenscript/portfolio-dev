import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Fundo animado em canvas: rede de circuito (nós + linhas + pulsos de sinal)
 * que reage ao scroll (parallax por profundidade + leve zoom de "câmera").
 * Vetorial → nítido em qualquer tela, roda em mobile e desktop, leve.
 */
export function Backdrop() {
  const reduce = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 2000], [0, -120]) // grid PCB parallax lento

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })!
    let raf = 0
    let W = 0, H = 0, DPR = 1
    let scroll = 0, targetScroll = 0, maxScroll = 1
    const mobile = window.matchMedia('(max-width: 860px)').matches
    const COUNT = mobile ? 46 : 96
    const LINK = mobile ? 150 : 178
    const LINK2 = LINK * LINK
    const BLUE = [127, 178, 255]
    const AQUA = [86, 224, 208]

    type Node = { x: number; y: number; vx: number; vy: number; r: number; d: number; c: number[] }
    let nodes: Node[] = []
    type Pulse = { a: number; b: number; t: number; s: number }
    let pulses: Pulse[] = []

    // sprites de brilho (pré-renderizados → baratos)
    const makeGlow = (rgb: number[]) => {
      const s = 48, c = document.createElement('canvas'); c.width = c.height = s
      const g = c.getContext('2d')!
      const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
      grd.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.85)`)
      grd.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
      g.fillStyle = grd; g.fillRect(0, 0, s, s)
      return c
    }
    const glowBlue = makeGlow(BLUE)
    const glowAqua = makeGlow(AQUA)

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const init = () => {
      nodes = Array.from({ length: COUNT }, () => {
        const d = Math.random() // profundidade 0(perto)..1(longe)
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: rand(-0.14, 0.14) * (1 - d * 0.5), vy: rand(-0.12, 0.12) * (1 - d * 0.5),
          r: rand(1.1, 2.6) * (1 - d * 0.45),
          d, c: Math.random() > 0.5 ? BLUE : AQUA,
        }
      })
      pulses = Array.from({ length: mobile ? 5 : 10 }, () => spawnPulse())
    }
    const spawnPulse = (): Pulse => {
      const a = (Math.random() * COUNT) | 0
      return { a, b: (a + 1 + ((Math.random() * 4) | 0)) % COUNT, t: Math.random(), s: rand(0.004, 0.011) }
    }

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, mobile ? 2 : 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      maxScroll = Math.max(1, document.body.scrollHeight - H)
      if (!nodes.length) init()
    }

    const frame = () => {
      scroll += (targetScroll - scroll) * 0.08
      const prog = Math.min(scroll / maxScroll, 1)
      const zoom = 1 + prog * 0.12
      const cx = W / 2, cy = H / 2
      ctx.clearRect(0, 0, W, H)

      // posições projetadas (parallax por profundidade + leve zoom)
      const px: number[] = [], py: number[] = []
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i]
        n.x += n.vx; n.y += n.vy
        if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20
        const par = -scroll * (0.03 + (1 - n.d) * 0.12)
        let yy = n.y + par
        yy = ((yy % (H + 40)) + (H + 40)) % (H + 40) - 20
        px[i] = cx + (n.x - cx) * zoom
        py[i] = cy + (yy - cy) * zoom
      }

      // linhas
      ctx.lineWidth = 1
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = px[i] - px[j], dy = py[i] - py[j]
          const d2 = dx * dx + dy * dy
          if (d2 < LINK2) {
            const a = (1 - Math.sqrt(d2) / LINK) * 0.34 * (1 - nodes[i].d * 0.5)
            ctx.strokeStyle = `rgba(120,180,255,${a})`
            ctx.beginPath(); ctx.moveTo(px[i], py[i]); ctx.lineTo(px[j], py[j]); ctx.stroke()
          }
        }
      }

      // pulsos de sinal
      for (const p of pulses) {
        p.t += p.s
        if (p.t >= 1) { const np = spawnPulse(); p.a = np.a; p.b = np.b; p.t = 0; p.s = np.s }
        const ax = px[p.a], ay = py[p.a], bx = px[p.b], by = py[p.b]
        const x = ax + (bx - ax) * p.t, y = ay + (by - ay) * p.t
        ctx.globalCompositeOperation = 'lighter'
        ctx.drawImage(glowAqua, x - 9, y - 9, 18, 18)
        ctx.globalCompositeOperation = 'source-over'
      }

      // nós
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i], g = n.c === BLUE ? glowBlue : glowAqua
        const gs = n.r * 7 * (1 - n.d * 0.3)
        ctx.globalAlpha = 0.5 * (1 - n.d * 0.4)
        ctx.drawImage(g, px[i] - gs / 2, py[i] - gs / 2, gs, gs)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i]
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.9 * (1 - n.d * 0.4)})`
        ctx.beginPath(); ctx.arc(px[i], py[i], n.r, 0, Math.PI * 2); ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const onScroll = () => { targetScroll = window.scrollY }
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduce) raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduce) {
      frame(); cancelAnimationFrame(raf) // um quadro estático
    } else {
      raf = requestAnimationFrame(frame)
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return (
    <div className="backdrop" aria-hidden>
      <canvas ref={canvasRef} className="backdrop-canvas" />
      <motion.div className="grid-layer" style={{ y: gridY }} />
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <div className="backdrop-vignette" />
    </div>
  )
}
