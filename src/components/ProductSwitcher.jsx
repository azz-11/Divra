import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PRODUCTS, collectionOf } from '../productsData.js'
import { useLang } from '../i18n.jsx'

// منتجات المبدّل + فيديو loop لكل منتج (التصنيف غير مرتبط بالفيديو — للتجربة)
const IDS = ['mixer-chrome', 'spray-gold', 'jacuzzi', 'bath', 'basin']
const VIDEOS = ['/video/switch-1', '/video/switch-2', '/video/switch-3']
const imgOf = (p) => p.images[p.finishes[0]]
const ITEMS = IDS.map((id, i) => ({
  ...PRODUCTS.find((p) => p.id === id),
  video: VIDEOS[i % VIDEOS.length],
})).filter((x) => x.id)

export default function ProductSwitcher({ reduced }) {
  const [active, setActive] = useState(0)
  const textRef = useRef(null)
  const videoRef = useRef(null)
  const { t, tr } = useLang()

  const cur = ITEMS[active]
  const eyebrow = tr(collectionOf(cur.collection).name)
  const spec = cur.specs[0]

  // ظهور النص عند تغيّر المنتج + محاولة تشغيل الفيديو
  useEffect(() => {
    if (videoRef.current) videoRef.current.play?.().catch(() => {})
    if (reduced) return
    const tl = gsap.timeline()
    tl.fromTo(textRef.current.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' })
    return () => tl.kill()
  }, [active, reduced])

  const select = (i) => {
    if (i === active) return
    if (reduced) return setActive(i)
    // النص القديم يخرج للأعلى ثم يتبدّل (تتكفّل useEffect بالدخول)
    gsap.to(textRef.current, {
      opacity: 0, y: -18, duration: 0.25, ease: 'power2.in',
      onComplete: () => { gsap.set(textRef.current, { opacity: 1, y: 0 }); setActive(i) },
    })
  }

  return (
    <section id="switcher" className="relative min-h-screen w-full overflow-hidden">
      {/* فيديو ملء الشاشة — loop لكل منتج (يُعاد تحميله عند التبديل) */}
      <video
        key={cur.id}
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-[#0a0a2e] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={`${cur.video}.webm`} type="video/webm" />
        <source src={`${cur.video}.mp4`} type="video/mp4" />
      </video>

      {/* طبقة تدرّج داكن للتباين */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(3,3,40,.55) 0%, rgba(3,3,40,.35) 45%, rgba(3,3,40,.85) 100%)' }}
      />

      {/* المحتوى فوق الفيديو */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28">
        <div ref={textRef} className="max-w-2xl">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-brand-light">
            {t('ديفرا')} · {eyebrow}
          </span>
          <h2 className="font-cairo text-4xl font-black leading-[1.05] text-white sm:text-6xl md:text-7xl">
            {tr(cur.title)}
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/85">{tr(cur.tagline)}</p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl2 border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
            <span className="text-xs text-white/70">{tr(spec[0])}</span>
            <span className="font-cairo text-lg font-black text-white">{tr(spec[1])}</span>
          </div>
        </div>

        {/* المسميات (أزرار التبديل) تحت الكتابات */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ITEMS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => select(i)}
              aria-label={tr(it.title)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur transition-all hover:-translate-y-0.5 ${
                i === active
                  ? 'border-brand-light bg-white/20 text-white shadow-[0_0_0_2px_rgba(149,195,255,.5)]'
                  : 'border-white/25 bg-white/10 text-white/80 hover:border-white/60 hover:text-white'
              }`}
            >
              <img src={imgOf(it)} alt="" className="h-7 w-7 flex-shrink-0 object-contain" loading="lazy" />
              {tr(it.title)}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
