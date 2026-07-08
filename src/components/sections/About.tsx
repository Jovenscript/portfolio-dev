import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <section id="sobre" className="section">
      <Reveal as="header" className="section-head">
        <span className="tag">01 — Sobre</span>
        <h2>Da fábrica ao código, com a mesma disciplina</h2>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            Meu caminho até o desenvolvimento passou pelo <strong>chão de fábrica</strong>. Na manutenção
            industrial da WEG, diagnostico CLPs, painéis elétricos e sistemas de automação — um ambiente
            onde falha custa caro e improviso não se sustenta.
          </p>
          <p>
            Levei essa mentalidade para o software. Hoje mantenho um <strong>e-commerce de cliente real em
            produção</strong>, aplicativos instaláveis com CI/CD automatizado e um sistema de inventário
            usado diariamente pelo meu próprio setor. Não é portfólio de exemplo — é produto em operação,
            mantido depois de entregue.
          </p>
          <p>
            Curso <strong>Análise e Desenvolvimento de Sistemas</strong> na UniCesumar e evoluo o stack
            continuamente: do JavaScript puro dos primeiros projetos ao React, Vite e Firebase de agora.
          </p>
        </Reveal>

        <Reveal as="aside" className="about-card" delay={0.1}>
          <div className="about-photo">
            <img src="assets/perfil.webp" alt="Retrato de Marlon Tavares" width={760} height={1018} loading="lazy" />
          </div>
          <ul className="about-facts">
            <li><span>Base</span>Jaraguá do Sul · SC</li>
            <li><span>Atua</span>Full Stack · Front-end</li>
            <li><span>Origem</span>Manutenção industrial</li>
            <li><span>Formação</span>ADS · UniCesumar</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
