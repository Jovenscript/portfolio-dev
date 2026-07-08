type Props = { compact?: boolean }

/** Marca MHTDev: símbolo (chip hexagonal + M) + wordmark. */
export function Logo({ compact = false }: Props) {
  return (
    <span className="logo" aria-label="MHTDev — Marlon Tavares">
      <LogoMark />
      {!compact && (
        <span className="logo-word">
          <b>MHT</b><span className="dev">Dev</span>
        </span>
      )}
    </span>
  )
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="mk" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FB2FF" />
          <stop offset="1" stopColor="#56E0D0" />
        </linearGradient>
        <linearGradient id="mkg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0E1626" />
          <stop offset="1" stopColor="#0A0E16" />
        </linearGradient>
      </defs>
      <path d="M24 4 41.3 14 41.3 34 24 44 6.7 34 6.7 14Z" fill="url(#mkg)"
        stroke="url(#mk)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 32.5 19 17.5 24 25.5 29 17.5 35 32.5" fill="none"
        stroke="#0A2436" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
      <path d="M13 31 19 16 24 24 29 16 35 31" fill="none"
        stroke="url(#mk)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="16" r="2.4" fill="#EAF6FF" />
      <circle cx="29" cy="16" r="2.4" fill="#EAF6FF" />
      <circle cx="24" cy="24" r="1.8" fill="#56E0D0" />
    </svg>
  )
}
