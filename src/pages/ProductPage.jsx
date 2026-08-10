import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { productOf, collectionOf, FINISH } from '../productsData.js'
import { useLang } from '../i18n.jsx'

export default function ProductPage({ reduced }) {
  const { id } = useParams()
  const product = productOf(id)
  const { t, tr } = useLang()

  const primary = product?.images?.[product?.finishes?.[0]]
  // قائمة صور المعرض (المعرض إن وُجد وإلا الصورة الأساسية)
  const initial = useMemo(() => {
    const g = product?.gallery?.length ? product.gallery : []
    const finishImgs = product?.images ? Object.values(product.images) : []
    // معرض المنتج = صور المعرض الصريحة + صورة كل تشطيب (بلا تكرار)
    const list = [...new Set([...g, ...finishImgs, primary].filter(Boolean))]
    return list
  }, [product, primary])

  const [images, setImages] = useState(initial)
  const [active, setActive] = useState(0)

  useEffect(() => { setImages(initial); setActive(0); window.scrollTo(0, 0) }, [initial, id])

  if (!product) return <Navigate to="/products" replace />

  const collection = collectionOf(product.collection)
  const accent = collection?.accent || '#2f6fd6'
  const finish = FINISH[product.finishes[0]]

  // إزالة الصور التي تفشل في التحميل (تبقى الصور المتوفرة فقط)
  const onImgError = (src) => {
    setImages((list) => {
      const next = list.filter((s) => s !== src)
      return next.length ? next : [primary].filter(Boolean)
    })
    setActive(0)
  }

  const shown = images[active] || images[0] || primary
  const hasGallery = images.length > 1

  return (
    <div className="bg-ink">
      {/* بطل صفحة المنتج — صورة كبيرة + مبدّل صور + تفاصيل */}
      <section className="relative overflow-hidden">
        <span
          className="pointer-events-none absolute -top-32 start-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ insetInlineStart: '33%', background: `radial-gradient(circle, ${accent}2e, transparent 70%)` }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-28 md:pt-32 lg:grid-cols-2 lg:gap-14">
          {/* عمود الصور */}
          <div className="flex flex-col gap-4">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
              <span className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }} />
              <img
                key={shown}
                src={shown}
                alt={tr(product.title)}
                onError={() => onImgError(shown)}
                className={`relative max-h-[86%] w-auto max-w-[86%] object-contain drop-shadow-2xl ${reduced ? '' : 'floaty'}`}
              />
            </div>

            {/* شريط مصغّرات لتبديل الصور */}
            {hasGallery && (
              <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    aria-label={`${tr(product.title)} ${i + 1}`}
                    className={`grid aspect-square w-20 shrink-0 place-items-center overflow-hidden rounded-xl border bg-white/[0.05] p-1.5 transition-all sm:w-24 ${
                      i === active ? 'border-brand-light shadow-[0_0_0_2px_rgba(149,195,255,.4)]' : 'border-white/12 hover:border-white/40'
                    }`}
                  >
                    <img src={src} alt="" onError={() => onImgError(src)} className="h-full w-full object-contain" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* عمود التفاصيل */}
          <div>
            {collection && (
              <Link to={`/collection/${collection.id}`} className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-light hover:text-white">
                {t('ديفرا')} · {tr(collection.name)}
              </Link>
            )}
            <h1 className="font-cairo text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">{tr(product.title)}</h1>
            <p className="mt-4 max-w-md text-lg text-white/80">{tr(product.tagline)}</p>

            {/* المواصفات */}
            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {product.specs.map(([k, v], i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                  <div className="text-xs text-white/50">{tr(k)}</div>
                  <div className="mt-0.5 font-cairo font-bold text-brand-light">{tr(v)}</div>
                </div>
              ))}
            </div>

            {/* التشطيب */}
            <div className="mt-7 flex items-center gap-3">
              <span className="text-sm text-white/60">{t('التشطيب:')}</span>
              <span className="h-8 w-8 rounded-full border-2 border-brand-light" style={{ background: finish.swatch }} />
              <span className="text-sm text-white/80">{tr(finish.name)}</span>
            </div>

            {/* أزرار */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/966566906123"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                {t('استفسر عن المنتج')}
              </a>
              {collection && (
                <Link to={`/collection/${collection.id}`} className="btn w-full border border-white/25 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                  {t('كل منتجات القسم')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* وصف فاخر أسفل المنتج */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-strong">
            <span className="h-px w-8 bg-brand/40" />
            {t('عن المنتج')}
            <span className="h-px w-8 bg-brand/40" />
          </span>
          <h2 className="font-cairo text-3xl font-black leading-snug sm:text-4xl">
            {t('تفاصيل')} <span className="text-gradient">{t('تصنع الفرق')}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-dim">
            {tr(product.story || product.desc)}
          </p>
        </div>
      </section>
    </div>
  )
}
