import { useEffect } from 'react'
import StarCanvas from './components/StarCanvas'
import MagicDust from './components/MagicDust'
import FloatingSparkles from './components/FloatingSparkles'
import Hero from './components/Hero'
import Story from './components/Story'
import Events from './components/Events'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import useGuest from './components/useGuest'

export default function App() {
  const { guest, ready } = useGuest()

  useEffect(() => {
    if (!ready || !guest) return
    const el = document.getElementById('rsvp')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [ready, guest])

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
