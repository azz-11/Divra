import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // الفيديو يكبر تدريجياً مع السكرول
      gsap.to(videoRef.current, {
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      // النص يتلاشى ويتحرك للأسفل
      gsap.to(contentRef.current, {
        y: 80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
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
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* فيديو الخلفية */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
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
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
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
        <span className="text-xs">مرّر للأسفل</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-light" />
        </span>
      </a>
    </section>
  )
}
