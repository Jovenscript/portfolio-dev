import { useSound } from '../../lib/sound'

/* Ícones embutidos aqui de propósito: o AudioControl fica independente
   do icons.tsx e nunca mais quebra o build por export faltando. */
const IconPlay = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
  </svg>
)
const IconPause = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)
const IconVol = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
)
const IconVolMute = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
    <line x1="16" y1="9" x2="22" y2="15" />
    <line x1="22" y1="9" x2="16" y2="15" />
  </svg>
)

/** Microcontrole de áudio: só Play/Pause e Mutar. Minúsculo e discreto. */
export function AudioControl() {
  const { playing, muted, togglePlay, toggleMute } = useSound()
  return (
    <div className="audio-mini" role="group" aria-label="Controle de áudio">
      <button
        className={`am-btn${playing ? ' active' : ''}`}
        onClick={togglePlay}
        aria-label={playing ? 'Pausar música' : 'Tocar música'}
        title={playing ? 'Pausar' : 'Tocar'}
      >
        {playing ? <IconPause /> : <IconPlay />}
      </button>
      <button
        className="am-btn"
        onClick={toggleMute}
        aria-pressed={muted}
        aria-label={muted ? 'Ativar som' : 'Mutar'}
        title={muted ? 'Ativar som' : 'Mutar'}
      >
        {muted ? <IconVolMute /> : <IconVol />}
      </button>
    </div>
  )
}
