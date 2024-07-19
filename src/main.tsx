import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./global.scss"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
)
