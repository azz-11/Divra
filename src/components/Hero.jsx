import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { attachMagnet } from '../lib/motion.js'

const MARQUEE = ['تصميم نحتي', 'نحاس مصقول', 'أسود مطفي', 'DIVRA', 'ضمان 5 سنوات', 'حِرَفية عالية']

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const videoWrapRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const cleaners = []
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 })

      // Clip-line reveal for the headline
      tl.from('.mask-inner', {
        yPercent: 115,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      })
      tl.from(
        '[data-hero-fade]',
        { opacity: 0, y: 28, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6',
      )
      // Video panel: clip-path wipe + settle
      tl.from(
        videoWrapRef.current,
        { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power4.out' },
        '-=1.1',
      )

      // Parallax: gently scale/lift the video panel on scroll
      gsap.to(videoWrapRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (!window.matchMedia('(pointer: coarse)').matches) {
        gsap.utils.toArray('[data-magnet]').forEach((el) => {
          cleaners.push(attachMagnet(el, gsap, 0.4))
        })
      }
    }, sectionRef)
    return () => {
      cleaners.forEach((fn) => fn())
      ctx.revert()
    }
  }, [reduced])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* animated gradient blobs */}
      <div className="glow-blob top-[-10%] h-[520px] w-[520px]" style={{ insetInlineStart: '-6%', background: 'rgba(56,189,248,0.16)' }} />
      <div className="glow-blob bottom-[-15%] h-[480px] w-[480px]" style={{ insetInlineEnd: '-4%', background: 'rgba(59,110,245,0.16)' }} />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-24">
        {/* Text column (start / right in RTL) */}
        <div className="relative z-10">
          <span data-hero-fade className="eyebrow mb-6">أدوات صحية فاخرة</span>

          <h1 className="font-cairo text-5xl font-black leading-[1.08] sm:text-6xl md:text-7xl">
            <span className="mask-line">
              <span className="mask-inner">فنّ الماء</span>
            </span>
            <span className="mask-line">
              <span className="mask-inner">
                بلمسة <span className="text-gradient">ديفرا</span>
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-7 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg">
            صنابير ومخلاطات منحوتة بدقّة تجمع بين الجمال والأداء، لتمنح مطبخك
            وحمّامك حضوراً استثنائياً يليق بذوقك الرفيع.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#showcase" className="btn btn-primary" data-magnet>استكشف المجموعة</a>
            <a href="#manifesto" className="btn btn-ghost" data-magnet>تعرّف على ديفرا</a>
          </div>

          {/* inline mini-stats */}
          <div data-hero-fade className="mt-12 flex gap-8 border-t border-line pt-7">
            {[['+15', 'عاماً خبرة'], ['4', 'قطع منتقاة'], ['5', 'سنوات ضمان']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-brand-pale">{v}</div>
                <div className="mt-1 text-xs text-text-dim">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video panel (end / left in RTL) */}
        <div className="relative z-10">
          <div
            ref={videoWrapRef}
            className="relative overflow-hidden rounded-xl3 border border-line-strong shadow-2xl shadow-black/50"
            style={{ clipPath: 'inset(0 0 0 0)' }}
          >
            <video
              className="aspect-[4/5] h-full w-full object-cover sm:aspect-[3/4]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/products/poster.webp"
            >
              <source src="/video/hero.webm" type="video/webm" />
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
            {/* readability + brand tint */}
            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,6,28,.15) 0%, rgba(4,6,28,.15) 55%, rgba(4,6,28,.75) 100%)' }} />
            {/* floating chip */}
            <div className="glass absolute bottom-4 inset-inline-start-4 rounded-xl2 px-4 py-3" style={{ insetInlineStart: '1rem' }}>
              <div className="text-xs text-text-dimmer">التشطيب الحالي</div>
              <div className="font-cairo font-bold text-brand-pale">أسود مطفي</div>
            </div>
          </div>
        </div>
      </div>

      {/* kinetic marquee strip */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-y border-line bg-ink-2/60 py-4 backdrop-blur">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0">
              {MARQUEE.map((w, j) => (
                <span key={j} className="flex items-center">
                  <span className="mx-7 font-cairo text-lg font-bold text-text-dim sm:text-xl">{w}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-sky/50" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <a href="#manifesto" data-hero-fade className="absolute bottom-24 inset-inline-0 z-10 mx-auto hidden w-full flex-col items-center gap-2 text-text-dimmer lg:flex" style={{ insetInline: 0 }} aria-label="مرّر للأسفل">
        <span className="text-xs tracking-widest">مرّر للأسفل</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-sky/40 p-1">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-cyan" />
        </span>
      </a>
    </section>
  )
}
