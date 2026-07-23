import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar, Button } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  navLink: {
    color: theme.palette.text.primary,
  },
}))

// Reorder these to change the nav link order.
const links = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
]

function NavBar() {
  const classes = useStyles()

  return (
    <AppBar position="sticky" elevation={0} className={classes.nav}>
      <Toolbar className={classes.toolbar}>
        {links.map((link) => (
          <Button key={link.href} className={classes.navLink} href={link.href}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
