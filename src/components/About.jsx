import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.jsx'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    title: 'تصميم يعكس الفخامة',
    desc: 'تصاميم عصرية بخطوط أنيقة وتفاصيل مدروسة تناسب مختلف المساحات.',
  },
  {
    title: 'جودة في كل تفصيل',
    desc: 'اهتمام بالخامات والتشطيبات لتحقيق التوازن بين المظهر الراقي والأداء العملي.',
  },
  {
    title: 'فخامة تناسب أسلوب حياتك',
    desc: 'حلول تجمع بين الأناقة والراحة، وتواكب تطلعات الذوق السعودي المعاصر.',
  },
]

export default function About({ reduced }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // الصورة تبدأ مكبّرة وتصغر تدريجياً مع التمرير
      gsap.fromTo(
        imageRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-surface">
      {/* القسم الرئيسي: صورة بارتفاع الشاشة + نص */}
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* الصورة */}
        <div className="relative h-[70vh] overflow-hidden lg:order-2 lg:h-auto">
          <img
            ref={imageRef}
            src="/products/about-mixer.webp"
            alt="خلاط ديفرا"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* دمج الصورة مع الخلفية */}
          <span
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ background: 'linear-gradient(to right, transparent 60%, var(--surface) 100%)' }}
          />
          <span
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent 55%, var(--surface) 100%)' }}
          />
          {/* شارة سعودية */}
          <div className="glass absolute bottom-8 end-8 rounded-2xl px-5 py-4 text-center" style={{ insetInlineEnd: '2rem' }}>
            <div className="text-xs uppercase tracking-[0.3em] text-brand-light">{t('صُنع بهوية')}</div>
            <div className="mt-1 font-cairo text-xl font-black">{t('سعودية')}</div>
          </div>
        </div>

        {/* النص */}
        <div className="relative z-10 flex items-center px-6 py-20 sm:px-12 lg:px-20 xl:px-28">
          <div className="max-w-xl">
            <span data-reveal className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-light">
              <span className="h-px w-10 bg-brand-light/60" />
              {t('من نحن')}
            </span>
            <h1 data-reveal className="font-cairo text-4xl font-black leading-[1.25] sm:text-5xl xl:text-6xl">
              {t('هوية سعودية…')}
              <br />
              <span className="text-gradient">{t('بتفاصيل استثنائية')}</span>
            </h1>

            <p data-reveal className="mt-8 text-lg leading-loose text-text">
              <span dir="ltr" className="font-black tracking-wider text-brand-light">DIVRA</span>{' '}
              {t('علامة تجارية سعودية متخصصة في الخلاطات والأدوات الصحية، تجمع بين أناقة التصميم العصري والاهتمام بأدق التفاصيل.')}
            </p>
            <p data-reveal className="mt-5 leading-loose text-text-dim">
              {t('نؤمن بأن الفخامة لا تقتصر على المظهر، بل تنعكس في جودة التشطيبات، ودقة التصميم، وسهولة الاستخدام.')}
            </p>
            <p data-reveal className="mt-5 leading-loose text-text-dim">
              {t('نسعى من خلال منتجاتنا إلى تقديم تجربة تجمع بين الجمال والعملية، وتضفي لمسة من الرقي على المساحات السكنية والتجارية.')}
            </p>
          </div>
        </div>
      </div>

      {/* الركائز الثلاث */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              className="group relative border-line px-8 py-14 transition-colors hover:bg-brand/5 md:border-e md:last:border-e-0 lg:px-12 lg:py-20"
            >
              <div dir="ltr" className="font-cairo text-6xl font-black text-transparent transition-colors group-hover:text-brand-light/20" style={{ WebkitTextStroke: '1px rgba(149,195,255,.45)' }}>
                0{i + 1}
              </div>
              <h3 className="mt-6 font-cairo text-2xl font-bold">{t(p.title)}</h3>
              <p className="mt-3 leading-relaxed text-text-dim">{t(p.desc)}</p>
              <span className="absolute bottom-0 start-8 h-0.5 w-0 bg-brand-light transition-all duration-500 group-hover:w-24" style={{ insetInlineStart: '2rem' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
