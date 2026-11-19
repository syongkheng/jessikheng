import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
    // backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  names: {
    marginBottom: theme.spacing(1),
  },
  credit: {
    color: theme.palette.text.secondary,
    opacity: 0.8,
    letterSpacing: '0.04em',
  },
  contact: {
    display: 'block',
    marginTop: theme.spacing(0.5),
  },
  contactLink: {
    color: 'inherit',
    textDecoration: 'underline',
  },
}))

const CONTACT_EMAIL = 'jessikheng@gmail.com'

function Footer() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="footer" className={classes.root}>
      {/* <Typography variant="body1">{t('footer.tagline')}</Typography> */}
      <Typography variant="caption" className={classes.credit}>
        {t('footer.credit')}
      </Typography>
      <Typography
        variant="caption"
        className={`${classes.credit} ${classes.contact}`}
      >
        {t('footer.contact')}{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className={classes.contactLink}>
          {CONTACT_EMAIL}
        </a>
      </Typography>
    </Box>
  )
}

export default Footer
