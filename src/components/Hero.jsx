import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.jsx'

// الأجهزة اللمسية (خصوصاً iOS) لا تدعم تحريك الفيديو بالـ currentTime بثبات،
// لذا نكتفي فيها بتشغيل تلقائي متحرك (loop) بدل السكرول-سكرَب
function detectTouch() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    /iP(hone|ad|od)|Android/i.test(navigator.userAgent)
  )
}

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const [touch, setTouch] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    setTouch(detectTouch())
  }, [])

  // الوضع المتحرك التلقائي (جوال) — تشغيل الفيديو loop
  useEffect(() => {
    if (!touch) return
    const v = videoRef.current
    v.muted = true
    const play = () => v.play().catch(() => {})
    if (v.readyState >= 2) play()
    else v.addEventListener('canplay', play, { once: true })
  }, [touch])

  // الظهور الأولي للنص (على كل الأجهزة ما لم يُفعّل تقليل الحركة)
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  // السكرول-سكرَب (سطح المكتب فقط)
  useEffect(() => {
    if (reduced || touch) return
    const video = videoRef.current
    const ctx = gsap.context(() => {
      const state = { frame: 0 }

      const setupScrub = () => {
        const duration = video.duration || 8
        // تهيئة فك الترميز لضمان ظهور الإطارات عند الـ seek
        video.play().then(() => video.pause()).catch(() => {})

        gsap.to(state, {
          frame: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
          },
          onUpdate: () => {
            if (video.readyState >= 2) {
              video.currentTime = Math.min(state.frame, duration - 0.05)
            }
          },
        })

        gsap.to(contentRef.current, {
          y: 80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '40% top',
            scrub: true,
          },
        })

        ScrollTrigger.refresh()
      }

      if (video.readyState >= 1) setupScrub()
      else video.addEventListener('loadedmetadata', setupScrub, { once: true })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced, touch])

  // ارتفاع القسم: مساحة سكرول إضافية على سطح المكتب فقط
  const tall = !reduced && !touch

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative ${tall ? 'h-[320vh]' : 'min-h-screen'}`}
    >
      <div
        ref={pinRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* الفيديو: يتقدّم بالسكرول (سطح المكتب) أو loop تلقائي (جوال) */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/products/poster.webp"
          {...(touch ? { autoPlay: true, loop: true } : {})}
        >
          {/* mp4 (all-intra) أولاً لأنه أصغر وأسرع في الـ seek على كل المتصفّحات */}
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
        </video>

        {/* طبقة تدرج داكن للتباين */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,3,40,.72) 0%, rgba(3,3,40,.45) 40%, rgba(3,3,40,.9) 100%)',
          }}
        />

        {/* المحتوى */}
        <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mb-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
            {t('أدوات صحية فاخرة')}
          </span>
          <h1 className="font-cairo text-4xl font-black leading-tight text-white sm:text-6xl md:text-7xl">
            {t('فنّ الماء بلمسة')} <span className="text-brand-light">{t('ديفرا')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            {t('صنابير ومخلاطات منحوتة بدقّة تجمع بين الجمال والأداء، لتمنح مطبخك وحمّامك حضوراً استثنائياً يليق بذوقك الرفيع.')}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#collections" className="btn btn-primary">
              {t('استكشف المجموعة')}
            </a>
            <a
              href="/about"
              className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              {t('تعرّف على ديفرا')}
            </a>
          </div>
        </div>

        {/* مؤشر السكرول */}
        <a
          href="#collections"
          className="absolute inset-inline-0 bottom-8 z-10 mx-auto flex w-full flex-col items-center gap-2 text-white/70"
          style={{ insetInline: 0 }}
          aria-label="مرّر للأسفل"
        >
          <span className="text-xs">{tall ? t('مرّر لتحريك المشهد') : t('مرّر للأسفل')}</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </a>
      </div>
    </section>
  )
}
