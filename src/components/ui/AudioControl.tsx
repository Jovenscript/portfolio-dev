import { useSound } from '../../lib/sound'
import { IconPause, IconPlay, IconVol, IconVolMute } from './icons'

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
