import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../i18n.jsx'

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const { t } = useLang()

  // فيديو لوب يعاد تلقائياً (حركة لايف ستايل)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    if (reduced) return // احترام تقليل الحركة: يبقى على الـ poster
    const play = () => v.play().catch(() => {})
    if (v.readyState >= 2) play()
    else v.addEventListener('canplay', play, { once: true })
  }, [reduced])

  // ظهور أوّلي ناعم للنص
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen">
      <div className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* فيديو الهيرو — لوب بحركة لايف ستايل */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          poster="/products/poster.webp"
          {...(reduced ? {} : { autoPlay: true })}
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* تدرّج خفيف جداً أسفل الشاشة فقط لوضوح النص — دون تعتيم الفيديو */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,3,40,.45) 100%)' }}
        />

        {/* المحتوى */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,.45)' }}
        >
          <span className="mb-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
            {t('أدوات صحية فاخرة')}
          </span>
          <h1
            className="font-cairo font-bold leading-tight text-white"
            style={{ fontSize: 'clamp(1.65rem, 7vw, 3rem)', textWrap: 'balance' }}
          >
            {t('لحظاتك... تستحق أن تُعاش بجمال')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            {t('تفاصيل تنسجم مع إيقاع حياتك.')}
          </p>
          <div className="mx-auto mt-9 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <a href="#switcher" className="btn btn-primary w-full sm:w-auto">
              {t('استكشف المجموعة')}
            </a>
            <a
              href="/about"
              className="btn w-full border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
            >
              {t('تعرّف على ديفرا')}
            </a>
          </div>
        </div>

        {/* مؤشّر السكرول */}
        <a
          href="#switcher"
          className="absolute start-0 end-0 bottom-8 z-10 mx-auto flex w-full flex-col items-center gap-2 text-white/70"
          style={{ insetInline: 0 }}
          aria-label="مرّر للأسفل"
        >
          <span className="text-xs">{t('مرّر للأسفل')}</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </a>
      </div>
    </section>
  )
}
