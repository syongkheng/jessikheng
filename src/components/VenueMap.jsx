import { useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Leaflet's default marker icon references relative paths that bundlers
// don't resolve — point them at the bundled asset URLs instead.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// SAFRA Mount Faber Club, 2 Telok Blangah Way, #02-05, Singapore 098803
// (verified against OpenStreetMap Nominatim).
const VENUE_COORDS = [1.2774337, 103.8171324]
const VENUE_ADDRESS = 'SAFRA Mount Faber Club, 2 Telok Blangah Way, #02-05, Singapore 098803'
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'block',
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
  },
  map: {
    height: 180,
    width: '100%',
    // The map itself is non-interactive (see below) — this is just a
    // clickable static preview, so the cursor should read as a link.
    cursor: 'pointer',
  },
}))

// Static preview map that links out to Google Maps — panning/zooming are
// disabled so the whole tile area reads as a single tap target rather than
// something you'd try to interact with in place.
function VenueMap() {
  const { t } = useTranslation()
  const classes = useStyles()
  const containerRef = useRef(null)

  useEffect(() => {
    const map = L.map(containerRef.current, {
      center: VENUE_COORDS,
      zoom: 16,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)

    L.marker(VENUE_COORDS).addTo(map)

    return () => map.remove()
  }, [])

  return (
    <Box
      component="a"
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
      aria-label={t('venue.openInMapsLabel')}
    >
      <Box ref={containerRef} className={classes.map} />
    </Box>
  )
}

export default VenueMap
