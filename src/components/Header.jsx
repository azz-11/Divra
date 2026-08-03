import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'
import SearchOverlay from './SearchOverlay.jsx'

const NAV = [
  { label: 'الرئيسية', to: '/' },
  { label: 'من نحن', to: '/about' },
  { label: 'المنتجات', to: '/collection/mixers' },
  { label: 'تواصل معنا', to: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const solid = scrolled || pathname !== '/'

  return (
    <>
      <header
        className={`fixed inset-inline-0 top-0 z-50 transition-all duration-300 ${
          solid ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
        style={{ insetInline: 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          {/* الشعار + أيقونات التواصل بجانبه */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="ديفرا Divra" className="h-9 w-auto" />
            </Link>
            <span className="hidden h-6 w-px bg-line md:block" />
            <SocialIcons className="hidden md:flex" />
          </div>

          {/* التنقل — سطح المكتب */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-text-dim transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* زر البحث (بدل الاستشارة) */}
            <button
              onClick={() => setSearch(true)}
              aria-label="بحث"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/5 text-text transition-colors hover:border-brand-light hover:text-brand-light"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
            </button>

            {/* الهامبرغر — جوال */}
            <button
              aria-label="القائمة"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <span className={`absolute inset-inline-0 top-0 h-0.5 rounded bg-text transition-all ${open ? 'top-1.5 rotate-45' : ''}`} />
                <span className={`absolute inset-inline-0 top-1.5 h-0.5 rounded bg-text transition-all ${open ? 'opacity-0' : ''}`} />
                <span className={`absolute inset-inline-0 top-3 h-0.5 rounded bg-text transition-all ${open ? 'top-1.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="font-cairo text-2xl font-bold text-text">
              {item.label}
            </Link>
          ))}
          <SocialIcons className="mt-6" gap="gap-3" />
        </nav>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  )
}
