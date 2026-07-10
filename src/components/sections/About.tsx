import { Reveal } from '../ui/Reveal'
import { Typewriter } from '../ui/Typewriter'

export function About() {
  return (
    <section id="sobre" className="section">
      <header className="section-head">
        <Reveal><span className="tag">01 — Sobre</span></Reveal>
        <Typewriter as="h2" speed={30} text="Código que vira produto, não protótipo" />
      </header>

      <div className="about-grid">
        <div className="about-text">
          <Typewriter as="p" speed={7}
            text="Desenvolvedor autodidata, apaixonado por transformar ideias em software que funciona. Do front-end ao back-end, meu foco é entregar coisas reais — não demonstrações." />
          <Typewriter as="p" speed={7}
            text="Mantenho um e-commerce de cliente em produção, aplicativos instaláveis com CI/CD automatizado e sistemas usados todos os dias. Não é portfólio de exemplo — é produto em operação, mantido depois de entregue." />
          <Typewriter as="p" speed={7}
            text="Curso Análise e Desenvolvimento de Sistemas na UniCesumar e evoluo o stack sem parar: do JavaScript puro ao React, Vite, TypeScript e Firebase." />
        </div>

        <Reveal as="aside" className="about-card" delay={0.1}>
          <div className="about-photo">
            <img src="assets/perfil.webp" alt="Retrato de Marlon Tavares" width={760} height={1018} loading="lazy" />
          </div>
          <ul className="about-facts">
            <li><span>Base</span>Jaraguá do Sul · SC</li>
            <li><span>Atua</span>Full Stack · Front-end</li>
            <li><span>Foco</span>Produtos em produção</li>
            <li><span>Formação</span>ADS · UniCesumar</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
