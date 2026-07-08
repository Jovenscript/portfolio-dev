import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../data/site'
import { Logo } from '../brand/Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo compact />
        <span>© {new Date().getFullYear()} Marlon Tavares · Projetado e desenvolvido por mim</span>
      </div>
    </footer>
  )
}

export function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (project) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="viewer" role="dialog" aria-label={project.title}
          onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
        >
          <button className="viewer-close" aria-label="Fechar (Esc)" onClick={onClose}>×</button>
          <motion.img
            src={project.image} alt={project.title} onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
          />
          <div className="viewer-meta"><strong>{project.title}</strong><span>{project.desc}</span></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
