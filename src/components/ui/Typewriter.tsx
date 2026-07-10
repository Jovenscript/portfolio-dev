import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { useSound } from '../../lib/sound'

type Seg = { t: string; c?: string }
type Props = {
  text?: string
  segments?: Seg[]
  speed?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
  cursor?: boolean
  startDelay?: number
}

/** Digita o texto caractere a caractere quando entra na viewport (com som de tecla). */
export function Typewriter({ text, segments, speed = 24, as = 'span', className = '', cursor = true, startDelay = 0 }: Props) {
  const segs = segments ?? [{ t: text || '' }]
  const full = segs.map((s) => s.t).join('')
  const total = full.length
  const [n, setN] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  const reduce = usePrefersReducedMotion()
  const { playKey } = useSound()
  const Tag = as as any

  useEffect(() => {
    if (reduce) { setN(total); return }
    const el = ref.current
    if (!el) return
    let timer = 0
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let i = 0
        const tick = () => {
          i++; setN(i)
          const ch = full[i - 1]
          if (ch && ch !== ' ' && ch !== '\n') playKey()
          if (i < total) timer = window.setTimeout(tick, speed)
        }
        timer = window.setTimeout(tick, startDelay)
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let acc = 0
  const typed = segs.map((s, i) => {
    const start = acc; acc += s.t.length
    const shown = Math.max(0, Math.min(n - start, s.t.length))
    return <span key={i} className={s.c}>{s.t.slice(0, shown)}</span>
  })
  const done = n >= total

  return (
    <Tag ref={ref} className={`tw ${className}`} aria-label={full}>
      <span className="tw-size" aria-hidden>
        {segs.map((s, i) => <span key={i} className={s.c}>{s.t}</span>)}
      </span>
      <span className="tw-type" aria-hidden>
        {typed}
        {cursor && !reduce && <span className={`tw-cur${done ? ' done' : ''}`} />}
      </span>
    </Tag>
  )
}
