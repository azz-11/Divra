import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductBackground from './ProductBackground.jsx'

export default function ProductHighlight({ product, collection, index, reduced }) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const reversed = index % 2 === 1

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // دخول سينمائي: الصورة تكبر من صغيرة وشفافة
      gsap.fromTo(
        imgRef.current,
        { scale: 0.7, opacity: 0, y: 60 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      )
      // Parallax مستمر أثناء المرور
      gsap.fromTo(
        imgRef.current,
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      // ظهور النص بتتالٍ
      gsap.from(ref.current.querySelectorAll('[data-rv]'), {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <ProductBackground variant={collection.bg} accent={collection.accent} />

      {/* اسم القسم كعلامة مائية خلفية */}
      <span
        className="pointer-events-none absolute inset-inline-0 top-8 select-none text-center font-cairo text-[18vw] font-black leading-none text-white/[0.03] md:text-[12vw]"
        style={{ insetInline: 0 }}
        aria-hidden="true"
      >
        {collection.short}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        {/* الصورة */}
        <div className={reversed ? 'lg:order-2' : 'lg:order-1'}>
          <img
            ref={imgRef}
            src={product.images[product.finishes[0]]}
            alt={product.title}
            className="mx-auto max-h-[70vh] w-full max-w-md object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </div>

        {/* النص */}
        <div className={reversed ? 'lg:order-1' : 'lg:order-2'}>
          <span data-rv className="mb-4 inline-block rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm" style={{ color: collection.accent }}>
            {collection.name}
          </span>
          <h2 data-rv className="font-cairo text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {product.title}
          </h2>
          <p data-rv className="mt-4 max-w-md text-lg text-text-dim">{product.tagline}</p>

          <div data-rv className="mt-6 flex flex-wrap gap-3">
            {product.specs.slice(0, 3).map(([k, v]) => (
              <span key={k} className="glass rounded-full px-4 py-2 text-sm">
                <span className="text-text-dimmer">{k}: </span>
                <span className="font-bold text-brand-light">{v}</span>
              </span>
            ))}
          </div>

          {/* رابط مشاهدة جميع منتجات القسم */}
          <Link
            data-rv
            to={`/collection/${collection.id}`}
            className="group mt-8 inline-flex items-center gap-2 font-cairo font-bold text-brand-light"
          >
            انتقل لمشاهدة جميع منتجات {collection.short}
            <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:-translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
