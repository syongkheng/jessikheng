import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FloralSprig from './decor/FloralSprig.jsx'
import LazyImage from './LazyImage.jsx'
import { galleryPhotos } from '../data/galleryPhotos.js'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  headingSprig: {
    width: 34,
    height: 34,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    color: theme.palette.primary.dark,
    opacity: 0.6,
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(0, 4),
    color: theme.palette.text.primary,
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
}))

// Continuous single-column feed — add more entries to galleryPhotos.js as
// real photos come in, they'll just extend this same scroll.
function Gallery() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box id="gallery" component="section" className={classes.root}>
      <FloralSprig variant="leaf" className={classes.headingSprig} />
      <Typography variant="h4" className={classes.heading}>
        {t('gallery.heading')}
      </Typography>
      <Box className={classes.feed}>
        {galleryPhotos.map((photo, index) => (
          <LazyImage
            key={photo.id}
            wrapperClassName={classes.image}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            placeholderVariant={index % 2 === 0 ? 'leaf' : 'bloom'}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Gallery
