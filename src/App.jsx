import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReducedMotion from './useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    // إعادة حساب المشغّلات بعد تحميل الأصول (صور/خطوط)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero reduced={reduced} />
        <About reduced={reduced} />
        <Products reduced={reduced} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
