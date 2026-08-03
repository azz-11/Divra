import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpLeft } from 'lucide-react'
import { PRODUCTS, collectionOf } from '../productsData.js'
import { useLang } from '../i18n.jsx'

// منتجات مختارة للمبدّل التفاعلي (نستخدم صور public/products الموجودة)
const IDS = ['mixer-chrome', 'shattaf', 'spray-gold', 'jacuzzi', 'toilet']
const imgOf = (p) => p.images[p.finishes[0]]
const ITEMS = IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

export default function ProductSwitcher({ reduced }) {
  const [active, setActive] = useState(0)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const { t, tr } = useLang()

  const cur = ITEMS[active]
  const eyebrow = tr(collectionOf(cur.collection).name)
  const spec = cur.specs[0] // مواصفة رئيسية واحدة

  // حركة الدخول عند تغيّر المنتج الحالي (مرتبطة بالـ state)
  useEffect(() => {
    if (reduced) return
    const tl = gsap.timeline()
    tl.fromTo(imgRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' })
    tl.fromTo(textRef.current.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' }, 0.05)
    return () => tl.kill()
  }, [active, reduced])

  // اختيار منتج: تلاشٍ وتصغير ثم تبديل الحالة ثم ظهور (تتكفّل useEffect بالظهور)
  const select = (i) => {
    if (i === active) return
    if (reduced) return setActive(i)
    gsap.to(imgRef.current, {
      opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in',
      onComplete: () => setActive(i),
    })
    gsap.to(textRef.current, { opacity: 0, y: -18, duration: 0.25, ease: 'power2.in',
      onComplete: () => gsap.set(textRef.current, { opacity: 1, y: 0 }) })
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-28" id="switcher">
      {/* خلفية متدرّجة بنفسجي/كحلي فاتحة */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 15%, #eaf1ff 0%, #cddffb 55%, #b9d2fb 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-inline-0 top-1/3 mx-auto h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full blur-3xl"
        style={{ insetInline: 0, background: 'radial-gradient(circle, rgba(85,97,229,.28), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_1.15fr]">
        {/* العمود النصي الثابت */}
        <div ref={textRef} className="order-2 lg:order-1">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-brand-strong">
            {t('ديفرا')} · {eyebrow}
          </span>
          <h2 className="font-cairo text-4xl font-black leading-[1.05] text-text sm:text-5xl md:text-6xl">
            {tr(cur.title)}
          </h2>
          <p className="mt-5 max-w-md text-lg text-text-dim">{tr(cur.tagline)}</p>
          {/* مواصفة رئيسية كبطاقة صغيرة */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-xl2 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
            <span className="text-xs text-text-dimmer">{tr(spec[0])}</span>
            <span className="font-cairo text-lg font-black text-brand-strong">{tr(spec[1])}</span>
          </div>
        </div>

        {/* الصورة المركزية + البطاقات العائمة */}
        <div className="relative order-1 flex min-h-[46vh] items-center justify-center lg:order-2 lg:min-h-[62vh]">
          <img
            ref={imgRef}
            src={imgOf(cur)}
            alt={tr(cur.title)}
            className="max-h-[42vh] w-auto max-w-full object-contain drop-shadow-2xl lg:max-h-[58vh]"
          />

          {/* بطاقات التبديل العائمة */}
          <div className="absolute bottom-0 inset-inline-0 mx-auto flex flex-wrap justify-center gap-3 px-2" style={{ insetInline: 0 }}>
            {ITEMS.map((it, i) => (
              <button
                key={it.id}
                onClick={() => select(i)}
                aria-label={tr(it.title)}
                className={`group relative flex w-32 items-center gap-2 rounded-2xl border bg-white/75 p-2 pe-8 text-start backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg sm:w-40 ${
                  i === active ? 'border-brand shadow-[0_0_0_2px_rgba(79,143,240,.35)]' : 'border-white/70 hover:border-brand-light'
                }`}
              >
                <img src={imgOf(it)} alt="" className="h-10 w-10 flex-shrink-0 object-contain sm:h-12 sm:w-12" loading="lazy" />
                <span className="line-clamp-2 text-[11px] font-bold leading-tight text-text sm:text-xs">
                  {tr(it.title)}
                </span>
                <span className="absolute inset-inline-end-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-brand/15 text-brand-strong transition-colors group-hover:bg-brand group-hover:text-white" style={{ insetInlineEnd: '0.375rem' }}>
                  <ArrowUpLeft size={14} strokeWidth={2.5} className="rtl:rotate-0 ltr:-scale-x-100" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
