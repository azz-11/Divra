import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Showcase from './components/Showcase.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import SideRail from './components/SideRail.jsx'
import useReducedMotion from './useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'manifesto', label: 'البيان' },
  { id: 'showcase', label: 'المجموعة' },
  { id: 'contact', label: 'تواصل' },
]

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="relative">
      <Cursor reduced={reduced} />
      <SideRail sections={SECTIONS} />
      <Header sections={SECTIONS} />
      <main>
        <Hero reduced={reduced} />
        <Manifesto reduced={reduced} />
        <Showcase reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
      <Footer sections={SECTIONS} />
    </div>
  )
}
