import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider as StylesThemeProvider } from '@mui/styles'
import theme from './theme.js'
import './index.css'
import './i18n/index.js'
import App from './App.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* injectFirst puts @mui/material's emotion styles at the top of <head>,
        so @mui/styles' makeStyles rules (inserted after) always win the
        cascade instead of losing to MUI's own component defaults (e.g.
        Typography's margin: 0) depending on injection order. */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* @mui/styles' makeStyles reads theme from its own legacy context,
            which @mui/material's ThemeProvider no longer populates in v5+. */}
        <StylesThemeProvider theme={theme}>
          <CssBaseline />
          <PhoneFrame>
            <App />
          </PhoneFrame>
        </StylesThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
