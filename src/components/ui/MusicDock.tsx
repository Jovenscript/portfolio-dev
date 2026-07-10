import { useState } from 'react'
import { useSound } from '../../lib/sound'
import { IconKeyboard, IconMusic } from './icons'

// Faixa escolhida — player oficial do Spotify (reprodução licenciada pela plataforma).
const TRACK_ID = '4t3NJNTxDwlne22NHtUkAK'
const EMBED = `https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`

export function MusicDock() {
  const [open, setOpen] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(max-width: 860px)').matches,
  )
  const { enabled, toggle } = useSound()

  if (!open) {
    return (
      <button className="music-fab" onClick={() => setOpen(true)} aria-label="Abrir player de música">
        <IconMusic />
      </button>
    )
  }

  return (
    <div className="music-dock">
      <div className="dock-head">
        <span className="dock-title"><IconMusic /> Trilha sonora</span>
        <span className="dock-tools">
          <button
            className={`dock-sfx${enabled ? ' on' : ''}`}
            onClick={toggle}
            aria-pressed={enabled}
            title={enabled ? 'Desligar som de teclado' : 'Ligar som de teclado'}
          >
            {enabled ? <span className="eq" aria-hidden><i /><i /><i /><i /></span> : <IconKeyboard />}
          </button>
          <button className="dock-min" onClick={() => setOpen(false)} aria-label="Minimizar player">–</button>
        </span>
      </div>
      <iframe
        className="dock-spotify"
        src={EMBED}
        title="Spotify player"
        width="100%"
        height="80"
        frameBorder="0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  )
}
