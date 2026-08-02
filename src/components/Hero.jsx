import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    const ctx = gsap.context(() => {
      // ربط تقدّم الفيديو بموضع السكرول (scrubbing)
      const state = { frame: 0 }

      const setupScrub = () => {
        const duration = video.duration || 8
        gsap.killTweensOf(state)

        // تثبيت الهيرو وتحريك الفيديو إطاراً بإطار مع السكرول
        gsap.to(state, {
          frame: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: pinRef.current,
            anticipatePin: 1,
          },
          onUpdate: () => {
            // نتجنّب طلبات seek متزاحمة أثناء الجاهزية
            if (video.readyState >= 2) {
              video.currentTime = Math.min(state.frame, duration - 0.05)
            }
          },
        })

        // تلاشي النص وتحرّكه للأسفل مع تقدّم السكرول
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

      if (video.readyState >= 1) {
        setupScrub()
      } else {
        video.addEventListener('loadedmetadata', setupScrub, { once: true })
      }

      // ظهور أولي للنص
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

  return (
    // ارتفاع إضافي يوفّر مسافة السكرول التي يُقرأ خلالها الفيديو
    // (عند تفضيل تقليل الحركة نكتفي بشاشة واحدة ثابتة)
    <section
      id="hero"
      ref={sectionRef}
      className={`relative ${reduced ? 'min-h-screen' : 'h-[220vh]'}`}
    >
      {/* الحاوية المثبّتة بحجم الشاشة */}
      <div
        ref={pinRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* فيديو يتقدّم بالسكرول — بلا تشغيل تلقائي أو loop */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/products/poster.webp"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
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
          <span className="mb-5 inline-block rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-brand-pale backdrop-blur">
            أدوات صحية فاخرة
          </span>
          <h1 className="font-cairo text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
            فنّ الماء بلمسة <span className="text-gradient">ديفرا</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-text-dim sm:text-lg">
            صنابير ومخلاطات منحوتة بدقّة تجمع بين الجمال والأداء، لتمنح مطبخك
            وحمّامك حضوراً استثنائياً يليق بذوقك الرفيع.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#products" className="btn btn-primary">
              استكشف المجموعة
            </a>
            <a href="#about" className="btn btn-ghost">
              تعرّف على ديفرا
            </a>
          </div>
        </div>

        {/* مؤشر السكرول */}
        <a
          href="#about"
          className="absolute inset-inline-0 bottom-8 z-10 mx-auto flex w-full flex-col items-center gap-2 text-text-dimmer"
          style={{ insetInline: 0 }}
          aria-label="مرّر للأسفل"
        >
          <span className="text-xs">مرّر لتحريك المشهد</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </a>
      </div>
    </section>
  )
}
