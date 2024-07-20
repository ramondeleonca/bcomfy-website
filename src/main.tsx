import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./global.scss"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Navbar from './components/Navbar.tsx'
import "@fontsource-variable/nunito-sans"
import "@fontsource-variable/montserrat"

gsap.registerPlugin(ScrollTrigger)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <App></App>
  </React.StrictMode>
)
