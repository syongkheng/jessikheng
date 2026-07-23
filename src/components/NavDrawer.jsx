import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: 2,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  drawerList: {
    width: 240,
  },
}))

// Reorder these to change the drawer nav link order.
const links = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'RSVP', href: '#rsvp' },
]

function NavDrawer() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        className={classes.menuButton}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List className={classes.drawerList}>
          {links.map((link) => (
            <ListItemButton
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default NavDrawer
