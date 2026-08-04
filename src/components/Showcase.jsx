import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PRODUCTS, FINISH } from '../productsData.js'
import { splitWords } from '../lib/motion.js'

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'kitchen', label: 'مطبخ' },
  { key: 'bath', label: 'حمّام / بانيو' },
]

export default function Showcase({ reduced }) {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const titleRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [activeId, setActiveId] = useState(PRODUCTS[0].id)
  const [finishes, setFinishes] = useState(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.finishes[0]])),
  )

  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter)
  const activeProduct = PRODUCTS.find((p) => p.id === activeId) || visible[0]

  // Keep active within the current filter
  useEffect(() => {
    if (!visible.some((p) => p.id === activeId)) setActiveId(visible[0]?.id)
  }, [filter]) // eslint-disable-line

  // Heading reveal
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const words = splitWords(titleRef.current)
      gsap.from(words, {
        opacity: 0,
        yPercent: 110,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      })
      gsap.from('[data-head-fade]', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      })
    })
    return () => ctx.revert()
  }, [reduced])

  // Scroll-driven active product (desktop scrollytelling)
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.show-panel').forEach((panel) => {
        const id = panel.dataset.id
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActiveId(id),
        })
      })
    }, sectionRef)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reduced, filter])

  const setFinish = (id, key) => setFinishes((f) => ({ ...f, [id]: key }))

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-surface py-24 md:py-32">
      {/* Blob clipped in its own layer — do NOT put overflow-hidden on the
          section itself, it would break the sticky stage below. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-blob top-[8%] h-[460px] w-[460px]" style={{ insetInlineStart: '-8%', background: 'rgba(59,110,245,0.12)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Head */}
        <div ref={headRef} className="max-w-2xl">
          <span data-head-fade className="eyebrow mb-4">المجموعة</span>
          <h2 ref={titleRef} className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl">
            قطع تُعيد تعريف الفخامة
          </h2>
          <p data-head-fade className="mt-4 max-w-lg text-text-dim">
            تشكيلة منتقاة من الصنابير والمخلاطات، مرّر لتتنقّل بين القطع ويتبدّل
            العرض تلقائياً.
          </p>
          <div data-head-fade className="mt-8 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`btn text-sm ${filter === f.key ? 'btn-primary' : 'btn-ghost'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollytelling body */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Scrolling panels (start / right) */}
          <div className="order-2 lg:order-1">
            {visible.map((p) => {
              const finish = finishes[p.id]
              return (
                <article
                  key={p.id}
                  data-id={p.id}
                  className="show-panel flex min-h-[70vh] flex-col justify-center border-b border-line py-10 lg:min-h-[86vh]"
                >
                  {/* mobile image */}
                  <div className="product-media relative mx-auto mb-8 flex max-w-xs items-center justify-center lg:hidden">
                    <span className="glow-ring inset-inline-0 top-1/2 mx-auto h-4/5 w-4/5 -translate-y-1/2" style={{ insetInline: 0, background: 'radial-gradient(circle, rgba(56,189,248,.3), transparent 64%)' }} />
                    <img src={p.images[finish]} alt={p.title} className="relative z-10 h-full w-full object-contain drop-shadow-2xl" loading="lazy" />
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-display text-4xl font-bold text-outline">{p.num}</span>
                    <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-sky">{p.categoryLabel}</span>
                  </div>
                  <h3 className="font-cairo text-2xl font-black sm:text-3xl">{p.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-text-dim">{p.desc}</p>

                  <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
                    {p.specs.map(([k, v]) => (
                      <div key={k} className="glass rounded-xl2 px-4 py-3">
                        <div className="text-xs text-text-dimmer">{k}</div>
                        <div className="mt-0.5 font-cairo font-bold text-brand-pale">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-sm text-text-dim">التشطيب:</span>
                    <div className="flex items-center gap-3">
                      {p.finishes.map((key) => (
                        <button
                          key={key}
                          onClick={() => setFinish(p.id, key)}
                          aria-label={FINISH[key].name}
                          title={FINISH[key].name}
                          disabled={p.finishes.length === 1}
                          className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 disabled:cursor-default ${
                            finish === key ? 'border-sky ring-2 ring-sky/40' : 'border-white/20'
                          }`}
                          style={{ background: FINISH[key].swatch }}
                        />
                      ))}
                      {p.finishes.length === 1 && (
                        <span className="text-sm text-text-dim">{FINISH[p.finishes[0]].name}</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Sticky stage (end / left) — desktop only */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <div className="product-media relative flex w-full max-w-md items-center justify-center">
                <span className="glow-ring inset-inline-0 top-1/2 mx-auto h-[85%] w-[85%] -translate-y-1/2" style={{ insetInline: 0, background: 'radial-gradient(circle, rgba(56,189,248,.32), transparent 62%)' }} />
                <span className="glow-ring inset-inline-0 top-1/2 mx-auto h-3/5 w-3/5 -translate-y-1/2 border border-sky/25" style={{ insetInline: 0 }} />

                {/* big active index */}
                <span key={activeProduct?.id} className="font-display pointer-events-none absolute select-none text-[12rem] font-bold leading-none text-outline" aria-hidden="true">
                  {activeProduct?.num}
                </span>

                {/* cross-faded product images */}
                {PRODUCTS.map((p) => (
                  <img
                    key={p.id}
                    src={p.images[finishes[p.id]]}
                    alt={p.title}
                    className={`absolute inset-0 z-10 m-auto h-full w-full object-contain drop-shadow-2xl transition-all duration-500 ${
                      p.id === activeId ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
