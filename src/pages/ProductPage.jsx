import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { productOf, collectionOf, productsIn, PRODUCTS, FINISH } from '../productsData.js'
import { useLang } from '../i18n.jsx'
import { useQuote } from '../quote.jsx'

// محتوى عام للتجربة — الأبعاد ودليل العناية (يُخصّص لاحقاً لكل منتج)
const GENERAL_DIMS = [
  [{ ar: 'الأبعاد الكلية', en: 'Overall size' }, { ar: '182 × 150 × 186 مم', en: '182 × 150 × 186 mm' }],
  [{ ar: 'مدى المخرج', en: 'Spout reach' }, { ar: '146 مم', en: '146 mm' }],
  [{ ar: 'مركز التركيب', en: 'Inlet centers' }, { ar: '150 مم', en: '150 mm' }],
  [{ ar: 'الوزن الصافي', en: 'Net weight' }, { ar: '2.4 كجم', en: '2.4 kg' }],
]
const GENERAL_CARE = [
  { ar: 'امسح السطح بقطعة قماش ناعمة مبلّلة بماء فاتر بعد كل استخدام.', en: 'Wipe with a soft cloth dampened with lukewarm water after each use.' },
  { ar: 'تجنّب المنظّفات الكاشطة أو الحاوية على أحماض أو كلور.', en: 'Avoid abrasive cleaners or those containing acids or chlorine.' },
  { ar: 'جفّف التشطيب لتفادي بقع الماء والترسّبات الجيرية.', en: 'Dry the finish to prevent water spots and limescale.' },
  { ar: 'استخدم الماء والصابون المعتدل فقط للحفاظ على اللمعان.', en: 'Use only mild soap and water to keep the shine.' },
]

export default function ProductPage({ reduced }) {
  const { id } = useParams()
  const product = productOf(id)
  const { t, tr } = useLang()
  const quote = useQuote()

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
  const [tab, setTab] = useState('specs')

  useEffect(() => { setImages(initial); setActive(0); setTab('specs'); window.scrollTo(0, 0) }, [initial, id])

  // منتجات مشابهة: نفس القسم أولاً ثم البقية
  const related = useMemo(() => {
    if (!product) return []
    const same = productsIn(product.collection).filter((p) => p.id !== product.id)
    const others = PRODUCTS.filter((p) => p.collection !== product.collection && p.id !== product.id)
    return [...same, ...others].slice(0, 10)
  }, [product])

  if (!product) return <Navigate to="/products" replace />

  const collection = collectionOf(product.collection)
  const accent = collection?.accent || '#2f6fd6'
  const finish = FINISH[product.finishes[0]]
  const TABS = [
    { id: 'specs', label: 'المواصفات' },
    { id: 'dims', label: 'الأبعاد' },
    { id: 'care', label: 'دليل التنظيف والصيانة' },
  ]

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
    <div className="relative overflow-x-hidden bg-white text-[#0f1f3d]">
      {/* بطل صفحة المنتج — صورة كبيرة عمودية + مصغّرات عمودية + تفاصيل */}
      <section className="relative pt-24 sm:pt-28">
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* عمود الصور: مصغّرات عمودية محاذية للشعار + صورة كبيرة بلا إطار */}
            <div className="flex min-w-0 gap-3 sm:gap-4">
              {hasGallery && (
                <div className="flex w-16 shrink-0 flex-col gap-3 sm:w-[88px]">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActive(i)}
                      aria-label={`${tr(product.title)} ${i + 1}`}
                      className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg border transition-all ${
                        i === active ? 'border-brand-strong shadow-[0_0_0_2px_rgba(47,111,214,.25)]' : 'border-black/10 hover:border-brand-strong/50'
                      }`}
                    >
                      <img src={src} alt="" onError={() => onImgError(src)} className="absolute inset-0 h-full w-full bg-white object-contain p-1" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              {/* الصورة الكبيرة 3:4 — المنتج كاملاً دون اقتصاص */}
              <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-white">
                <img
                  key={shown}
                  src={shown}
                  alt={tr(product.title)}
                  onError={() => onImgError(shown)}
                  className="block aspect-[3/4] w-full object-contain p-4 sm:p-6"
                />
              </div>
            </div>

            {/* عمود التفاصيل — محاذٍ لعلامة البحث */}
            <div className="min-w-0">
              {collection && (
                <Link to={`/collection/${collection.id}`} className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-strong hover:text-[#0f1f3d] sm:text-sm">
                  {t('ديفرا')} · {tr(collection.name)}
                </Link>
              )}
              <h1 className="font-cairo text-3xl font-black leading-tight text-[#0f1f3d] sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>{tr(product.title)}</h1>
              <p className="mt-3 text-base text-[#4a5a72] sm:mt-4 sm:text-lg">{tr(product.tagline)}</p>

              {/* عن المنتج */}
              <div className="mt-7 border-t border-black/[0.08] pt-6">
                <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
                  <span className="h-px w-6 bg-brand-strong/40" />
                  {t('عن المنتج')}
                </span>
                <p className="text-[15px] leading-relaxed text-[#4a5a72] sm:text-base">
                  {tr(product.story || product.desc)}
                </p>
              </div>

              {/* التشطيب */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-[#8894a6]">{t('التشطيب:')}</span>
                <span className="h-8 w-8 rounded-full border-2 border-brand-strong" style={{ background: finish.swatch }} />
                <span className="text-sm text-[#4a5a72]">{tr(finish.name)}</span>
              </div>

              {/* أزرار — إضافة المنتج لقائمة عرض السعر */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => quote.add(product.id)}
                  disabled={quote.has(product.id)}
                  className={`btn w-full sm:w-auto ${quote.has(product.id) ? 'cursor-default border border-brand-strong/30 bg-brand/10 text-brand-strong' : 'btn-primary'}`}
                >
                  {quote.has(product.id) ? t('في قائمة عرض السعر ✓') : t('أضف إلى عرض السعر')}
                </button>
                <Link to="/quote" className="btn w-full border border-black/15 bg-black/[0.03] text-[#0f1f3d] hover:bg-black/[0.06] sm:w-auto">
                  {t('اطلب عرض سعر')}{quote.count ? ` (${quote.count})` : ''}
                </Link>
              </div>

              {/* المواصفات / الأبعاد / دليل التنظيف — تحت معلومات المنتج */}
              <div className="mt-10 border-t border-black/[0.08] pt-8">
                <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3 border-b border-black/[0.08]">
                  {TABS.map((tb) => (
                    <button
                      key={tb.id}
                      onClick={() => setTab(tb.id)}
                      className={`-mb-px border-b-2 pb-3 font-cairo text-sm font-bold transition-colors ${
                        tab === tb.id ? 'border-brand-strong text-[#0f1f3d]' : 'border-transparent text-[#8894a6] hover:text-[#4a5a72]'
                      }`}
                    >
                      {t(tb.label)}
                    </button>
                  ))}
                </div>

                {tab === 'specs' && (
                  <dl className="divide-y divide-black/[0.08]">
                    {product.specs.map(([k, v], i) => (
                      <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                        <dt className="text-sm text-[#8894a6]">{tr(k)}</dt>
                        <dd className="text-end font-cairo text-base font-bold text-[#0f1f3d]">{tr(v)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {tab === 'dims' && (
                  <dl className="divide-y divide-black/[0.08]">
                    {GENERAL_DIMS.map(([k, v], i) => (
                      <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                        <dt className="text-sm text-[#8894a6]">{tr(k)}</dt>
                        <dd dir="ltr" className="text-end font-cairo text-base font-bold text-[#0f1f3d]">{tr(v)}</dd>
                      </div>
                    ))}
                    <p className="pt-4 text-xs text-[#8894a6]">* {t('قريباً')} — {t('الأبعاد')}</p>
                  </dl>
                )}

                {tab === 'care' && (
                  <ul className="space-y-4">
                    {GENERAL_CARE.map((c, i) => (
                      <li key={i} className="flex gap-3 text-[#4a5a72]">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 font-cairo text-xs font-black text-brand-strong">{i + 1}</span>
                        <span className="text-[15px] leading-relaxed sm:text-base">{tr(c)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* أكمل تصميمك — قطع تُكمّل المنتج (بالكحلي، صور كبيرة محاذية للطرفين) */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-ink py-16 md:py-20">
          {/* زخرفة ديفرا الرسمية — علامة مائية خفيفة داخل البار الكحلي فقط */}
          <div
            className={`pointer-events-none absolute inset-0 ${reduced ? '' : 'divra-drift'}`}
            style={{
              backgroundImage: 'url(/pattern-wave-light.webp)',
              backgroundRepeat: 'repeat',
              backgroundSize: '760px auto',
              opacity: 0.07,
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-cairo text-2xl font-black text-white sm:text-3xl">{t('أكمل تصميمك')}</h2>
                <p className="mt-2 text-sm text-white/60">{t('قطعٌ مختارة تُكمّل هذه القطعة بانسجام تامّ.')}</p>
              </div>
              <Link to="/products" className="shrink-0 text-sm font-bold text-brand-light hover:text-white">{t('كل المنتجات')}</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {related.slice(0, 4).map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white">
                    <img src={p.images[p.finishes[0]]} alt={tr(p.title)} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-3 font-cairo text-sm font-bold text-white sm:text-base">{tr(p.title)}</div>
                  <div className="mt-0.5 text-xs text-brand-light">{tr(collectionOf(p.collection)?.name)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* أكمل المجموعة — صورة كبيرة محاذية للطرفين بجانب النص */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          {/* الصورة كبيرة تملأ عمودها */}
          <div className="overflow-hidden rounded-3xl shadow-[0_28px_70px_-24px_rgba(15,31,61,.35)]">
            <img src="/products/collection-bath.webp" alt="" loading="lazy" className="block aspect-[4/5] w-full object-cover" />
          </div>
          {/* النص */}
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-strong">
              <span className="h-px w-8 bg-brand-strong/40" />
              {t('من عالم ديفرا')}
            </span>
            <h2 className="font-cairo text-3xl font-black leading-tight text-[#0f1f3d] sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>
              {t('أكمِل حمّامك بلمسة ديفرا')}
            </h2>
            <p className="mt-5 max-w-md text-base text-[#4a5a72] sm:text-lg">
              {t('من الخلّاط إلى الكرسي والشطّاف — اقتنِ المجموعة كاملةً بانسجام تامّ في التصميم والتشطيب.')}
            </p>
            <Link to="/products" className="btn btn-primary mt-8 inline-flex">
              {t('استكشف المجموعة الكاملة')}
            </Link>
          </div>
        </div>
      </section>

      {/* تواصل مع خبرائنا */}
      <section className="relative overflow-hidden border-t border-black/[0.06] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-cairo text-2xl font-black text-[#0f1f3d] sm:text-3xl">{t('تحتاج مزيداً من التفاصيل؟')}</h2>
          <p className="mx-auto mt-3 max-w-md text-[#4a5a72]">{t('نحن هنا لمساعدتك في اختيار القطع المناسبة لمساحتك.')}</p>
          <a href="https://wa.me/966566906123" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-7 inline-flex">
            {t('تواصل مع خبرائنا')}
          </a>
        </div>
      </section>
    </div>
  )
}
