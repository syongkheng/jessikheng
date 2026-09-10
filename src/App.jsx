import { useEffect, useState } from 'react'
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
import RsvpStatusPage from './components/RsvpStatusPage.jsx'
import Footer from './components/Footer.jsx'
import FloatingRsvpButton from './components/FloatingRsvpButton.jsx'

// Hash-based so a direct link/refresh to the status page never depends on
// server-side rewrite rules — the browser never sends the fragment to the
// server, so any static host serves plain `/` and this reads the rest.
const STATUS_ROUTE_PREFIX = '#/status'

function readRoute() {
  return window.location.hash || ''
}

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
  const [route, setRoute] = useState(readRoute)
  const openRsvp = () => setRsvpOpen(true)

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Reservation ID is optional — omitted, the status page just opens on its
  // blank search form instead of pre-filling and auto-searching.
  const goToStatus = (rsvpId) => {
    setRsvpOpen(false)
    window.location.hash = rsvpId ? `/status/${rsvpId}` : '/status'
  }

  if (route.startsWith(STATUS_ROUTE_PREFIX)) {
    const prefillQuery = decodeURIComponent(route.slice(`${STATUS_ROUTE_PREFIX}/`.length))

    return (
      <Box component="main" className={classes.main}>
        <RsvpStatusPage
          prefillQuery={prefillQuery}
          onBack={() => {
            window.location.hash = ''
          }}
        />
      </Box>
    )
  }

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
      <RSVPModal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        onViewStatus={goToStatus}
      />
    </Box>
  )
}

export default App
