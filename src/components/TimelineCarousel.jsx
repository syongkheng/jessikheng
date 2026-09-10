import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'react-i18next'
import { timelineMoments } from '../data/timelineMoments.js'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  // Lets the arrows sit absolutely positioned (and vertically centered)
  // against the viewport below — margin lives here rather than on the
  // viewport itself so centering isn't thrown off by trailing whitespace.
  timelineRow: {
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  // Sit right at the viewport's masked/faded edge (see timelineViewport's
  // WebkitMaskImage below) so each arrow reads over already-fading content
  // rather than cutting across a crisp dot or label — kept low-opacity and
  // background-free so they stay a quiet hint rather than a competing UI
  // element.
  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    width: 22,
    height: 22,
    padding: 0,
    color: theme.palette.secondary.dark,
    opacity: 0.45,
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.85,
      backgroundColor: 'transparent',
    },
    '&.Mui-disabled': {
      opacity: 0.12,
    },
  },
  navArrowLeft: {
    left: 0,
  },
  navArrowRight: {
    right: 0,
  },
  navArrowIcon: {
    fontSize: 18,
  },
  // The visible window scrolls horizontally; `timelineTrack` is sized wider
  // than it (via inline style, so only `visibleCount` items show at once,
  // however many years there are) — the rest sit off to the side and scroll
  // into view instead of cramming everything on screen at once.
  timelineViewport: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    padding: theme.spacing(0, 1),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // Fades the row's edges so a partly-visible year reads as "scroll for
    // more" rather than looking clipped.
    WebkitMaskImage:
      'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)',
    maskImage:
      'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)',
  },
  // Positioned relative so `timelineLine` spans exactly this track's full
  // (wider-than-viewport) width and scrolls together with the year buttons
  // — it needs to live here, not in the viewport, or it'd only ever be as
  // long as one screenful and vanish once scrolled past.
  timelineTrack: {
    position: 'relative',
    display: 'flex',
    scrollSnapType: 'x proximity',
  },
  timelineLine: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.palette.secondary.light,
  },
  yearButton: {
    position: 'relative',
    zIndex: 1,
    flexShrink: 0,
    scrollSnapAlign: 'start',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  dot: {
    width: 8,
    height: 8,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    border: `1.5px solid ${theme.palette.secondary.light}`,
    transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
  },
  dotActive: {
    width: 10,
    height: 10,
    backgroundColor: theme.palette.secondary.dark,
    borderColor: theme.palette.secondary.dark,
  },
  yearLabel: {
    fontSize: '0.7rem',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    transition: 'color 0.3s ease',
  },
  yearLabelActive: {
    color: theme.palette.secondary.dark,
    fontWeight: 600,
  },
  stage: {
    position: 'relative',
    width: '100%',
    height: 320,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 2,
  },
  // The padded, backgroundColor'd frame around each photo (the "mat").
  // Rounding just this frame only rounds its own outer edge — the photo
  // itself, inset within the padding, would still show square corners — so
  // the actual image gets its own border-radius on `slideImage` below.
  slideFrame: {
    position: 'absolute',
    inset: 0,
    boxSizing: 'border-box',
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.background.paper,
    opacity: 0,
    transition: 'opacity 0.8s ease',
  },
  slideFrameActive: {
    opacity: 1,
  },
  slideImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius * 1.5,
  },
  caption: {
    marginTop: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
}))

// The timeline row IS the carousel's navigation — clicking a year (or
// swiping the stage, or the prev/next arrows) all just move `index`, and
// the stage below follows it to that moment's photo.
const SWIPE_THRESHOLD = 40

// Element-width breakpoints (not viewport media queries) — on desktop this
// renders inside PhoneFrame's fixed phone-sized mockup, which stays much
// narrower than the browser window, so only the container's own measured
// width gives an accurate read on how many years actually fit.
function getVisibleCount(width) {
  if (!width || width >= 260) return 4
  if (width >= 200) return 3
  return 2
}

function TimelineCarousel() {
  const classes = useStyles()
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const touchStartX = useRef(null)
  const buttonRefs = useRef([])
  const viewportRef = useRef(null)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const visibleCount = Math.min(getVisibleCount(containerWidth), timelineMoments.length)
  const trackWidthPercent = Math.max(timelineMoments.length / visibleCount, 1) * 100
  const itemWidthPercent = 100 / timelineMoments.length

  const goTo = (i) => {
    setIndex(Math.max(0, Math.min(timelineMoments.length - 1, i)))
  }

  // Keeps the active year in view when the index changes from a stage swipe
  // (rather than a direct click on a year that's already visible).
  useEffect(() => {
    buttonRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [index])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (deltaX > SWIPE_THRESHOLD) {
      goTo(index - 1)
    } else if (deltaX < -SWIPE_THRESHOLD) {
      goTo(index + 1)
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.timelineRow}>
        <IconButton
          type="button"
          className={`${classes.navArrow} ${classes.navArrowLeft}`}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={t('story.previousYear')}
        >
          <ChevronLeftIcon className={classes.navArrowIcon} />
        </IconButton>

        <Box className={classes.timelineViewport} ref={viewportRef}>
          <Box
            className={classes.timelineTrack}
            style={{ width: `${trackWidthPercent}%` }}
          >
            <Box className={classes.timelineLine} />
            {timelineMoments.map((moment, i) => (
              <button
                key={moment.year}
                type="button"
                ref={(el) => (buttonRefs.current[i] = el)}
                className={classes.yearButton}
                style={{ flexBasis: `${itemWidthPercent}%` }}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              >
                <Box
                  className={`${classes.dot} ${i === index ? classes.dotActive : ''}`}
                />
                <Typography
                  component="span"
                  className={`${classes.yearLabel} ${i === index ? classes.yearLabelActive : ''}`}
                >
                  {moment.year}
                </Typography>
              </button>
            ))}
          </Box>
        </Box>

        <IconButton
          type="button"
          className={`${classes.navArrow} ${classes.navArrowRight}`}
          onClick={() => goTo(index + 1)}
          disabled={index === timelineMoments.length - 1}
          aria-label={t('story.nextYear')}
        >
          <ChevronRightIcon className={classes.navArrowIcon} />
        </IconButton>
      </Box>

      <Box
        className={classes.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {timelineMoments.map((moment, i) => (
          <Box
            key={moment.year}
            className={`${classes.slideFrame} ${i === index ? classes.slideFrameActive : ''}`}
          >
            <img
              src={moment.photo.src}
              alt={moment.photo.alt}
              className={classes.slideImage}
            />
          </Box>
        ))}
      </Box>

      <Typography className={classes.caption}>
        {timelineMoments[index].caption}
      </Typography>
    </Box>
  )
}

export default TimelineCarousel
