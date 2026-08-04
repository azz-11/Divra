import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Header({ sections }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)

  const NAV = [...sections, { id: 'contact', label: 'تواصل معنا' }].filter(
    (v, i, a) => a.findIndex((x) => x.id === v.id) === i,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.from(barRef.current, { y: -70, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 })
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      ref={barRef}
      className={`fixed inset-inline-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
      style={{ insetInline: 0 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#hero" className="flex items-center gap-3" onClick={close} aria-label="ديفرا">
          <span className="font-display text-2xl font-bold tracking-[0.28em] text-text">
            DIVRA
          </span>
          <span className="hidden h-4 w-px bg-line-strong sm:block" />
          <span className="hidden font-cairo text-sm text-sky sm:block">ديفرا</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative text-sm font-medium text-text-dim transition-colors hover:text-text"
            >
              {item.label}
              <span className="absolute -bottom-1.5 inset-inline-0 h-px origin-right scale-x-0 bg-sky transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden text-sm sm:inline-flex">
            اطلب استشارة
          </a>
          <button
            aria-label="فتح القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute inset-inline-0 top-0 h-0.5 rounded bg-text transition-all ${open ? 'top-1.5 rotate-45' : ''}`} />
              <span className={`absolute inset-inline-0 top-1.5 h-0.5 rounded bg-text transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute inset-inline-0 top-3 h-0.5 rounded bg-text transition-all ${open ? 'top-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/97 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={close}
              className="font-cairo text-3xl font-bold text-text transition-colors hover:text-sky"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="btn btn-primary mt-5">
            اطلب استشارة
          </a>
        </nav>
        <p className="pb-10 text-center font-display text-sm tracking-[0.3em] text-text-dimmer">
          DIVRA · ديفرا
        </p>
      </div>
    </header>
  )
}
