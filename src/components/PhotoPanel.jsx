import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import Carousel from './Carousel.jsx'
import NavDrawer from './NavDrawer.jsx'
import CoupleNames from './hero/CoupleNames.jsx'

const useStyles = makeStyles((theme) => ({
  panel: {
    position: 'relative',
    height: 'min(58vh, 480px)',
    width: '100%',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    bottom: theme.spacing(5),
    left: theme.spacing(5),
    zIndex: 2,
  },
}))

// Reorder these to change what's layered on the photo panel.
function PhotoPanel() {
  const classes = useStyles()

  return (
    <Box className={classes.panel}>
      <Carousel />
      <NavDrawer />
      <Box className={classes.overlay}>
        <CoupleNames color="#fff" variant="h2" />
      </Box>
    </Box>
  )
}

export default PhotoPanel
