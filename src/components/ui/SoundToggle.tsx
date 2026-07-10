import { useSound } from '../../lib/sound'

export function SoundToggle() {
  const { enabled, toggle } = useSound()
  return (
    <button
      className={`sound-toggle${enabled ? ' on' : ''}`}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Desligar som' : 'Ligar som e música'}
      title={enabled ? 'Desligar som' : 'Ligar som e música'}
    >
      {enabled ? (
        <span className="eq" aria-hidden><i /><i /><i /><i /></span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4V5Z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
      <span className="sound-label">{enabled ? 'Som ligado' : 'Ligar som'}</span>
    </button>
  )
}
