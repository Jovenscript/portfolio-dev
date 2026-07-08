# Portfólio — MHTDev (Marlon Tavares)

Portfólio pessoal em **React + Vite + TypeScript**, com **fundo em vídeo animado**,
interface em **Glassmorphism** (estilo iOS/macOS) e animações ligadas ao scroll (**Framer Motion**).

---

## ✅ 3 coisas para ajustar antes de publicar

Tudo em **`src/data/site.ts`**:

1. **Seu e-mail** — em `CONFIG.email` troque `seu@email.com`.
2. **URL do 5S Manutenção** — no projeto `5S Manutenção`, preencha `demo` se houver link público.
3. **URL do Wedding Planner** — preencha `demo` quando publicar.

> Vídeo de fundo: `public/assets/bg.mp4` (+ `bg-poster.webp`). Para trocar, substitua mantendo os nomes.
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
      Backdrop.tsx        → vídeo de fundo fixo + overlay + parallax
      Navbar / Footer / Lightbox / ScrollProgress
    hero/Hero.tsx         → hero + cartão de vidro (id-card)
    sections/             → About, Projects, Stack, Contact
    ui/                   → Reveal (scroll), Marquee, icons
```

## ⚡ Performance
- **Sem WebGL/Three.js** — o vídeo carrega o visual, bundle leve (~116 KB gzip de JS).
- **Vídeo só no desktop**; no mobile e em `prefers-reduced-motion` usa o poster estático.
- Parallax e animações só com **transform/opacity**. `backdrop-filter` (vidro) com autoprefix (browserslist).

## 💻 Rodar localmente (opcional)
```bash
npm install
npm run dev
npm run build
npm run preview
```
