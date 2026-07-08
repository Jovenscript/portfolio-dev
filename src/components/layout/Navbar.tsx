import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Logo } from '../brand/Logo'

const LINKS = [
  ['sobre', 'Sobre'],
  ['projetos', 'Projetos'],
  ['stack', 'Stack'],
  ['contato', 'Contato'],
] as const

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('sobre')

  useEffect(() => {
    const sections = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-42% 0px -54% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a href="#topo" aria-label="Início" style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Navegação principal">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="topbar-right">
          <span className="avail"><span className="dot" aria-hidden />Disponível</span>
          <button className="menu-btn" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
