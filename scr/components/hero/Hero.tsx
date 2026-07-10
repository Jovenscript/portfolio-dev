import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { STATS } from '../../data/site'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { Reveal } from '../ui/Reveal'
import { Typewriter } from '../ui/Typewriter'
import { IconArrow, IconChevronDown } from '../ui/icons'

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
  return (<div><dt ref={ref as any}>{val}{suffix}</dt><dd>{label}</dd></div>)
}

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -40])
  return (
    <section className="hero" id="topo">
      <div className="container hero-inner">
        <motion.div className="hero-text" style={{ y }}>
          <Reveal><p className="eyebrow">Desenvolvedor Full Stack · Jaraguá do Sul, SC</p></Reveal>
          <Typewriter
            as="h1" speed={40} startDelay={250}
            segments={[{ t: 'Transformo código\n' }, { t: 'em ' }, { t: 'produtos reais', c: 'grad' }, { t: '.' }]}
          />
          <Typewriter
            as="p" className="lead" speed={9} startDelay={1600}
            text={'Desenvolvedor full-stack. Escrevo software que roda de verdade em produção — e-commerce com cliente ativo, apps instaláveis e sistemas usados todos os dias. Do front-end ao deploy, com obsessão por detalhe.'}
          />
          <Reveal delay={0.15}>
            <div className="cta">
              <a className="btn primary" href="#projetos">Ver projetos <IconArrow /></a>
              <a className="btn ghost" href="#contato">Entrar em contato</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="stats">{STATS.map((s) => <StatCounter key={s.label} {...s} />)}</dl>
          </Reveal>
        </motion.div>
      </div>
      <div className="container">
        <div className="scroll-cue">
          <span className="scroll-ring"><IconChevronDown /></span>
          <span className="scroll-txt">Role para explorar</span>
        </div>
      </div>
    </section>
  )
}
