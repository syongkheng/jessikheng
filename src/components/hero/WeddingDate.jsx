import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { WEDDING_DATE } from '../../data/weddingDate.js'

const useStyles = makeStyles((theme) => ({
  date: {
    marginTop: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
  },
}))

function WeddingDate() {
  const classes = useStyles()
  const { i18n } = useTranslation()

  const formattedDate = new Intl.DateTimeFormat(i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en-UK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(WEDDING_DATE)

  return (
    <Typography variant="body1" className={classes.date}>
      {formattedDate}
    </Typography>
  )
}

export default WeddingDate
