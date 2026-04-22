import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import './index.css'

const splashStart = Date.now()
const MIN_SPLASH_MS = 1800 // durée minimale d'affichage

function hideSplash() {
  const splash = document.getElementById('splash')
  if (!splash) return
  splash.style.opacity = '0'
  setTimeout(() => splash.remove(), 580)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>,
)

// Masque le splash après MIN_SPLASH_MS depuis le démarrage
const elapsed = Date.now() - splashStart
setTimeout(hideSplash, Math.max(0, MIN_SPLASH_MS - elapsed))
