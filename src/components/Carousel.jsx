import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'react-i18next'
import { photos } from '../data/photos.js'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.text.primary,
  },
  slide: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    // 'contain' preserves each photo's native aspect ratio and fits it
    // within the panel instead of cropping — uploaded photos vary in
    // resolution/orientation, unlike the old fixed-size placeholders.
    objectFit: 'contain',
    opacity: 0,
    transition: 'opacity 1.2s ease',
  },
  slideActive: {
    opacity: 1,
  },
  dots: {
    position: 'absolute',
    bottom: theme.spacing(3),
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  // A wrapping Box (rather than styling IconButton directly) avoids fighting
  // IconButton's own `position: relative`, which @mui/material's emotion
  // styles can otherwise re-apply after these JSS rules.
  arrowWrapper: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  arrowLeft: {
    left: theme.spacing(2),
  },
  arrowRight: {
    right: theme.spacing(2),
  },
}))

function Carousel() {
  const { t } = useTranslation()
  const classes = useStyles()
  const [index, setIndex] = useState(0)

  // Restarting on every index change means a manual click also resets the
  // auto-advance timer, so it doesn't jump again right after.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [index])

  const showPrevious = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const showNext = () => {
    setIndex((prev) => (prev + 1) % photos.length)
  }

  return (
    <Box className={classes.root}>
      {photos.map((photo, i) => (
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className={`${classes.slide} ${i === index ? classes.slideActive : ''}`}
        />
      ))}
      <Box className={`${classes.arrowWrapper} ${classes.arrowLeft}`}>
        <IconButton onClick={showPrevious} aria-label={t('gallery.previousPhotoLabel')} color="inherit">
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Box className={`${classes.arrowWrapper} ${classes.arrowRight}`}>
        <IconButton onClick={showNext} aria-label={t('gallery.nextPhotoLabel')} color="inherit">
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box className={classes.dots}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            aria-label={t('gallery.showPhotoLabel', { number: i + 1 })}
            className={`${classes.dot} ${i === index ? classes.dotActive : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Carousel
