import { STACK } from '../../data/site'
import { Reveal } from '../ui/Reveal'

export function Stack() {
  return (
    <section id="stack" className="section">
      <Reveal as="header" className="section-head">
        <span className="tag">03 — Stack</span>
        <h2>Ferramentas de trabalho</h2>
        <p className="section-sub">Nível medido pelo uso em projetos reais — não por cursos concluídos.</p>
      </Reveal>

      <div className="stack">
        {STACK.map((g, gi) => (
          <Reveal className="stack-group" key={g.group} delay={gi * 0.08}>
            <h3>{g.group}</h3>
            {g.items.map((it) => (
              <div className="stack-item" key={it.n}>
                <img src={it.i} alt="" width={26} height={26} loading="lazy" />
                <span className="stack-name">{it.n}</span>
                <span className="stack-lvl">
                  <span className="meter" role="img" aria-label={`${it.n}: ${it.lvl} de 5`}>
                    {[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= it.lvl ? 'on' : ''} />)}
                  </span>
                  <span className="lvl-label">{it.l}</span>
                </span>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
