import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  names: {
    marginBottom: theme.spacing(1),
  },
}))

function Footer() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="footer" className={classes.root}>
      <Typography variant="h4" className={classes.names}>
        {t('hero.coupleNameOne')} &amp; <br></br>{t('hero.coupleNameTwo')}
      </Typography>
      <Typography variant="body1">{t('footer.tagline')}</Typography>
    </Box>
  )
}

export default Footer
