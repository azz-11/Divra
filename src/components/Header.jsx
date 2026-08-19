import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'
import SearchOverlay from './SearchOverlay.jsx'
import { useLang } from '../i18n.jsx'

const NAV = [
  { label: 'الرئيسية', to: '/' },
  { label: 'من نحن', to: '/about' },
  { label: 'المنتجات', to: '/products' },
  { label: 'اطلب عرض سعر', to: '/quote' },
  { label: 'تواصل معنا', to: '/#contact' },
]

const HIDE_THRESHOLD = 80

function prefersReduced() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Header() {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const { pathname } = useLocation()
  const { t, lang, toggle, lp } = useLang()

  const lastY = useRef(0)
  const ticking = useRef(false)

  // إظهار/إخفاء الهيدر حسب اتجاه السكرول (throttle عبر rAF)
  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      setAtTop(y < 60)
      if (y <= HIDE_THRESHOLD) {
        setHidden(false)
      } else if (y > lastY.current + 4) {
        setHidden(true) // نزول → إخفاء
      } else if (y < lastY.current - 4) {
        setHidden(false) // صعود → إظهار
      }
      lastY.current = y
      ticking.current = false
    }
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  // شفاف فوق الهيرو في الأعلى فقط؛ وإلا داكن صلب
  const transparent = atTop && (pathname === '/' || pathname === '/en')
  const noAnim = prefersReduced()

  return (
    <>
      <header
        className={`fixed start-0 end-0 top-0 z-50 ${noAnim ? '' : 'transition-transform duration-300'} ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          insetInline: 0,
          backgroundColor: transparent ? 'transparent' : 'var(--ink, #030328)',
          borderBottom: transparent ? '1px solid transparent' : '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          {/* الشعار */}
          <Link to={lp('/')} className="flex items-center">
            <img src="/logo-light.png" alt="ديفرا Divra" className="h-6 w-auto sm:h-[30px]" />
          </Link>

          {/* التنقل — سطح المكتب */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={lp(item.to)}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {t(item.label)}
              </Link>
            ))}
            {/* مبدّل اللغة كعنصر نصي ضمن القائمة */}
            <button
              onClick={toggle}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              className="text-sm font-bold text-white/70 transition-colors hover:text-white"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </nav>

          {/* الأيقونات — بلا دوائر */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => setSearch(true)}
              aria-label={t('بحث')}
              className="text-white/85 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
            </button>

            {/* القائمة — جوال */}
            <button
              aria-label={t('القائمة')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-white/85 transition-colors hover:text-white lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <span className={`absolute start-0 end-0 top-0 h-0.5 rounded bg-current transition-all ${open ? 'top-1.5 rotate-45' : ''}`} />
                <span className={`absolute start-0 end-0 top-1.5 h-0.5 rounded bg-current transition-all ${open ? 'opacity-0' : ''}`} />
                <span className={`absolute start-0 end-0 top-3 h-0.5 rounded bg-current transition-all ${open ? 'top-1.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <div
        className={`fixed inset-0 z-40 flex flex-col ${noAnim ? '' : 'transition-opacity duration-300'} lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ backgroundColor: 'var(--ink, #030328)' }}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV.map((item) => (
            <Link key={item.to} to={lp(item.to)} className="font-cairo text-2xl font-bold text-white">
              {t(item.label)}
            </Link>
          ))}
          {/* مبدّل اللغة أسفل القائمة */}
          <button
            onClick={toggle}
            className="mt-2 border-t border-white/10 pt-6 text-lg font-bold text-white/70 transition-colors hover:text-white"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <SocialIcons className="mt-4" gap="gap-3" />
        </nav>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  )
}
