import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FloralSprig from './decor/FloralSprig.jsx'
import LazyImage from './LazyImage.jsx'
import { WEDDING_DATE } from '../data/weddingDate.js'
import { photos } from '../data/photos.js'

const useStyles = makeStyles((theme) => ({
  // Same image/chip grid-stack pattern as Hero/Venue.
  imageWrap: {
    position: 'relative',
    display: 'grid',
    width: '100%',
    height: 'min(640px, 78vh)',
    overflow: 'hidden',
  },
  image: {
    gridArea: '1 / 1',
  },
  imageCrop: {
    objectFit: 'cover',
  },
  // Positioned like LazyImage's own `fill` class so it doesn't participate
  // in the grid-stack auto-sizing that the chips below rely on.
  scrim: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.32) 42%, rgba(0, 0, 0, 0) 68%)',
  },
  panel: {
    position: 'relative',
    gridArea: '1 / 1',
    alignSelf: 'start',
    justifySelf: 'center',
    minWidth: 0,
    marginTop: theme.spacing(4),
    width: '88%',
    padding: theme.spacing(2.5, 2.5, 2),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
  },
  panelSprig: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 34,
    height: 34,
    color: theme.palette.secondary.dark,
    opacity: 0.6,
    transform: 'rotate(20deg)',
  },
  // Sits behind panelContent (which is position: relative, so it paints
  // above this even though both are laid out via normal flow within panel).
  panelYear: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    fontFamily: '"Playfair Display", "Georgia", serif',
    fontWeight: 700,
    fontSize: '3.5rem',
    letterSpacing: '0.05em',
    color: theme.palette.text.primary,
    opacity: 0.12,
  },
  panelContent: {
    position: 'relative',
  },
  bigDate: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'left',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  bigDateNumber: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: 1,
    color: theme.palette.text.primary,
  },
  bigDateSlash: {
    fontSize: '1.5rem',
    color: theme.palette.text.secondary,
  },
  weekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: theme.spacing(1),
  },
  weekday: {
    textAlign: 'center',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    color: theme.palette.text.secondary,
  },
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    rowGap: theme.spacing(0.75),
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  dayNumber: {
    fontSize: '0.95rem',
    color: theme.palette.text.primary,
  },
  weddingDay: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
  },
  weddingHeart: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    color: '#E37383',
    animation: '$beat 5.0s ease-in-out infinite',
    scale: 1.3,
  },
  weddingDayNumber: {
    position: 'relative',
  },
  '@keyframes beat': {
    '0%, 100%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.18)' },
    '40%': { transform: 'scale(0.95)' },
    '60%': { transform: 'scale(1.12)' },
  },
  caption: {
    position: 'relative',
    gridArea: '1 / 1',
    alignSelf: 'end',
    justifySelf: 'center',
    minWidth: 0,
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    color: '#fff',
  },
  countdownTiles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: theme.spacing(1.5),
  },
  countdownTile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    padding: theme.spacing(1.5, 1),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    backdropFilter: 'blur(2px)',
  },
  countdownValue: {
    color: '#fff',
    fontWeight: 600,
    lineHeight: 1,
    fontSize: '1.5rem',
  },
  countdownLabel: {
    marginTop: theme.spacing(0.5),
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
  },
  married: {
    color: '#fff',
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
    seconds: Math.floor((diff / 1000) % 60),
  }
}

// Mon(0)..Sun(6) week grid for the given month, with leading blanks so the
// 1st lands in its correct weekday column.
function buildMonthGrid(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1)
  const leadingBlanks = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = Array.from({ length: leadingBlanks }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }
  return cells
}

function WeddingCalendar() {
  const classes = useStyles()
  const { t } = useTranslation()
  const photo = photos[1] ?? photos[0]
  const [remaining, setRemaining] = useState(getTimeRemaining)

  useEffect(() => {
    // Seconds are shown and need to visibly tick, so this runs every 1s.
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const year = WEDDING_DATE.getFullYear()
  const monthIndex = WEDDING_DATE.getMonth()
  const weddingDay = WEDDING_DATE.getDate()
  const cells = buildMonthGrid(year, monthIndex)
  const weekdayLabels = t('calendar.weekdays', { returnObjects: true })

  const countdownUnits = remaining
    ? [
        { label: t('countdown.days'), value: remaining.days },
        { label: t('countdown.hours'), value: remaining.hours },
        { label: t('countdown.minutes'), value: remaining.minutes },
        { label: t('countdown.seconds'), value: remaining.seconds },
      ]
    : []

  if (!photo) return null

  return (
    <Box id="calendar" component="section">
      <Box className={classes.imageWrap}>
        <LazyImage
          src={photo.src}
          alt={photo.alt}
          wrapperClassName={classes.image}
          className={classes.imageCrop}
          fill
        />
        <Box className={classes.scrim} />

        <Box className={classes.panel}>
          <FloralSprig variant="leaf" className={classes.panelSprig} />

          <Typography component="span" className={classes.panelYear}>
            {year}
          </Typography>

          <Box className={classes.panelContent}>
            <Box className={classes.bigDate}>
              <Typography component="span" className={classes.bigDateNumber}>
                {String(weddingDay).padStart(2, '0')}
              </Typography>
              <Typography component="span" className={classes.bigDateSlash}>
                /
              </Typography>
              <Typography component="span" className={classes.bigDateNumber}>
                {String(monthIndex + 1).padStart(2, '0')}
              </Typography>
            </Box>

            <Box className={classes.weekdays}>
              {weekdayLabels.map((label, index) => (
                <Typography key={`${label}-${index}`} component="span" className={classes.weekday}>
                  {label}
                </Typography>
              ))}
            </Box>

            <Box className={classes.days}>
              {cells.map((day, index) => (
                <Box key={index} className={classes.day}>
                  {day &&
                    (day === weddingDay ? (
                      <Box component="span" className={classes.weddingDay}>
                        <svg
                          viewBox="0 0 24 24"
                          className={classes.weddingHeart}
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 21s-7.5-4.8-10.2-9.1C.2 9.1 1 5.3 4.4 4 6.6 3.1 9 3.9 12 6.8 15 3.9 17.4 3.1 19.6 4c3.4 1.3 4.2 5.1 2.6 7.9C19.5 16.2 12 21 12 21z" />
                        </svg>
                        <Typography
                          component="span"
                          className={`${classes.dayNumber} ${classes.weddingDayNumber}`}
                        >
                          {day}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography component="span" className={classes.dayNumber}>
                        {day}
                      </Typography>
                    ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className={classes.caption}>
          {remaining ? (
            <Box className={classes.countdownTiles}>
              {countdownUnits.map((unit) => (
                <Box key={unit.label} className={classes.countdownTile}>
                  <Typography variant="h4" className={classes.countdownValue}>
                    {String(unit.value).padStart(2, '0')}
                  </Typography>
                  <Typography variant="body2" className={classes.countdownLabel}>
                    {unit.label}
                  </Typography>
                </Box>
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

export default WeddingCalendar
