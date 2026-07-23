import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8a9a5b',
      light: '#b5c48a',
      dark: '#5f6d3c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c9a15a',
      light: '#e0c489',
      dark: '#9c7a3e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fdf8f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#3d3733',
      secondary: '#7a7168',
    },
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Georgia", serif',
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontSize: '1.15rem',
    },
  },
  shape: {
    borderRadius: 4,
  },
})

export default theme
