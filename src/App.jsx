import { useState } from 'react'
import { Box } from '@mui/material'
import Hero from './components/Hero.jsx'
import Venue from './components/Venue.jsx'
import OurStory from './components/OurStory.jsx'
import Gallery from './components/Gallery.jsx'
import RSVPTeaser from './components/RSVPTeaser.jsx'
import RSVPModal from './components/RSVPModal.jsx'
import Footer from './components/Footer.jsx'

// Reorder these to change the page's content order. Always single-column —
// PhoneFrame (in main.jsx) is what adapts this between phone and desktop.
function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const openRsvp = () => setRsvpOpen(true)

  return (
    <Box component="main">
      <Hero onOpenRsvp={openRsvp} />
      <Venue />
      <OurStory />
      <Gallery />
      <RSVPTeaser onOpen={openRsvp} />
      <Footer />
      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </Box>
  )
}

export default App
