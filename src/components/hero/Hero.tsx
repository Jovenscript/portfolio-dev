import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { STATS } from '../../data/site'
import { useIsMobile, usePrefersReducedMotion, useWebGL } from '../../lib/hooks'
import { LogoMark } from '../brand/Logo'
import { Reveal } from '../ui/Reveal'
import { IconArrow } from '../ui/icons'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(end); return }
    const controls = animate(0, end, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setVal(Math.floor(v)) })
    return () => controls.stop()
  }, [inView, end, reduce])
  return (
    <div>
      <dt ref={ref as any}>{val}{suffix}</dt>
      <dd>{label}</dd>
    </div>
  )
}

function Stage() {
  const reduce = usePrefersReducedMotion()
  const webgl = useWebGL()
  const mobile = useIsMobile()
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  // 3D apenas em desktop com WebGL e sem redução de movimento.
  // No mobile mostramos o símbolo estático → nada de baixar o Three.js (887 KB).
  const use3D = webgl && !reduce && !mobile

  useEffect(() => {
    if (!use3D || !stageRef.current) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 })
    io.observe(stageRef.current)
    return () => io.disconnect()
  }, [use3D])

  return (
    <div className="core-stage" ref={stageRef} aria-hidden>
      <div className="core-glowbg" />
      {use3D ? (
        <div className="core-canvas">
          <Suspense fallback={<Fallback />}>
            <HeroCanvas active={active} />
          </Suspense>
        </div>
      ) : (
        <Fallback />
      )}
    </div>
  )
}

const Fallback = () => (
  <div className="core-fallback"><LogoMark size={280} /></div>
)

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -40])

  return (
    <section className="hero" id="topo">
      <div className="container hero-inner">
        <motion.div className="hero-text" style={{ y }}>
          <Reveal><p className="eyebrow">Desenvolvedor Full Stack · Jaraguá do Sul, SC</p></Reveal>
          <Reveal delay={0.05}>
            <h1>
              Construo produtos<br />digitais com{' '}
              <span className="grad">acabamento de<br />engenharia</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Da manutenção industrial ao código: entrego software que roda de verdade em produção —
              e-commerce com cliente ativo, PWAs instaláveis e sistemas usados todos os dias. Cada
              detalhe pensado como quem não aceita “quase funcionando”.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="cta">
              <a className="btn primary" href="#projetos">Ver projetos <IconArrow /></a>
              <a className="btn ghost" href="#contato">Entrar em contato</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="stats">
              {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
            </dl>
          </Reveal>
        </motion.div>

        <Stage />
      </div>
      <div className="container"><div className="scroll-hint">Role para explorar</div></div>
    </section>
  )
}
