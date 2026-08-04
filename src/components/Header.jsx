import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'
import SearchOverlay from './SearchOverlay.jsx'
import { useLang } from '../i18n.jsx'

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
  const { t, lang, toggle } = useLang()

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
              <img src={solid ? '/logo.png' : '/logo-light.png'} alt="ديفرا Divra" className="h-9 w-auto" />
            </Link>
          </div>

          {/* التنقل — سطح المكتب */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  solid ? 'text-text-dim hover:text-text' : 'text-white/85 hover:text-white'
                }`}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* زر تبديل اللغة */}
            <button
              onClick={toggle}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              className={`grid h-11 min-w-11 place-items-center rounded-full border px-3 text-sm font-bold transition-colors ${
                solid
                  ? 'border-line bg-white/60 text-text hover:border-brand hover:text-brand'
                  : 'border-white/40 bg-white/10 text-white hover:border-white'
              }`}
            >
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>

            {/* زر البحث (بدل الاستشارة) */}
            <button
              onClick={() => setSearch(true)}
              aria-label={t('بحث')}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                solid
                  ? 'border-line bg-white/60 text-text hover:border-brand hover:text-brand'
                  : 'border-white/40 bg-white/10 text-white hover:border-white'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
            </button>

            {/* الهامبرغر — جوال */}
            <button
              aria-label={t('القائمة')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
                open || solid ? 'border-line' : 'border-white/40'
              }`}
            >
              <span className="relative block h-4 w-6">
                {(() => {
                  const bar = open || solid ? 'bg-text' : 'bg-white'
                  return (
                    <>
                      <span className={`absolute inset-inline-0 top-0 h-0.5 rounded ${bar} transition-all ${open ? 'top-1.5 rotate-45' : ''}`} />
                      <span className={`absolute inset-inline-0 top-1.5 h-0.5 rounded ${bar} transition-all ${open ? 'opacity-0' : ''}`} />
                      <span className={`absolute inset-inline-0 top-3 h-0.5 rounded ${bar} transition-all ${open ? 'top-1.5 -rotate-45' : ''}`} />
                    </>
                  )
                })()}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#eaf3ff]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="font-cairo text-2xl font-bold text-text">
              {t(item.label)}
            </Link>
          ))}
          <SocialIcons className="mt-6" gap="gap-3" />
        </nav>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  )
}
