import { useEffect, useRef, useState } from 'react'
import StarCanvas from './components/StarCanvas'
import MagicDust from './components/MagicDust'
import FloatingSparkles from './components/FloatingSparkles'
import Hero from './components/Hero'
import Story from './components/Story'
import Events from './components/Events'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import EnvelopeIntro from './components/EnvelopeIntro'
import useGuest from './components/useGuest'
import music from './assets/music.mp3'

export default function App() {
  const { guest, ready } = useGuest()
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const name = guest?.full_name?.split(/[,&]/)[0].trim() ?? 'friend'
    const msg = () => console.log(`🌸 get out of the console tab, pls dont hack this site ${name} 🌸`)
    msg()
    const id = setInterval(msg, 10000)
    return () => clearInterval(id)
  }, [guest])


  function handleEnter() {
    setEntered(true)
    const audio = audioRef.current
    audio.loop = true
    audio.volume = 0.5
    audio.play()
  }

  function toggleMute() {
    const audio = audioRef.current
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  if (!ready) return <StarCanvas />

  if (!guest) {
    return (
      <>
        <StarCanvas />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--gold)' }}>
            Ishan &amp; Sonia
          </p>
          <div style={{ width: 48, height: 1, background: 'var(--gold)', opacity: 0.5 }} />
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 420, lineHeight: 1.8 }}>
            Oops — looks like you didn't use the right link.<br />
            Please check your invitation for your personal link.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <audio ref={audioRef} src={music} preload="auto" />

      {/* Envelope sits at the very root — nothing can paint over it */}
      {!entered && <EnvelopeIntro onOpen={handleEnter} />}

      {entered && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'fixed', bottom: '1.5rem', right: '1.5rem',
            zIndex: 50,
            background: 'rgba(253,250,246,0.85)',
            border: '1px solid rgba(184,134,42,0.35)',
            color: 'var(--gold)',
            width: '2.5rem', height: '2.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1rem',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          {muted ? '🔇' : '🎵'}
        </button>
      )}

      <StarCanvas />
      <MagicDust />
      <FloatingSparkles />
      <Hero guestName={guest.full_name} />
      <Story />
      <Events />
      <RSVP />
      <Footer />
    </>
  )
}
