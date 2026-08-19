import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProductsIndex from './pages/ProductsIndex.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import QuotePage from './pages/QuotePage.jsx'
import useReducedMotion from './useReducedMotion.js'
import { LanguageProvider } from './i18n.jsx'
import { QuoteProvider } from './quote.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <LanguageProvider>
      <QuoteProvider>
      <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home reduced={reduced} />} />
          <Route path="/about" element={<AboutPage reduced={reduced} />} />
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/collection/:id" element={<CollectionPage reduced={reduced} />} />
          <Route path="/product/:id" element={<ProductPage reduced={reduced} />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="*" element={<Home reduced={reduced} />} />
        </Routes>
      </main>
      <Footer />
      </BrowserRouter>
      </QuoteProvider>
    </LanguageProvider>
  )
}
