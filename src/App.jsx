import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import Hero from './components/Hero.jsx'
import WeddingCalendar from './components/WeddingCalendar.jsx'
import Venue from './components/Venue.jsx'
import OurStory from './components/OurStory.jsx'
import TheCouple from './components/TheCouple.jsx'
import SectionDivider from './components/decor/SectionDivider.jsx'
import Gallery from './components/Gallery.jsx'
import RSVPTeaser from './components/RSVPTeaser.jsx'
import RSVPModal from './components/RSVPModal.jsx'
import SprigPreviewPage from './components/decor/SprigPreviewPage.jsx'
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

// `q` controls the RSVP UI, read from either `/?q=1` or `/#?q=1`:
//   q=0 (or missing) → RSVP footer hidden
//   q=1              → RSVP footer shown
//   q=2              → RSVP footer shown and the RSVP modal opens straight away
function readRsvpMode(route) {
  const hashQuery = route.includes('?') ? route.slice(route.indexOf('?')) : ''
  const q =
    new URLSearchParams(hashQuery).get('q') ??
    new URLSearchParams(window.location.search).get('q')
  return q === '2' ? 2 : q === '1' ? 1 : 0
}

// Reserves space at the bottom equal to FloatingRsvpButton's height so the
// fixed footer bar never permanently covers the last section's content.
const useStyles = makeStyles(() => ({
  main: {
    paddingBottom: 80,
  },
  mainNoFooter: {
    paddingBottom: 0,
  },
}))

// Reorder these to change the page's content order. Always single-column —
// PhoneFrame (in main.jsx) is what adapts this between phone and desktop.
function App() {
  const classes = useStyles()
  const [route, setRoute] = useState(readRoute)
  // Only the initial URL opens the modal; later hash changes don't reopen it.
  const [rsvpOpen, setRsvpOpen] = useState(() => readRsvpMode(readRoute()) === 2)
  const openRsvp = () => setRsvpOpen(true)
  const showRsvpFooter = readRsvpMode(route) >= 1

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

  // Dev aid: lists every FloralSprig variant at /#/sprigs.
  if (route.startsWith('#/sprigs')) {
    return <SprigPreviewPage onBack={() => { window.location.hash = '' }} />
  }

  if (route.startsWith(STATUS_ROUTE_PREFIX)) {
    const prefillQuery = decodeURIComponent(
      route.slice(`${STATUS_ROUTE_PREFIX}/`.length).split('?')[0],
    )

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
    <Box
      component="main"
      className={showRsvpFooter ? classes.main : classes.mainNoFooter}
    >
      <Hero />
      <SectionDivider />
      <TheCouple />
      <SectionDivider wave={false} sprig="vine" />
      <OurStory />
      <SectionDivider wave={false} sprig="daisy" />
      <WeddingCalendar />
      <Venue />
      {/* <Gallery /> */}
      {/* <RSVPTeaser onOpen={openRsvp} /> */}
      <Footer />
      {showRsvpFooter && (
        <>
          <FloatingRsvpButton onClick={openRsvp} onCheckStatus={() => goToStatus()} />
          <RSVPModal
            open={rsvpOpen}
            onClose={() => setRsvpOpen(false)}
            onViewStatus={goToStatus}
          />
        </>
      )}
    </Box>
  )
}

export default App
