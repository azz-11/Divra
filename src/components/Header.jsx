import { useEffect, useState } from 'react'

const NAV = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'من نحن', href: '#about' },
  { label: 'المنتجات', href: '#products' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // منع تمرير الخلفية عند فتح قائمة الجوال
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-inline-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ insetInline: 0 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* الشعار على اليمين (RTL) */}
        <a href="#hero" className="flex items-center gap-3" onClick={close}>
          <img src="/logo.png" alt="ديفرا Divra" className="h-9 w-auto" />
        </a>

        {/* التنقل — سطح المكتب */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-dim transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden text-sm sm:inline-flex">
            اطلب استشارة
          </a>

          {/* زر الهامبرغر — جوال */}
          <button
            aria-label="فتح القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute inset-inline-0 top-0 h-0.5 rounded bg-text transition-all ${
                  open ? 'top-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-inline-0 top-1.5 h-0.5 rounded bg-text transition-all ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute inset-inline-0 top-3 h-0.5 rounded bg-text transition-all ${
                  open ? 'top-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* قائمة الجوال كاملة الشاشة */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-cairo text-2xl font-bold text-text"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="btn btn-primary mt-4">
            اطلب استشارة
          </a>
        </nav>
      </div>
    </header>
  )
}
