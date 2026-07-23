import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  cta: {
    marginTop: theme.spacing(2),
    width: '200px',
  },
}))

function RsvpCta({ onClick }) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Button className={classes.cta} variant="contained" color="primary" onClick={onClick}>
      {t('hero.rsvpCta')}
    </Button>
  )
}

export default RsvpCta
