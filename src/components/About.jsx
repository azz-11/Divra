import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FEATURES = [
  {
    title: 'تصميم نحتي',
    desc: 'خطوط انسيابية منحوتة بعناية تحوّل كل صنبور إلى قطعة فنية.',
    icon: (
      <path d="M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1L12 2z" />
    ),
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
  { value: '15+', label: 'عاماً من الخبرة' },
  { value: '9', label: 'تشطيبات فاخرة' },
]

export default function About({ reduced }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // الصورة تبدأ مكبّرة وتصغر تدريجياً مع مرور القسم
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
      // ظهور العناصر النصية
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
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
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* عمود الصورة */}
        <div className="relative flex justify-center">
          <div className="glass relative aspect-square w-full max-w-md rounded-full p-10">
            <div
              className="absolute inset-6 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(85,97,229,.55), transparent 70%)',
              }}
            />
            <img
              ref={imageRef}
              src="/products/faucet-bath-chrome.webp"
              alt="مخلط ديفرا الفاخر"
              className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>

          {/* إحصائيات عائمة */}
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`glass absolute z-20 rounded-xl2 px-5 py-3 text-center ${
                i === 0
                  ? 'top-6 inset-inline-start-0'
                  : 'bottom-6 inset-inline-end-0'
              }`}
              style={i === 0 ? { insetInlineStart: 0 } : { insetInlineEnd: 0 }}
            >
              <div className="font-cairo text-2xl font-black text-brand-light">
                {s.value}
              </div>
              <div className="text-xs text-text-dim">{s.label}</div>
            </div>
          ))}
        </div>

        {/* عمود النص */}
        <div>
          <span
            data-reveal
            className="mb-4 inline-block rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-brand-pale"
          >
            من نحن
          </span>
          <h2
            data-reveal
            className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl"
          >
            نصنع <span className="text-gradient">تفاصيل</span> تدوم
          </h2>
          <p data-reveal className="mt-5 text-text-dim">
            في ديفرا نؤمن أن الأدوات الصحية ليست مجرّد وظيفة، بل لغة تعبّر عن
            رقيّ المكان. نجمع بين هندسة دقيقة وحرفية عالية لنقدّم صنابير ومخلاطات
            تتحدّى الزمن جمالاً وأداءً.
          </p>

          <div className="mt-9 space-y-5">
            {FEATURES.map((f) => (
              <div key={f.title} data-reveal className="flex items-start gap-4">
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl2 bg-brand/15 text-brand-light">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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
        </div>
      </div>
    </section>
  )
}
