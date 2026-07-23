import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  names: {
    color: theme.palette.text.primary,
  },
  ampersand: {
    color: theme.palette.secondary.dark,
    fontStyle: 'italic',
    margin: theme.spacing(0, 2),
  },
}))

function CoupleNames({ variant = 'h1', className }) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Typography variant={variant} className={`${classes.names} ${className || ''}`}>
      {t('hero.coupleNameOne')} <br></br>
      <span className={classes.ampersand}>&amp;</span> <br></br>
      {t('hero.coupleNameTwo')}
    </Typography>
  )
}

export default CoupleNames
