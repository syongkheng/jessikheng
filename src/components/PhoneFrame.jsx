import { makeStyles } from '@mui/styles'
import { Box, useMediaQuery } from '@mui/material'
import ShareQrCode from './ShareQrCode.jsx'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'relative',
    height: '100dvh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  // Separate layer so opacity fades only the image, not the phone device /
  // QR code sitting on top of the backdrop.
  backdropImage: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/background/backdrop-left-v2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
    backgroundRepeat: 'no-repeat',
    opacity: 0.15,
  },
  // 19.5:9 matches recent iPhone Pro Max models' screen proportions.
  device: {
    position: 'relative',
    height: 'min(880px, 92dvh)',
    aspectRatio: '9 / 19.5',
    borderRadius: 25,
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    // A no-op transform makes this the containing block for `position:
    // fixed` descendants (e.g. FloatingRsvpButton), so on the desktop
    // mockup they stay pinned to this device frame instead of escaping to
    // the real browser viewport — matching how they'd pin to the actual
    // screen on a real phone.
    transform: 'translateZ(0)',
  },
  notch: {
    position: 'absolute',
    top: 14,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 90,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.15,
    zIndex: 3,
  },
  screen: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari/Edge
    },
  },
}))

// Wraps the site in a phone-shaped frame on desktop/tablet viewports; on
// actual phones it renders the content edge-to-edge with no frame, so both
// device types end up looking like the same mobile-style page.
function PhoneFrame({ children }) {
  const classes = useStyles()
  const isPhone = useMediaQuery('(max-width:800px)')

  if (isPhone) {
    return children
  }

  return (
    <Box className={classes.backdrop}>
      <Box className={classes.backdropImage} />
      <Box className={classes.device}>
        <Box className={classes.notch} />
        <Box className={classes.screen}>{children}</Box>
      </Box>
      <ShareQrCode />
    </Box>
  )
}

export default PhoneFrame
