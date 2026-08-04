import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PRODUCTS } from '../productsData.js'

// Pinned horizontal-scroll showcase. The section pins and the panel track
// translates horizontally as the user scrolls vertically — the signature
// "agency" scroll motion. The track is laid out LTR for deterministic
// mechanics; each panel's content stays RTL.
export default function Collection({ reduced }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const panels = gsap.utils.toArray('.collect-panel')

      const getScrollAmount = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + getScrollAmount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              panels.length - 1,
              Math.round(self.progress * (panels.length - 1)),
            )
            setActive(idx)
          },
        },
      })

      // Parallax the image inside each panel as it crosses the viewport
      panels.forEach((panel) => {
        const img = panel.querySelector('.collect-img')
        gsap.fromTo(
          img,
          { xPercent: 8 },
          {
            xPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="collection" ref={sectionRef} className="relative overflow-hidden bg-ink">
      {/* Section heading overlay (fixed within the pinned viewport) */}
      <div
        className={`z-20 px-6 ${
          reduced
            ? 'relative pt-24 pb-4'
            : 'pointer-events-none absolute inset-x-0 top-0 pt-24 md:pt-28'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-end justify-between">
          <div>
            <span className="eyebrow mb-3">المجموعة</span>
            <h2 className="font-cairo text-3xl font-black leading-none sm:text-4xl md:text-5xl">
              رحلة عبر <span className="text-gradient">القطع</span>
            </h2>
          </div>
          <div
            dir="ltr"
            className="hidden font-display text-sm tracking-[0.3em] text-text-dimmer sm:block"
          >
            <span className="text-gold-2">{String(active + 1).padStart(2, '0')}</span>
            {' / '}
            {String(PRODUCTS.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Horizontal track (LTR mechanics; RTL content per panel).
          Reduced motion → plain vertical stack. */}
      <div
        ref={trackRef}
        dir={reduced ? 'rtl' : 'ltr'}
        className={
          reduced
            ? 'flex flex-col gap-8 py-28'
            : 'flex h-screen items-center'
        }
        style={reduced ? undefined : { width: 'max-content' }}
      >
        {PRODUCTS.map((p, i) => (
          <article
            key={p.id}
            dir="rtl"
            className={
              reduced
                ? 'flex items-center justify-center px-6'
                : 'collect-panel flex h-screen w-screen flex-shrink-0 items-center justify-center px-6'
            }
          >
            <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
              {/* Visual */}
              <div className="relative order-1 flex items-center justify-center">
                <span
                  className="font-display pointer-events-none absolute select-none text-[9rem] font-bold leading-none text-outline sm:text-[13rem]"
                  aria-hidden="true"
                >
                  {p.num}
                </span>
                <span
                  className="glow-ring left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background: 'radial-gradient(circle, rgba(201,169,106,.28), transparent 66%)',
                  }}
                />
                <div className="product-media relative flex w-full max-w-sm items-center justify-center overflow-hidden">
                  <img
                    src={p.images[p.finishes[0]]}
                    alt={p.title}
                    className="collect-img relative z-10 h-full w-full object-contain drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Copy */}
              <div className="order-2 text-center md:text-start">
                <span className="mb-3 inline-block rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gold-2">
                  {p.categoryLabel}
                </span>
                <h3 className="font-cairo text-2xl font-black sm:text-3xl md:text-4xl">
                  {p.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-text-dim md:mx-0">{p.desc}</p>
                <a href="#products" className="btn btn-ghost mt-7" data-cursor>
                  التفاصيل الكاملة
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* progress dots */}
      <div
        className={`pointer-events-none z-20 flex justify-center gap-2 ${
          reduced ? 'hidden' : 'absolute inset-x-0 bottom-8'
        }`}
      >
        {PRODUCTS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-gold' : 'w-1.5 bg-white/25'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
