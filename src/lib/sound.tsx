import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

// Som de teclado gerado por código (WebAudio). A música agora é o player
// oficial do Spotify (ver MusicDock), então não hospedamos áudio próprio.
type SoundAPI = { enabled: boolean; toggle: () => void; playKey: () => void }
const Ctx = createContext<SoundAPI>({ enabled: false, toggle() {}, playKey() {} })
export const useSound = () => useContext(Ctx)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const enabledRef = useRef(false)
  const acRef = useRef<AudioContext | null>(null)
  const noiseRef = useRef<AudioBuffer | null>(null)
  const lastKey = useRef(0)

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

  const toggle = useCallback(() => {
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    ensureAC()
  }, [])

  const playKey = useCallback(() => {
    if (!enabled) return
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
  }, [enabled])

  return <Ctx.Provider value={{ enabled, toggle, playKey }}>{children}</Ctx.Provider>
}
