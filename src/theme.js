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
    // The real cause of the step numbers (1/2/3/4 in the RSVP form's
    // progress stepper) looking off-center: Cormorant Garamond (the site's
    // global body font, inherited here) ships oldstyle numerals by
    // default — "1" and "2" sit flush on the baseline with no descender,
    // while "3" and "4" dip below it like a lowercase "y". `central`
    // baseline math centers using whole-font metrics, so a digit without a
    // descender sits visibly higher than one that has one. Forcing lining
    // (uniform, full-height) figures via the font's own 'lnum' OpenType
    // feature makes every digit sit identically, so centering is now
    // actually uniform across all four steps.
    MuiStepIcon: {
      styleOverrides: {
        text: {
          dominantBaseline: 'central',
          fontVariantNumeric: 'lining-nums',
        },
      },
    },
  },
})

export default theme
