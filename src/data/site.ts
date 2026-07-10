export const CONFIG = {
  name: 'Marlon Tavares',
  role: 'Desenvolvedor Full Stack',
  location: 'Jaraguá do Sul · SC',
  email: 'seu@email.com', // ← troque pelo seu e-mail real
  whatsapp: '5547999021947',
  github: 'https://github.com/Jovenscript',
  linkedin: 'https://www.linkedin.com/in/marlon-henrique-de-arruda-tavares-8b8340385',
}

export type Project = {
  title: string
  cat: 'cliente' | 'industrial' | 'mobile' | 'pessoal'
  catLabel: string
  live: boolean
  frame: 'browser' | 'phone'
  url?: string
  image: string
  desc: string
  feats: string[]
  tags: string[]
  demo?: string | null
  demoNote?: string
  repo?: string | null
  repoNote?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Brugnera Store', cat: 'cliente', catLabel: 'Cliente real', live: true,
    frame: 'browser', url: 'brugnerastore.com.br', image: 'assets/proj-brugnera.webp',
    desc: 'E-commerce completo, desenvolvido e mantido para cliente, em produção com domínio próprio e vendas reais.',
    feats: [
      'Cálculo de frete em tempo real (API Melhor Envio + OAuth)',
      'Estoque transacional vinculado ao status de pagamento',
      'PDV com etiquetas de código de barras',
      'Painel admin de pedidos e produtos',
    ],
    tags: ['JavaScript', 'Firebase', 'Cloud Functions', 'Melhor Envio API'],
    demo: 'https://brugnerastore.com.br', repo: null, repoNote: 'Código privado (cliente)',
  },
  {
    title: 'Copiloto Financeiro', cat: 'mobile', catLabel: 'PWA + APK', live: true,
    frame: 'phone', image: 'assets/proj-copiloto.webp',
    desc: 'App de finanças pessoais instalável — PWA na web e APK Android gerado por CI/CD.',
    feats: [
      'Projeção financeira de 24 meses e orçamentos por categoria',
      'Notificações push locais com som próprio',
      'Exportação de relatórios em PDF no app',
      'Build de APK automatizado (GitHub Actions + Capacitor)',
    ],
    tags: ['React', 'Vite', 'Tailwind', 'Firebase', 'Capacitor'],
    demo: 'https://copiloto-financeiro-eight.vercel.app',
    repo: 'https://github.com/Jovenscript/copiloto-financeiro',
  },
  {
    title: '5S Manutenção', cat: 'industrial', catLabel: 'Industrial', live: true,
    frame: 'phone', image: 'assets/proj-5s.webp',
    desc: 'Sistema de inventário industrial em uso diário — controle de peças, workspaces por área e notificações em tempo real entre dispositivos.',
    feats: [
      'Workspaces por área (Mecânica / Elétrica)',
      'Notificações em tempo real entre dispositivos',
      'Geração de etiquetas com código de barras',
      'Instalável como app Android (TWA)',
    ],
    tags: ['JavaScript', 'Firebase', 'Cloudinary', 'PWA'],
    demo: null, demoNote: 'Uso interno (fábrica)', // ← se houver URL pública, coloque aqui
    repo: null, repoNote: 'Uso interno',
  },
  {
    title: 'Wedding Planner', cat: 'pessoal', catLabel: 'Pessoal', live: true,
    frame: 'browser', url: 'wedding-planner', image: 'assets/proj-wedding.webp',
    desc: 'Planejador de casamento com gestão de convidados e orçamento — construído para o meu próprio casamento.',
    feats: [
      'Lista de convidados com confirmação e importação em massa',
      'Orçamento com status de pagamento por item',
      'Remoção automática de duplicatas',
      'Migração em andamento para React + Vite',
    ],
    tags: ['JavaScript', 'Firebase', 'Tailwind'],
    demo: null, demoNote: 'Link em breve', // ← coloque a URL quando publicar
    repo: 'https://github.com/Jovenscript/wedding-planner-react',
  },
]

const IC = 'assets/icons'
export const STACK = [
  { group: 'Frontend', items: [
    { n: 'JavaScript', i: `${IC}/javascript.svg`, lvl: 4, l: 'Avançado' },
    { n: 'React', i: `${IC}/react.svg`, lvl: 3, l: 'Em produção' },
    { n: 'HTML & CSS', i: `${IC}/html5.svg`, lvl: 4, l: 'Avançado' },
    { n: 'Tailwind', i: `${IC}/tailwindcss.svg`, lvl: 4, l: 'Avançado' },
    { n: 'TypeScript', i: `${IC}/typescript.svg`, lvl: 2, l: 'Em evolução' },
  ]},
  { group: 'Backend & Dados', items: [
    { n: 'Firebase', i: `${IC}/firebase.svg`, lvl: 4, l: 'Avançado' },
    { n: 'Cloud Functions', i: `${IC}/googlecloud.svg`, lvl: 3, l: 'Em produção' },
    { n: 'Firestore', i: `${IC}/firebase.svg`, lvl: 4, l: 'Avançado' },
    { n: 'Node.js', i: `${IC}/nodejs.svg`, lvl: 2, l: 'Em evolução' },
  ]},
  { group: 'Entrega & Ferramentas', items: [
    { n: 'Git & GitHub', i: `${IC}/git.svg`, lvl: 3, l: 'Em produção' },
    { n: 'GitHub Actions', i: `${IC}/githubactions.svg`, lvl: 3, l: 'Em produção' },
    { n: 'Vite', i: `${IC}/vitejs.svg`, lvl: 3, l: 'Em produção' },
    { n: 'Capacitor', i: `${IC}/capacitor.svg`, lvl: 3, l: 'Em produção' },
    { n: 'Figma', i: `${IC}/figma.svg`, lvl: 2, l: 'Em evolução' },
  ]},
]

export const STATS = [
  { end: 4, suffix: '', label: 'apps em produção' },
  { end: 100, suffix: '%', label: 'autodidata' },
  { end: 12, suffix: '+', label: 'tecnologias' },
]
