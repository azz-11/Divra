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
    <div className="relative overflow-x-hidden bg-ink">
      {/* خلفية محيطة تكسر الجمود — توهّجان ناعمان + شبكة خافتة جداً */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="absolute -top-24 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ insetInlineStart: '-8%', background: `radial-gradient(circle, ${accent}26, transparent 68%)` }}
        />
        <span
          className="absolute top-[42%] h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ insetInlineEnd: '-10%', background: 'radial-gradient(circle, rgba(149,195,255,.14), transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'radial-gradient(1200px 600px at 50% -10%, rgba(120,160,255,.10), transparent 60%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 46px 46px, 46px 46px',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
          }}
        />
      </div>

      {/* بطل صفحة المنتج — صورة كبيرة + مبدّل صور + تفاصيل */}
      <section className="relative overflow-hidden pt-20 sm:pt-24">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-6 pb-14 sm:gap-10 sm:px-6 sm:pt-8 lg:grid-cols-2 lg:gap-14 lg:pb-16">
          {/* عمود الصور */}
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
            {/* الصورة الكبيرة — ملء العرض على الجوال (حافة إلى حافة) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0d0d24] sm:aspect-square sm:rounded-3xl sm:border sm:border-white/10">
              <span className="pointer-events-none absolute inset-0 m-auto h-3/4 w-3/4 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}2e, transparent 70%)` }} />
              <img
                key={shown}
                src={shown}
                alt={tr(product.title)}
                onError={() => onImgError(shown)}
                className="absolute inset-0 h-full w-full object-contain p-3 sm:p-8"
              />
            </div>

            {/* شريط مصغّرات لتبديل الصور */}
            {hasGallery && (
              <div className="flex min-w-0 gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    aria-label={`${tr(product.title)} ${i + 1}`}
                    className={`grid aspect-square w-16 shrink-0 place-items-center overflow-hidden rounded-xl border bg-[#0d0d24] transition-all sm:w-20 ${
                      i === active ? 'border-brand-light shadow-[0_0_0_2px_rgba(149,195,255,.4)]' : 'border-white/12 hover:border-white/40'
                    }`}
                  >
                    <img src={src} alt="" onError={() => onImgError(src)} className="h-full w-full object-contain p-1" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* عمود التفاصيل */}
          <div className="min-w-0 px-6 pt-2 sm:px-0 sm:pt-0">
            {collection && (
              <Link to={`/collection/${collection.id}`} className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-light hover:text-white sm:text-sm">
                {t('ديفرا')} · {tr(collection.name)}
              </Link>
            )}
            <h1 className="font-cairo text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>{tr(product.title)}</h1>
            <p className="mt-3 max-w-md text-base text-white/80 sm:mt-4 sm:text-lg">{tr(product.tagline)}</p>

            {/* عن المنتج — بجانب الصور بعد الاسم والنوع */}
            <div className="mt-7 max-w-md border-t border-white/10 pt-6">
              <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                <span className="h-px w-6 bg-brand-light/50" />
                {t('عن المنتج')}
              </span>
              <p className="text-[15px] leading-relaxed text-white/75 sm:text-base">
                {tr(product.story || product.desc)}
              </p>
            </div>

            {/* التشطيب */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-white/60">{t('التشطيب:')}</span>
              <span className="h-8 w-8 rounded-full border-2 border-brand-light" style={{ background: finish.swatch }} />
              <span className="text-sm text-white/80">{tr(finish.name)}</span>
            </div>

            {/* أزرار */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      {/* المواصفات — على شكل ورقة مواصفات أنيقة بلا مستطيلات */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/40" />
            {t('المواصفات')}
          </span>
          <h2 className="font-cairo text-2xl font-black leading-snug text-white sm:text-3xl">
            {t('تفاصيل')} <span className="text-gradient">{t('تصنع الفرق')}</span>
          </h2>

          {/* جدول مواصفات بخطوط فاصلة رفيعة */}
          <dl className="mt-8 divide-y divide-white/[0.08]">
            {product.specs.map(([k, v], i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-white/55 sm:text-base">{tr(k)}</dt>
                <dd className="text-end font-cairo text-base font-bold text-white sm:text-lg">{tr(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
