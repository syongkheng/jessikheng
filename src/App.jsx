import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import Hero from './components/Hero.jsx'
import WeddingCalendar from './components/WeddingCalendar.jsx'
import Venue from './components/Venue.jsx'
import OurStory from './components/OurStory.jsx'
import TheCouple from './components/TheCouple.jsx'
import Gallery from './components/Gallery.jsx'
import RSVPTeaser from './components/RSVPTeaser.jsx'
import RSVPModal from './components/RSVPModal.jsx'
import Footer from './components/Footer.jsx'
import FloatingRsvpButton from './components/FloatingRsvpButton.jsx'

// Reserves space at the bottom equal to FloatingRsvpButton's height so the
// fixed footer bar never permanently covers the last section's content.
const useStyles = makeStyles(() => ({
  main: {
    paddingBottom: 80,
  },
}))

// Reorder these to change the page's content order. Always single-column —
// PhoneFrame (in main.jsx) is what adapts this between phone and desktop.
function App() {
  const classes = useStyles()
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const openRsvp = () => setRsvpOpen(true)

  return (
    <Box component="main" className={classes.main}>
      <Hero />
      <TheCouple />
      <OurStory />
      <WeddingCalendar />
      <Venue />
      {/* <Gallery /> */}
      {/* <RSVPTeaser onOpen={openRsvp} /> */}
      <Footer />
      <FloatingRsvpButton onClick={openRsvp} />
      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </Box>
  )
}

export default App
