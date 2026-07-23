import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  venue: {
    marginTop: (props) => (props.dense ? 0 : theme.spacing(10)),
    marginBottom: (props) => (props.dense ? 0 : theme.spacing(2)),
    color: theme.palette.text.secondary,
    textAlign: 'left',
  },
}))

function VenueInfo({ dense }) {
  const classes = useStyles({ dense })

  return (
    <Typography variant="body1" className={classes.venue}>
      2 Telok Blangah Wy, <br></br>
      #02-05, <br></br>
      SAFRA Mount Faber Club,<br></br>
      Singapore 098803
    </Typography>
  )
}

export default VenueInfo
