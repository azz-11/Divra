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
import NotFoundPage from './pages/NotFoundPage.jsx'
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

  // مسارات الموقع — تُعرَّف مرة واحدة وتُكرَّر ببادئة /en لنسخة الإنجليزية،
  // بحيث تكون اللغة جزءاً من الرابط نفسه (قابل للمشاركة والفهرسة)
  const ROUTES = [
    { path: '/', element: <Home reduced={reduced} /> },
    { path: '/about', element: <AboutPage reduced={reduced} /> },
    { path: '/products', element: <ProductsIndex /> },
    { path: '/collection/:id', element: <CollectionPage reduced={reduced} /> },
    { path: '/product/:id', element: <ProductPage reduced={reduced} /> },
    { path: '/quote', element: <QuotePage /> },
  ]

  return (
    <BrowserRouter>
      <LanguageProvider>
      <QuoteProvider>
      <Header />
      <main>
        <Routes>
          {ROUTES.map((r) => (
            <Route key={`ar${r.path}`} path={r.path} element={r.element} />
          ))}
          {ROUTES.map((r) => (
            <Route key={`en${r.path}`} path={r.path === '/' ? '/en' : `/en${r.path}`} element={r.element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      </QuoteProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
