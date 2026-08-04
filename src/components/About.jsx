import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitWords } from '../lib/motion.js'

const FEATURES = [
  {
    title: 'تصميم نحتي',
    desc: 'خطوط انسيابية منحوتة بعناية تحوّل كل صنبور إلى قطعة فنية.',
    icon: <path d="M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1L12 2z" />,
  },
  {
    title: 'جودة معتمدة',
    desc: 'مواد نحاسية وسبائك مقاومة للصدأ بمعايير جودة عالمية.',
    icon: (
      <path d="M12 2l7 3v6c0 5-3.4 8.5-7 11-3.6-2.5-7-6-7-11V5l7-3zm-1 13l5-5-1.4-1.4L11 12.2 9.4 10.6 8 12l3 3z" />
    ),
  },
  {
    title: 'تصميم يحبه العملاء',
    desc: 'تجربة استخدام سلسة وتفاصيل تُبهر أصحاب الذوق الرفيع.',
    icon: (
      <path d="M12 21s-7-4.6-9.3-9C1.2 8.6 2.8 5 6.2 5c2 0 3.2 1.1 3.8 2 .6-.9 1.8-2 3.8-2 3.4 0 5 3.6 3.5 7-2.3 4.4-9.1 9-9.1 9z" />
    ),
  },
]

const STATS = [
  { value: 15, suffix: '+', label: 'عاماً من الخبرة' },
  { value: 4, suffix: '', label: 'قطع منتقاة' },
  { value: 100, suffix: '%', label: 'نحاس أصلي' },
]

export default function About({ reduced }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const headRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // Image eases from zoomed-in to natural through the section
      gsap.fromTo(
        imageRef.current,
        { scale: 1.25 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // Slow rotation of the decorative ring
      gsap.to('[data-spin]', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Word-reveal the heading
      const words = splitWords(headRef.current)
      gsap.from(words, {
        opacity: 0,
        yPercent: 110,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      })

      // Reveal text blocks
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Count-up stats
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      {/* ambient gold glow */}
      <div
        className="glow-blob inset-inline-start-[-10%] top-[10%] h-[420px] w-[420px]"
        style={{ insetInlineStart: '-8%', background: 'rgba(201,169,106,0.14)' }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Image column */}
        <div className="relative flex justify-center">
          <div className="glass relative aspect-square w-full max-w-md rounded-full p-10">
            <div
              className="absolute inset-6 rounded-full opacity-70 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(201,169,106,.4), transparent 68%)' }}
            />
            {/* rotating dashed ring */}
            <div
              data-spin
              className="absolute inset-2 rounded-full border border-dashed border-gold/25"
            />
            <img
              ref={imageRef}
              src="/products/faucet-bath-black.webp"
              alt="مخلط ديفرا الفاخر"
              className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>

          {/* Floating stat chips */}
          <div
            className="glass absolute top-6 z-20 rounded-xl2 px-5 py-3 text-center"
            style={{ insetInlineStart: 0 }}
          >
            <div
              data-count="15"
              data-suffix="+"
              className="font-display text-2xl font-bold text-gold-2"
            >
              0
            </div>
            <div className="text-xs text-text-dim">عاماً من الخبرة</div>
          </div>
          <div
            className="glass absolute bottom-6 z-20 rounded-xl2 px-5 py-3 text-center"
            style={{ insetInlineEnd: 0 }}
          >
            <div
              data-count="4"
              className="font-display text-2xl font-bold text-gold-2"
            >
              0
            </div>
            <div className="text-xs text-text-dim">قطع منتقاة</div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <span data-reveal className="eyebrow mb-4">
            من نحن
          </span>
          <h2
            ref={headRef}
            className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl"
          >
            نصنع تفاصيل تدوم
          </h2>
          <p data-reveal className="mt-5 leading-relaxed text-text-dim">
            في ديفرا نؤمن أن الأدوات الصحية ليست مجرّد وظيفة، بل لغة تعبّر عن
            رقيّ المكان. نجمع بين هندسة دقيقة وحرفية عالية لنقدّم صنابير ومخلاطات
            تتحدّى الزمن جمالاً وأداءً.
          </p>

          <div className="mt-9 space-y-5">
            {FEATURES.map((f) => (
              <div key={f.title} data-reveal className="flex items-start gap-4">
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl2 border border-line bg-gold/10 text-gold-2">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    {f.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-cairo text-lg font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm text-text-dim">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline stat strip */}
          <div data-reveal className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-7">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  data-count={s.value}
                  data-suffix={s.suffix}
                  className="font-display text-3xl font-bold text-gold-2"
                >
                  0
                </div>
                <div className="mt-1 text-xs leading-tight text-text-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
