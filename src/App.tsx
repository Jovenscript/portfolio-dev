import { useState } from 'react'
import './styles.css'
import type { Project } from './data/site'
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
      <div className="grain" aria-hidden />
      <div className="aurora" aria-hidden>
        <span className="blob blob-a" /><span className="blob blob-b" /><span className="blob blob-c" />
      </div>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects onOpen={setActive} />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Lightbox project={active} onClose={() => setActive(null)} />
    </>
  )
}
