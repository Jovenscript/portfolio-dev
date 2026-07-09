type Props = { compact?: boolean }

/** Marca MHTDev: símbolo < M > em circuito (animado) + wordmark. */
export function Logo({ compact = false }: Props) {
  return (
    <span className="logo" aria-label="MHTDev — Marlon Tavares">
      <LogoMark animate={!compact} />
      {!compact && (
        <span className="logo-word">
          <b>MHT</b><span className="dev">Dev</span>
        </span>
      )}
    </span>
  )
}

export function LogoMark({ size = 32, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <svg className={`logo-mark${animate ? ' anim' : ''}`} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="mk" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FB2FF" />
          <stop offset="1" stopColor="#56E0D0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mk)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* chevron esquerdo < */}
        <path className="trace" style={{ animationDelay: '0s' }} d="M15 14 7.5 24 15 34" />
        {/* chevron direito > */}
        <path className="trace" style={{ animationDelay: '.15s' }} d="M33 14 40.5 24 33 34" />
        {/* M em circuito */}
        <path className="trace" style={{ animationDelay: '.3s' }} id="mpath" d="M17.5 31 20.5 18 24 25 27.5 18 30.5 31" />
      </g>
      {/* nós */}
      <g className="nodes" fill="#EAF6FF">
        <circle cx="20.5" cy="18" r="1.9" />
        <circle cx="27.5" cy="18" r="1.9" />
        <circle cx="24" cy="25" r="1.5" fill="#56E0D0" />
        <circle cx="7.5" cy="24" r="1.6" fill="#7FB2FF" />
        <circle cx="40.5" cy="24" r="1.6" fill="#56E0D0" />
      </g>
    </svg>
  )
}
