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
  components: {
    // Default focus color comes from palette.primary (the site's sage
    // green), which clashes with the red (#A52A2A) used for RSVP buttons/
    // stepper accents — force focused inputs to match that red instead.
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A52A2A',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#A52A2A',
          },
        },
      },
    },
    // Radio's checked dot (e.g. the RSVP form's Joyfully Accept / Regretfully
    // Decline choice) also defaults to palette.primary green — match it to
    // the same red as everything else in the RSVP flow.
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#A52A2A',
          },
        },
      },
    },
  },
})

export default theme
