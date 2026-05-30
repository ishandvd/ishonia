import StarCanvas from './components/StarCanvas'
import MagicDust from './components/MagicDust'
import FloatingSparkles from './components/FloatingSparkles'
import Hero from './components/Hero'
import Story from './components/Story'
import Events from './components/Events'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Global ambient effects */}
      <StarCanvas />
      <MagicDust />
      <FloatingSparkles />

      {/* Page sections */}
      <Hero />
      <Story />
      <Events />
      <RSVP />
      <Footer />
    </>
  )
}
