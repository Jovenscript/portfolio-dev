import { useState } from 'react'
import './styles.css'
import type { Project } from './data/site'
import { Backdrop } from './components/layout/Backdrop'
import { Navbar, ScrollProgress } from './components/layout/Navbar'
import { Footer, Lightbox } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { Marquee } from './components/ui/Marquee'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Stack } from './components/sections/Stack'
import { Contact } from './components/sections/Contact'

export default function App() {
  const [active, setActive] = useState<Project | null>(null)
  return (
    <>
      <a className="skip-link" href="#sobre">Pular para o conteúdo</a>
      <Backdrop />
      <div className="grain" aria-hidden />

      <ScrollProgress />
      <Navbar />

      <div className="page">
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects onOpen={setActive} />
          <Stack />
          <Contact />
        </main>
        <Footer />
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </>
  )
}
