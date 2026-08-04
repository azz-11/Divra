import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATEMENT =
  'في ديفرا نؤمن أن الأدوات الصحية ليست مجرّد وظيفة، بل لغة تعبّر عن رقيّ المكان. نجمع بين هندسة دقيقة وحرفية عالية لنقدّم صنابير ومخلاطات تتحدّى الزمن جمالاً وأداءً.'

const VALUES = [
  { title: 'تصميم نحتي', desc: 'خطوط انسيابية منحوتة بعناية تحوّل كل صنبور إلى قطعة فنية.' },
  { title: 'جودة معتمدة', desc: 'مواد نحاسية وسبائك مقاومة للصدأ بمعايير جودة عالمية.' },
  { title: 'يحبه العملاء', desc: 'تجربة استخدام سلسة وتفاصيل تُبهر أصحاب الذوق الرفيع.' },
]

const STATS = [
  { value: 15, suffix: '+', label: 'عاماً من الخبرة' },
  { value: 4, suffix: '', label: 'قطع منتقاة' },
  { value: 100, suffix: '%', label: 'نحاس أصلي' },
]

export default function Manifesto({ reduced }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.sweep-word')

      // Illuminate words progressively across the pinned scroll span
      gsap.to(words, {
        color: 'var(--text)',
        ease: 'none',
        stagger: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 0.4,
          pin: '.manifesto-pin',
        },
      })

      // Reveal the values + stats after the pinned span
      gsap.from('[data-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-after]', start: 'top 82%' },
      })

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="manifesto" ref={sectionRef} className="relative bg-ink">
      {/* Pinned statement stage */}
      <div className="manifesto-pin relative flex min-h-screen items-center overflow-hidden">
        <div className="glow-blob top-1/4 h-[420px] w-[420px]" style={{ insetInlineEnd: '-6%', background: 'rgba(34,211,238,0.12)' }} />
        <div className="mx-auto max-w-5xl px-6">
          <span className="eyebrow mb-8">البيان</span>
          <p
            ref={textRef}
            className={`font-cairo text-2xl font-bold leading-[1.7] sm:text-3xl md:text-4xl md:leading-[1.6] ${
              reduced ? 'manifesto-static' : ''
            }`}
          >
            {STATEMENT.split(' ').map((w, i) => (
              <span key={i} className="sweep-word">
                {w}
                {i < STATEMENT.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Values + stats */}
      <div data-after className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 md:pb-32">
        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.title} data-reveal className="glass rounded-xl2 p-7">
              <div className="font-display mb-4 text-sm font-bold text-sky">
                0{i + 1}
              </div>
              <h3 className="font-cairo text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{v.desc}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-9">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-start">
              <div
                data-count={s.value}
                data-suffix={s.suffix}
                className="font-display text-4xl font-bold text-brand-pale sm:text-5xl"
              >
                {reduced ? `${s.value}${s.suffix}` : '0'}
              </div>
              <div className="mt-1 text-xs leading-tight text-text-dim sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
