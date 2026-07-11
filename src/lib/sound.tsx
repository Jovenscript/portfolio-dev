import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

// Coloque seu arquivo licenciado em: public/assets/track.mp3
const MUSIC_SRC = 'assets/track.mp3'

type SoundAPI = {
  playing: boolean
  muted: boolean
  togglePlay: () => void
  toggleMute: () => void
  playKey: () => void
}
const Ctx = createContext<SoundAPI>({
  playing: false, muted: false, togglePlay() {}, toggleMute() {}, playKey() {},
})
export const useSound = () => useContext(Ctx)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const playingRef = useRef(false)
  const mutedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const acRef = useRef<AudioContext | null>(null)
  const noiseRef = useRef<AudioBuffer | null>(null)
  const lastKey = useRef(0)

  const setPlay = (v: boolean) => { playingRef.current = v; setPlaying(v) }

  const ensureAC = () => {
    if (!acRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      const ac = new AC()
      acRef.current = ac
      const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.03), ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
      noiseRef.current = buf
    }
    if (acRef.current.state === 'suspended') acRef.current.resume()
    return acRef.current
  }

  // Autoplay ao entrar; se o navegador bloquear, inicia na 1ª interação.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
    const onPlay = () => setPlay(true)
    const onPause = () => setPlay(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    const evs = ['pointerdown', 'touchstart', 'keydown', 'click', 'wheel', 'scroll']
    const onFirst = () => { audio.play().catch(() => {}); disarm() }
    const arm = () => evs.forEach((e) => window.addEventListener(e, onFirst, { passive: true }))
    const disarm = () => evs.forEach((e) => window.removeEventListener(e, onFirst))

    audio.play().catch(() => arm()) // tenta autoplay; se falhar, arma a 1ª interação

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      disarm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    ensureAC()
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    ensureAC()
    const nv = !mutedRef.current
    mutedRef.current = nv
    a.muted = nv
    setMuted(nv)
    if (nv === false && a.paused) a.play().catch(() => {}) // desmutar também retoma
  }, [])

  const playKey = useCallback(() => {
    if (!playingRef.current || mutedRef.current) return
    const ac = acRef.current
    if (!ac) return
    const now = performance.now()
    if (now - lastKey.current < 45) return
    lastKey.current = now
    const t = ac.currentTime
    const o = ac.createOscillator(), g = ac.createGain()
    o.type = 'square'; o.frequency.value = 480 + Math.random() * 220
    g.gain.setValueAtTime(0.0008, t)
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.002)
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.05)
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.055)
    if (noiseRef.current) {
      const s = ac.createBufferSource(), ng = ac.createGain()
      s.buffer = noiseRef.current; ng.gain.value = 0.05
      s.connect(ng).connect(ac.destination); s.start(t)
    }
  }, [])

  return (
    <Ctx.Provider value={{ playing, muted, togglePlay, toggleMute, playKey }}>
      {children}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" autoPlay />
    </Ctx.Provider>
  )
}
