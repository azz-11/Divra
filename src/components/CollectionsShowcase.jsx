import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { COLLECTIONS } from '../productsData.js'

const EASE = 'cubic-bezier(0.33,1,0.68,1)' // انتقال ناعم (ease-out ناعم)
const DUR = 1000
const N = COLLECTIONS.length

export default function CollectionsShowcase({ reduced }) {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640,
  )
  const animating = useRef(false)
  const drag = useRef({ x: 0, active: false })

  // تحديث حالة الجوال
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // تحميل الصور مسبقاً
  useEffect(() => {
    COLLECTIONS.forEach((c) => {
      const img = new Image()
      img.src = c.image
    })
  }, [])

  const navigate = (dir) => {
    if (animating.current) return
    animating.current = true
    setActive((prev) => (dir === 'next' ? (prev + 1) % N : (prev + N - 1) % N))
    setTimeout(() => (animating.current = false), DUR)
  }

  // التمرير باللمس/السحب يمين ويسار
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, active: true }
  }
  const onPointerUp = (e) => {
    if (!drag.current.active) return
    drag.current.active = false
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const dx = end - drag.current.x
    if (Math.abs(dx) > 45) {
      // في RTL: السحب لليمين ⇒ السابق، لليسار ⇒ التالي
      navigate(dx > 0 ? 'prev' : 'next')
    }
  }

  const active_c = COLLECTIONS[active]

  // نمط كل عنصر حسب دوره
  const styleFor = (i) => {
    const r = (i - active + N) % N // 0 مركز، 1 يمين، N-1 يسار، 2 خلف، غير ذلك مخفي
    const base = {
      position: 'absolute',
      aspectRatio: '1 / 1',
      transition: `transform ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}, left ${DUR}ms ${EASE}, bottom ${DUR}ms ${EASE}`,
      willChange: 'transform, filter, opacity',
    }
    if (r === 0)
      return { ...base, left: '50%', bottom: isMobile ? '22%' : '15%', height: isMobile ? '42%' : '56%',
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.15})`, filter: 'none', opacity: 1, zIndex: 20 }
    if (r === 1)
      return { ...base, left: isMobile ? '82%' : '72%', bottom: isMobile ? '30%' : '16%', height: isMobile ? '18%' : '30%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10 }
    if (r === N - 1)
      return { ...base, left: isMobile ? '18%' : '28%', bottom: isMobile ? '30%' : '16%', height: isMobile ? '18%' : '30%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10 }
    if (r === 2)
      return { ...base, left: '50%', bottom: isMobile ? '30%' : '16%', height: isMobile ? '14%' : '24%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.9, zIndex: 5 }
    // مخفي
    return { ...base, left: '50%', bottom: '16%', height: isMobile ? '12%' : '20%',
      transform: 'translateX(-50%) scale(0.6)', filter: 'blur(6px)', opacity: 0, zIndex: 1 }
  }

  return (
    <section
      id="collections"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: active_c.bg, transition: `background-color ${DUR}ms ${EASE}`, fontFamily: 'Tajawal, sans-serif' }}
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* توهج لوني يتبدّل مع القسم */}
        <div
          className="pointer-events-none absolute inset-inline-0 top-1/2 mx-auto h-[85vmin] w-[85vmin] -translate-y-1/2 rounded-full blur-3xl"
          style={{ insetInline: 0, backgroundColor: `${active_c.accent}33`, transition: `background-color ${DUR}ms ${EASE}`, zIndex: 1 }}
        />

        {/* حبيبات (grain) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50, opacity: 0.12, backgroundSize: '200px 200px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        {/* اسم القسم كنص شبح عملاق */}
        <div className="absolute inset-inline-0 flex select-none items-center justify-center" style={{ insetInline: 0, top: '16%', zIndex: 2, pointerEvents: 'none' }}>
          <span
            style={{
              fontFamily: 'Aktiv Grotesk Arabic, Readex Pro, sans-serif', fontSize: 'clamp(72px, 22vw, 300px)', fontWeight: 900,
              color: '#0f2a4d', opacity: 0.06, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
              transition: `opacity ${DUR}ms ${EASE}`,
            }}
          >
            {active_c.short}
          </span>
        </div>

        {/* شارة العلامة */}
        <div className="absolute top-24 start-4 sm:start-8" style={{ insetInlineStart: undefined, zIndex: 60 }}>
          <span className="text-xs font-semibold uppercase text-[#0f2a4d]/70" style={{ letterSpacing: '0.18em' }}>
            DIVRA · أقسامنا
          </span>
        </div>

        {/* الكاروسيل */}
        <div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ zIndex: 3, touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {COLLECTIONS.map((c, i) => {
            const isCenter = i === active
            return (
              <div key={c.id} style={styleFor(i)}>
                <div className={reduced ? '' : isCenter ? 'floaty h-full w-full' : 'floaty-slow h-full w-full'}>
                  <img
                    src={c.image}
                    alt={c.name}
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* النص السفلي + أزرار التنقّل + زر كل المنتجات */}
        <div className="absolute bottom-6 start-4 sm:bottom-16 sm:start-16" style={{ zIndex: 60, maxWidth: 460 }}>
          <p className="mb-2 text-base font-bold uppercase text-[#0f2a4d] sm:mb-3 sm:text-[22px]" style={{ fontFamily: 'Aktiv Grotesk Arabic, Readex Pro, sans-serif', transition: `opacity ${DUR}ms ${EASE}` }}>
            {active_c.name}
          </p>
          {/* المميزات */}
          <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
            {active_c.features.map((f) => (
              <span key={f} className="rounded-full border border-[#0f2a4d]/20 bg-white/50 px-3 py-1 text-xs text-[#0f2a4d] backdrop-blur">
                {f}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => navigate('prev')} aria-label="السابق"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#0f2a4d]/60 text-[#0f2a4d] transition-all hover:scale-105 hover:bg-[#0f2a4d]/8 sm:h-16 sm:w-16">
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
            <button onClick={() => navigate('next')} aria-label="التالي"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#0f2a4d]/60 text-[#0f2a4d] transition-all hover:scale-105 hover:bg-[#0f2a4d]/8 sm:h-16 sm:w-16">
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            {/* زر مشاهدة جميع منتجات القسم */}
            <Link to={`/collection/${active_c.id}`}
              className="ms-1 inline-flex items-center gap-2 rounded-full bg-[#2f6fd6] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
              style={{ fontFamily: 'Aktiv Grotesk Arabic, Readex Pro, sans-serif' }}>
              كل المنتجات
              <ArrowLeft size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* مؤشّر رقم القسم أسفل اليسار */}
        <div className="absolute bottom-8 end-4 hidden sm:bottom-20 sm:end-10 sm:block" style={{ zIndex: 60 }}>
          <span
            className="flex items-baseline gap-1 text-[#0f2a4d]/90"
            style={{ fontFamily: 'Aktiv Grotesk Arabic, Readex Pro, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            <span style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 700 }}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="text-[#0f2a4d]/45" style={{ fontSize: 'clamp(14px, 2vw, 24px)' }}>
              / {String(N).padStart(2, '0')}
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
