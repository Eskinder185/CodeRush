import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'
import { applySettings, getSettings } from './lib/settings'

// Apply the saved theme before the first paint to avoid a flash of the wrong theme.
applySettings(getSettings())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
