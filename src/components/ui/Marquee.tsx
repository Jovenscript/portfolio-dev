import { STACK } from '../../data/site'

export function Marquee() {
  const items = STACK.flatMap((g) => g.items)
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {loop.map((it, i) => (
          <span className="marquee-item" key={i}>
            <img src={it.i} alt="" />{it.n}
          </span>
        ))}
      </div>
    </div>
  )
}
