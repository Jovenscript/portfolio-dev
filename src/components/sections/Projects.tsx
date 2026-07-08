import { useState } from 'react'
import { PROJECTS, type Project } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { IconExt, IconGit } from '../ui/icons'

const FILTERS: [string, string][] = [
  ['todos', 'Todos'], ['cliente', 'Cliente'], ['industrial', 'Industrial'],
  ['mobile', 'Mobile / PWA'], ['pessoal', 'Pessoal'],
]

function Frame({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const cat = <span className="frame-cat">{p.catLabel}</span>
  const live = p.live && <span className="frame-live"><span className="dot" />No ar</span>
  const img = <img src={p.image} alt={`Tela do projeto ${p.title}`} loading="lazy" />
  return (
    <button className="frame-btn" onClick={onOpen} aria-label={`Ampliar ${p.title}`}>
      {p.frame === 'phone' ? (
        <div className="frame frame-phone">{cat}{live}<div className="phone">{img}</div></div>
      ) : (
        <div className="frame frame-browser">
          <div className="browser-bar"><i /><i /><i /><span className="browser-url">{p.url}</span></div>
          <div className="browser-shot">{img}</div>{cat}{live}
        </div>
      )}
    </button>
  )
}

export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState('todos')
  const shown = PROJECTS.filter((p) => filter === 'todos' || p.cat === filter)

  return (
    <section id="projetos" className="section">
      <Reveal as="header" className="section-head">
        <span className="tag">02 — Projetos</span>
        <h2>Produtos reais, em produção</h2>
        <p className="section-sub">Do e-commerce com vendas ativas ao sistema que roda no chão de fábrica.</p>
      </Reveal>

      <Reveal className="filters">
        {FILTERS.map(([id, label]) => (
          <button key={id} className={`filter${filter === id ? ' active' : ''}`} onClick={() => setFilter(id)}>
            {label}
          </button>
        ))}
      </Reveal>

      <div className="projects">
        {shown.map((p, i) => (
          <Reveal as="article" className="project" key={p.title} delay={(i % 2) * 0.08}>
            <Frame p={p} onOpen={() => onOpen(p)} />
            <div className="project-body">
              <h3>{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-feats">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="project-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="project-links">
                {p.demo
                  ? <a href={p.demo} target="_blank" rel="noopener noreferrer"><IconExt /> Acessar projeto</a>
                  : <span className="disabled"><IconExt /> {p.demoNote || 'Em breve'}</span>}
                {p.repo
                  ? <a href={p.repo} target="_blank" rel="noopener noreferrer"><IconGit /> Repositório</a>
                  : <span className="disabled"><IconGit /> {p.repoNote || 'Privado'}</span>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
