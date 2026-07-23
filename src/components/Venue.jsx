import { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import VenueInfo from './hero/VenueInfo.jsx'
import FloralSprig from './decor/FloralSprig.jsx'
import LazyImage from './LazyImage.jsx'
import { WEDDING_DATE } from '../data/weddingDate.js'
import { photos } from '../data/photos.js'

const useStyles = makeStyles((theme) => ({
  // Grid stacks image/topChip/bottomChip in the same cell, same full-bleed
  // pattern as Hero.
  imageWrap: {
    display: 'grid',
    width: '100%',
  },
  image: {
    gridArea: '1 / 1',
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  topChip: {
    position: 'relative',
    top: theme.spacing(1),
    gridArea: '1 / 1',
    alignSelf: 'start',
    justifySelf: 'center',
    // Grid items default to a content-based min-width, which can force the
    // whole grid (and page) wider than the viewport regardless of maxWidth.
    minWidth: 0,
    height: 'fit-content',
    marginTop: theme.spacing(3),
    width: '90%',
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: '#ffffff80',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
  },
  topChipSprig: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 34,
    height: 34,
    color: theme.palette.secondary.dark,
    opacity: 0.6,
    transform: 'rotate(20deg)',
  },
  heading: {
    display: 'block',
    color: theme.palette.secondary.dark,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1),
  },
  bottomChip: {
    position: 'relative',
    gridArea: '1 / 1',
    alignSelf: 'end',
    justifySelf: 'center',
    marginBottom: theme.spacing(3),
    // See topChip's comment — same grid min-width fix, needed here since
    // this chip contains the nowrap tiles row.
    minWidth: 0,
    maxWidth: '92%',
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: '#ffffff80',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
  },
  bottomChipSprig: {
    position: 'absolute',
    bottom: -12,
    left: -12,
    width: 34,
    height: 34,
    color: theme.palette.primary.dark,
    opacity: 0.6,
    transform: 'rotate(-15deg)',
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  tile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 0,
    padding: theme.spacing(0, 2),
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.25,
    flexShrink: 0,
  },
  value: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    lineHeight: 1,
    fontSize: '2rem',
  },
  label: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
  },
  married: {
    color: theme.palette.primary.dark,
  },
}))

function getTimeRemaining() {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) {
    return null
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  }
}

function Venue() {
  const classes = useStyles()
  const { t } = useTranslation()
  const venuePhoto = photos[1] ?? photos[0]
  const [remaining, setRemaining] = useState(getTimeRemaining)

  useEffect(() => {
    // Minutes is now the finest unit shown, so a 30s tick is plenty.
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!venuePhoto) return null

  const units = remaining
    ? [
        { label: t('countdown.days'), value: remaining.days },
        { label: t('countdown.hours'), value: remaining.hours },
        { label: t('countdown.minutes'), value: remaining.minutes },
      ]
    : []

  return (
    <Box id="venue" component="section">
      <Box className={classes.imageWrap}>
        <LazyImage
          src={venuePhoto.src}
          alt={venuePhoto.alt}
          wrapperClassName={classes.image}
          placeholderHeight={420}
          placeholderVariant="leaf"
        />

        <Box className={classes.topChip}>
          <FloralSprig variant="leaf" className={classes.topChipSprig} />
          <Typography variant="overline" className={classes.heading}>
            {t('venue.heading')}
          </Typography>
          <VenueInfo dense />
        </Box>

        <Box className={classes.bottomChip}>
          <FloralSprig variant="bloom" className={classes.bottomChipSprig} />
          {remaining ? (
            <Box className={classes.tiles}>
              {units.map((unit, index) => (
                <Fragment key={unit.label}>
                  {index > 0 && <Box className={classes.divider} />}
                  <Box className={classes.tile}>
                    <Typography variant="h4" className={classes.value}>
                      {String(unit.value).padStart(2, '0')}
                    </Typography>
                    <Typography variant="body2" className={classes.label}>
                      {unit.label}
                    </Typography>
                  </Box>
                </Fragment>
              ))}
            </Box>
          ) : (
            <Typography variant="h3" className={classes.married}>
              {t('countdown.married')}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Venue
