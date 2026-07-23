import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.18)',
  },
  caption: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
  },
}))

// Desktop-only — lets someone viewing the framed mockup scan through to the
// real page on their own phone. Fixed to the viewport, not the mockup.
function ShareQrCode() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      <QRCodeSVG value={window.location.href} size={112} />
      <Typography className={classes.caption}>{t('common.scanToView')}</Typography>
    </Box>
  )
}

export default ShareQrCode
