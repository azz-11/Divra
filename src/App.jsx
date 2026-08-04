import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Collection from './components/Collection.jsx'
import Products from './components/Products.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import useReducedMotion from './useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    // Recalculate triggers once assets (video/images/fonts) settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh)
    }
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="relative">
      <Cursor reduced={reduced} />
      <Header />
      <main>
        <Hero reduced={reduced} />
        <Marquee reduced={reduced} />
        <About reduced={reduced} />
        <Collection reduced={reduced} />
        <Products reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
      <Footer />
    </div>
  )
}
