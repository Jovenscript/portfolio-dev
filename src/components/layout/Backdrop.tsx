import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsMobile, usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Fundo animado fixo: vídeo da marca ocupando a tela toda, com overlay
 * escuro para leitura e parallax sutil no scroll. No mobile / reduced-motion
 * usa o poster estático (sem decodificar vídeo → bateria e performance).
 */
export function Backdrop() {
  const reduce = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const videoRef = useRef<HTMLVideoElement>(null)
  const playVideo = !reduce && !mobile

  const { scrollY } = useScroll()
  // parallax sutil: o fundo sobe bem devagar (sensação de profundidade)
  const y = useTransform(scrollY, [0, 1600], [0, -140])
  const scale = useTransform(scrollY, [0, 1600], [1.06, 1.14])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playVideo) v.play().catch(() => {})
    else v.pause()
  }, [playVideo])

  return (
    <div className="backdrop" aria-hidden>
      <motion.div className="backdrop-media" style={{ y, scale }}>
        {playVideo ? (
          <video
            ref={videoRef}
            className="backdrop-video"
            poster="assets/bg-poster.webp"
            src="assets/bg.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        ) : (
          <img className="backdrop-video" src="assets/bg-poster.webp" alt="" />
        )}
      </motion.div>
      {/* camadas de leitura + cor */}
      <div className="backdrop-tint" />
      <div className="backdrop-vignette" />
      <span className="blob blob-a" />
      <span className="blob blob-b" />
    </div>
  )
}
