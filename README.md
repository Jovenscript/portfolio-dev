# Portfólio — MHTDev (Marlon Tavares)

Portfólio pessoal em **React + Vite + TypeScript**, com **fundo animado em canvas (circuito reativo ao scroll)**,
interface em **Glassmorphism** (estilo iOS/macOS) e animações ligadas ao scroll (**Framer Motion**).

---

## ✅ 3 coisas para ajustar antes de publicar

Tudo em **`src/data/site.ts`**:

1. **Seu e-mail** — em `CONFIG.email` troque `seu@email.com`.
2. **URL do 5S Manutenção** — no projeto `5S Manutenção`, preencha `demo` se houver link público.
3. **URL do Wedding Planner** — preencha `demo` quando publicar.

> Fundo animado: gerado por código em `components/layout/Backdrop.tsx` (nada de vídeo).
> Fotos dos projetos: `public/assets/*.webp`.

---

## 🚀 Deploy automático (GitHub Actions)

Já configurado em `.github/workflows/deploy.yml` (dispara em qualquer push).
No repositório: **Settings → Pages → Source = GitHub Actions**. Pronto — todo push builda e publica.
O `base` do Vite é `'./'` → funciona em `usuario.github.io/repo` e em domínio próprio.

---

## 🧩 Arquitetura

```
src/
  data/site.ts          → CONFIG, PROJECTS, STACK, STATS  (edite aqui)
  index.css             → tokens (cores + GLASS) + fundo/base
  styles.css            → estilos dos componentes (glass)
  lib/hooks.ts          → mediaQuery, reduced-motion, mobile
  components/
    brand/Logo.tsx       → marca MHTDev (símbolo + wordmark)
    layout/
      Backdrop.tsx        → fundo animado (canvas circuito) reativo ao scroll
      Navbar / Footer / Lightbox / ScrollProgress
    hero/Hero.tsx         → hero + cartão de vidro (id-card)
    sections/             → About, Projects, Stack, Contact
    ui/                   → Reveal (scroll), Marquee, icons
```

## ⚡ Performance
- **Sem WebGL/Three.js e sem vídeo** — fundo em canvas 2D vetorial, bundle leve (~117 KB gzip de JS).
- Roda em **mobile e desktop** (menos nós no mobile). Em `prefers-reduced-motion` renderiza um quadro estático.
- Parallax e animações só com **transform/opacity**. `backdrop-filter` (vidro) com autoprefix (browserslist).

## 💻 Rodar localmente (opcional)
```bash
npm install
npm run dev
npm run build
npm run preview
```
