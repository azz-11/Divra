import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronDown, X } from 'lucide-react'
import { FINISH } from '../productsData.js'
import { useLang } from '../i18n.jsx'

export default function ProductGridReveal({ products, accent = '#2f6fd6', reduced }) {
  const [selected, setSelected] = useState(null)
  const revealRef = useRef(null)
  const { t, tr } = useLang()

  // حركة الدخول/التبديل عند تغيّر المنتج المختار + تمرير تلقائي للقسم
  useEffect(() => {
    if (!selected) return
    if (revealRef.current) {
      if (!reduced) {
        gsap.fromTo(
          revealRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        )
        const media = revealRef.current.querySelector('[data-media]')
        if (media) gsap.fromTo(media, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' })
      }
      revealRef.current.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
  }, [selected, reduced])

  const open = (p) => {
    if (selected && selected.id === p.id) return
    setSelected(p) // إن كان مفتوحاً بالفعل، يتبدّل المحتوى (crossfade عبر useEffect)
  }

  const close = () => {
    const el = revealRef.current
    const back = () => {
      setSelected(null)
      document.getElementById('product-grid')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
    if (reduced || !el) return back()
    gsap.to(el, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in', onComplete: back })
  }

  return (
    <>
      {/* شبكة بطاقات المنتجات */}
      <div id="product-grid" className="mx-auto grid max-w-7xl scroll-mt-24 grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const isActive = selected && selected.id === p.id
          return (
            <button
              key={p.id}
              onClick={() => open(p)}
              className={`group relative flex flex-col rounded-xl2 border bg-white/10 p-4 text-start backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl ${
                isActive ? 'border-brand shadow-[0_0_0_2px_rgba(79,143,240,.35)]' : 'border-line hover:border-brand-light'
              }`}
            >
              <div className="relative mb-3 aspect-square w-full">
                <span className="absolute inset-0 m-auto h-4/5 w-4/5 rounded-full blur-2xl" style={{ background: `radial-gradient(circle, ${accent}22, transparent 65%)` }} />
                <img src={p.images[p.finishes[0]]} alt={tr(p.title)} loading="lazy" className="relative h-full w-full object-contain drop-shadow-lg" />
              </div>
              <span className="font-cairo text-sm font-bold text-text sm:text-base">{tr(p.title)}</span>
              <span className="mt-1 text-xs text-brand-strong">{tr(p.specs[0][1])}</span>
              {/* مؤشّر أن الضغط "يفتح" */}
              <span className="absolute inset-inline-end-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-brand/12 text-brand-strong transition-all group-hover:bg-brand group-hover:text-white" style={{ insetInlineEnd: '0.75rem' }}>
                <ChevronDown size={16} strokeWidth={2.5} />
              </span>
            </button>
          )
        })}
      </div>

      {/* قسم المنتج كامل الشاشة (يُحقن أسفل الشبكة عند الاختيار) */}
      {selected && (
        <section
          ref={revealRef}
          className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden"
          style={{ background: `linear-gradient(140deg, #02021b 0%, ${accent}2e 60%, #030435 100%)` }}
        >
          {/* زر الإغلاق */}
          <button
            onClick={close}
            aria-label={t('العودة للرئيسية')}
            className="absolute end-5 top-24 z-20 grid h-12 w-12 place-items-center rounded-full border border-line bg-white/10 text-text backdrop-blur transition-all hover:scale-105 hover:border-brand"
          >
            <X size={22} strokeWidth={2.25} />
          </button>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-2">
            {/* صورة المنتج مع حركة Ken Burns */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }} />
              <div className="relative max-h-[70vh] w-auto max-w-full overflow-hidden drop-shadow-2xl">
                <img
                  data-media
                  key={selected.id}
                  src={selected.images[selected.finishes[0]]}
                  alt={tr(selected.title)}
                  className={`block max-h-[70vh] w-auto max-w-full object-contain ${reduced ? '' : 'kenburns'}`}
                />
              </div>
            </div>

            {/* التفاصيل */}
            <div>
              <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-brand-strong">{t('ديفرا')}</span>
              <h2 className="font-cairo text-4xl font-black leading-tight text-text sm:text-5xl">{tr(selected.title)}</h2>
              <p className="mt-4 max-w-md text-lg text-text-dim">{tr(selected.desc)}</p>

              {/* جدول المواصفات */}
              <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
                {selected.specs.map(([k, v], i) => (
                  <div key={i} className="rounded-xl2 border border-line bg-white/10 px-4 py-3 backdrop-blur">
                    <div className="text-xs text-text-dimmer">{tr(k)}</div>
                    <div className="mt-0.5 font-cairo font-bold text-brand-strong">{tr(v)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="text-sm text-text-dim">{t('التشطيب:')}</span>
                <span className="h-8 w-8 rounded-full border-2 border-brand" style={{ background: FINISH[selected.finishes[0]].swatch }} />
                <span className="text-sm text-text-dim">{tr(FINISH[selected.finishes[0]].name)}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
