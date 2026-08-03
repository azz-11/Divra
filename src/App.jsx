import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import useReducedMotion from './useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home reduced={reduced} />} />
          <Route path="/about" element={<AboutPage reduced={reduced} />} />
          <Route path="/collection/:id" element={<CollectionPage reduced={reduced} />} />
          <Route path="*" element={<Home reduced={reduced} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
