import { useState } from 'react'
import { CONFIG } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { IconGit, IconIn, IconMail, IconWa } from '../ui/icons'

const socials = [
  { icon: <IconWa />, label: 'WhatsApp', href: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Olá Marlon! Vi seu portfólio e quero conversar.')}` },
  { icon: <IconGit />, label: 'GitHub', href: CONFIG.github },
  { icon: <IconIn />, label: 'LinkedIn', href: CONFIG.linkedin },
  { icon: <IconMail />, label: 'E-mail', href: `mailto:${CONFIG.email}` },
]

export function Contact() {
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const collect = (form: HTMLFormElement) => {
    const d = new FormData(form)
    return {
      nome: String(d.get('nome') || ''), email: String(d.get('email') || ''),
      assunto: String(d.get('assunto') || ''), mensagem: String(d.get('mensagem') || ''),
      hp: String(d.get('website') || ''),
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const d = collect(f)
    if (d.hp) return
    if (!f.reportValidity()) return setToast({ msg: 'Preencha os campos obrigatórios.', ok: false })
    const body = `Nova mensagem pelo portfólio\n\nNome: ${d.nome}\nE-mail: ${d.email}\nAssunto: ${d.assunto}\n\nMensagem:\n${d.mensagem}`
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('[Portfólio] ' + d.assunto)}&body=${encodeURIComponent(body)}`
    setToast({ msg: 'Abrindo seu cliente de e-mail…', ok: true })
  }

  const onWhats = (e: React.MouseEvent<HTMLButtonElement>) => {
    const f = e.currentTarget.closest('form') as HTMLFormElement
    if (!f.reportValidity()) return setToast({ msg: 'Preencha os campos obrigatórios.', ok: false })
    const d = collect(f)
    const txt = encodeURIComponent(`Olá Marlon!\n\nAssunto: ${d.assunto}\n${d.mensagem}\n\n— ${d.nome} (${d.email})`)
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${txt}`, '_blank', 'noopener')
  }

  return (
    <section id="contato" className="section">
      <Reveal as="header" className="section-head">
        <span className="tag">04 — Contato</span>
        <h2>Vamos construir algo</h2>
        <p className="section-sub">Projeto, freela ou oportunidade — respondo mais rápido pelo WhatsApp.</p>
      </Reveal>

      <div className="contact">
        <Reveal>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden />
            <div className="form-row">
              <label className="field"><span>Nome</span><input type="text" name="nome" placeholder="Seu nome" required /></label>
              <label className="field"><span>E-mail</span><input type="email" name="email" placeholder="voce@email.com" required /></label>
            </div>
            <label className="field"><span>Assunto</span><input type="text" name="assunto" placeholder="Sobre o que quer falar?" required /></label>
            <label className="field"><span>Mensagem</span><textarea name="mensagem" rows={5} placeholder="Conte a ideia, o problema ou a oportunidade..." required /></label>
            <div className="form-actions">
              <button type="submit" className="btn primary">Enviar por e-mail</button>
              <button type="button" className="btn ghost" onClick={onWhats}>Enviar pelo WhatsApp</button>
            </div>
            {toast && <p className={`form-toast ${toast.ok ? 'ok' : 'err'}`} role="status">{toast.msg}</p>}
          </form>
        </Reveal>

        <Reveal as="aside" className="contact-side" delay={0.1}>
          <p className="contact-side-label">Ou me encontre em</p>
          <div className="socials">
            {socials.map((s) => (
              <a className="social" key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.icon}<span>{s.label}</span>
              </a>
            ))}
          </div>
          <div className="contact-note"><span className="dot" />Aberto a novos projetos e oportunidades</div>
        </Reveal>
      </div>
    </section>
  )
}
