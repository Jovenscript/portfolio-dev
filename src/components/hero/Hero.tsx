import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { STATS } from '../../data/site'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { Logo } from '../brand/Logo'
import { Reveal } from '../ui/Reveal'
import { IconArrow, IconCode, IconPin, IconSpark } from '../ui/icons'

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(end); return }
    const c = animate(0, end, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setVal(Math.floor(v)) })
    return () => c.stop()
  }, [inView, end, reduce])
  return (
    <div>
      <dt ref={ref as any}>{val}{suffix}</dt>
      <dd>{label}</dd>
    </div>
  )
}

/** Cartão de vidro (business card) que substitui o antigo 3D. */
function IdCard() {
  return (
    <Reveal className="id-card" delay={0.1} y={30}>
      <div className="id-top">
        <span className="id-brand"><Logo /></span>
        <span className="id-chip">Full Stack</span>
      </div>
      <h2 className="id-name">Marlon Tavares</h2>
      <p className="id-role">Desenvolvedor Full Stack &amp; técnico de manutenção industrial</p>
      <div className="id-facts">
        <div><IconPin /> Jaraguá do Sul · Santa Catarina</div>
        <div><IconCode /> React · Firebase · JavaScript</div>
        <div><IconSpark /> 4 produtos rodando em produção</div>
      </div>
      <div className="id-tags">
        <span>Vite</span><span>Tailwind</span><span>Capacitor</span><span>Cloud Functions</span>
      </div>
      <div className="id-status"><span className="dot" />Disponível para novos projetos</div>
    </Reveal>
  )
}

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

        <IdCard />
      </div>
      <div className="container"><div className="scroll-hint">Role para explorar</div></div>
    </section>
  )
}
