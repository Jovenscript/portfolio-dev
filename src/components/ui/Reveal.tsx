import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'article' | 'li' | 'header' | 'aside'
}

/** Entrada suave (opacity + translate + leve profundidade) ao entrar na viewport. */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: Props) {
  const reduce = usePrefersReducedMotion()
  const M = motion[as]
  if (reduce) {
    const Tag = as as any
    return <Tag className={className}>{children}</Tag>
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </M>
  )
}
