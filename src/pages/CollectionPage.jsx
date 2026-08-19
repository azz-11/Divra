import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import { collectionOf, productsIn, PRODUCTS, FINISH } from '../productsData.js'
import { useLang } from '../i18n.jsx'
import { useQuote } from '../quote.jsx'
import Contact from '../components/Contact.jsx'
import Seo, { SITE_URL } from '../components/Seo.jsx'

// خامة المنتج من المواصفات (المفتاح العربي «الخامة»)
const materialSpec = (p) => p.specs.find((s) => s[0]?.ar === 'الخامة')?.[1]

export default function CollectionPage() {
  const { id } = useParams()
  const collection = collectionOf(id)
  const { t, tr, lp } = useLang()

  const [fSel, setFSel] = useState(() => new Set())
  const [mSel, setMSel] = useState(() => new Set())
  const [tSel, setTSel] = useState(() => new Set())

  useEffect(() => { window.scrollTo(0, 0); setFSel(new Set()); setMSel(new Set()); setTSel(new Set()) }, [id])

  const products = useMemo(() => (collection ? productsIn(id) : []), [id, collection])

  const finishOpts = useMemo(() => [...new Set(products.flatMap((p) => p.finishes))], [products])
  const materialOpts = useMemo(() => {
    const m = new Map()
    products.forEach((p) => { const v = materialSpec(p); if (v) m.set(v.ar, v) })
    return [...m.values()]
  }, [products])

  const filtered = useMemo(() => products.filter((p) => {
    const okFinish = fSel.size === 0 || p.finishes.some((f) => fSel.has(f))
    const mat = materialSpec(p)
    const okMat = mSel.size === 0 || (mat && mSel.has(mat.ar))
    return okFinish && okMat
  }), [products, fSel, mSel])

  // الأكثر رواجاً — منتجات القسم نفسه أولاً، ثم أقسام أخرى فقط إن لم تكفِ
  const popular = useMemo(() => {
    const same = productsIn(id)
    const others = PRODUCTS.filter((p) => p.collection !== id)
    return [...same, ...others].slice(0, 8)
  }, [id])

  if (!collection) return <Navigate to={lp('/collection/mixers')} replace />

  const toggle = (setter) => (key) => setter((s) => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n })
  const clearAll = () => { setFSel(new Set()); setMSel(new Set()); setTSel(new Set()) }
  const hasFilters = fSel.size || mSel.size || tSel.size

  return (
    <div className="bg-white text-[#0f1f3d]">
      <Seo title={collection.name} description={collection.intro} image={`${SITE_URL}${collection.cover}`} />
      {/* تدرّج واحد متواصل: من العنوان حتى نهاية المواصفات */}
      <div style={{ background: 'linear-gradient(180deg, #bcdcff 0%, #d6e8ff 35%, #eaf2fd 70%, #ffffff 100%)' }}>
      {/* رأس نصّي */}
      <section className="px-6 pb-12 pt-28 text-center md:pt-32">
        <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-strong">
          <span className="h-px w-8 bg-brand-strong/40" />
          {t('ديفرا')} · {t('المجموعة')}
          <span className="h-px w-8 bg-brand-strong/40" />
        </span>
        <h1 className="font-cairo text-4xl font-black text-[#0a1430] sm:text-5xl md:text-6xl">{tr(collection.name)}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#4a5a72]">{tr(collection.intro)}</p>
      </section>

      {/* لقطة واقعية 1:1 + المواصفات (مصغّرة) */}
      <section className="relative overflow-hidden px-6 py-12 md:py-16">
        <div className="relative z-10 mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="mx-auto aspect-square w-full max-w-xs overflow-hidden bg-[#0d0d24] md:max-w-none">
            <img src={collection.lifestyle || collection.cover} alt={tr(collection.name)} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
              <span className="h-px w-6 bg-brand-strong/40" />
              {t('المواصفات')}
            </span>
            <h2 className="font-cairo text-xl font-black leading-snug text-[#0a1430] sm:text-2xl">{tr(collection.name)}</h2>
            <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
              {collection.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <span className="font-cairo text-sm font-black text-brand-strong">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-[#0f1f3d]">{tr(f)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      </div>

      {/* النتائج + قائمة التصنيف */}
      <section id="collection-products" className="px-6 pb-20 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* قائمة التصنيف */}
            <aside className="rounded-2xl border border-black/10 p-5 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f1f3d]">{t('تصنيف')}</span>
                {hasFilters ? (
                  <button onClick={clearAll} className="text-xs font-bold text-brand-strong hover:underline">{t('مسح الفلاتر')}</button>
                ) : null}
              </div>

              {collection.types?.length > 0 && (
                <FilterGroup title={t('النوع')}>
                  <div className="flex flex-wrap gap-2">
                    {collection.types.map((ty) => (
                      <Pill key={ty.id} active={tSel.has(ty.id)} onClick={() => toggle(setTSel)(ty.id)}>{tr(ty.name)}</Pill>
                    ))}
                  </div>
                </FilterGroup>
              )}

              {finishOpts.length > 0 && (
                <FilterGroup title={t('اللون')}>
                  <div className="flex flex-wrap gap-2.5">
                    {finishOpts.map((f) => (
                      <button
                        key={f}
                        onClick={() => toggle(setFSel)(f)}
                        aria-label={tr(FINISH[f]?.name)}
                        title={tr(FINISH[f]?.name)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${fSel.has(f) ? 'border-brand-strong ring-2 ring-brand/30' : 'border-black/15 hover:border-brand-strong/50'}`}
                        style={{ background: FINISH[f]?.swatch }}
                      />
                    ))}
                  </div>
                </FilterGroup>
              )}

              {materialOpts.length > 0 && (
                <FilterGroup title={t('الخامة')}>
                  <div className="flex flex-col gap-2">
                    {materialOpts.map((m) => (
                      <label key={m.ar} className="flex cursor-pointer items-center gap-2 text-sm text-[#4a5a72]">
                        <input type="checkbox" checked={mSel.has(m.ar)} onChange={() => toggle(setMSel)(m.ar)} className="accent-[#2f6fd6]" />
                        {tr(m)}
                      </label>
                    ))}
                  </div>
                </FilterGroup>
              )}
            </aside>

            {/* النتائج */}
            <div>
              <div className="mb-5 flex items-baseline gap-2 border-b border-black/10 pb-3">
                <span className="font-cairo text-lg font-black">{t('النتائج')}</span>
                <span className="text-sm text-[#8894a6]">({filtered.length})</span>
              </div>

              {filtered.length === 0 ? (
                <div className="border border-black/10 bg-black/[0.02] p-10 text-center text-[#4a5a72]">
                  {t('لا نتائج مطابقة للفلاتر المختارة.')}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} p={p} tr={tr} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* اكتشف منتجات ذات صلة — الأكثر رواجاً */}
      {popular.length > 0 && (
        <section className="border-t border-black/10 bg-[#f6f8fc] px-6 py-14 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">{t('الأكثر رواجاً')}</span>
                <h2 className="mt-1 font-cairo text-2xl font-black sm:text-3xl">{t('اكتشف منتجات ذات صلة')}</h2>
              </div>
              <Link to={lp('/products')} className="shrink-0 text-sm font-bold text-brand-strong hover:underline">{t('كل المنتجات')}</Link>
            </div>
            <div className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {popular.map((p) => (
                <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
                  <ProductCard p={p} tr={tr} badge={t('رائج')} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* قسم إرشادي (نمط Kohler) */}
      <section className="bg-ink px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-cairo text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>
            {t('اعثر على الأنسب لحمّامك')}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t('استكشف الأشكال والتشطيبات وخيارات التركيب لتختار ما يُكمّل تصميم حمّامك ويرتقي بتجربتك اليومية.')}
          </p>
          <h3 className="mt-10 font-cairo text-lg font-bold text-white">{t('الأنواع وخيارات التركيب')}</h3>
          <ul className="mt-4 space-y-3">
            {collection.types?.map((ty) => (
              <li key={ty.id} className="flex items-start gap-3 text-white/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                <span className="text-[15px] sm:text-base">{tr(ty.name)}</span>
              </li>
            ))}
            {['تشطيبات متعددة: كروم، أسود، ذهبي ورمادي.', 'تركيب جداري أو على المغسلة حسب الطراز.', 'خامات نحاسية مقاومة للصدأ بضمان 5 سنوات.'].map((k) => (
              <li key={k} className="flex items-start gap-3 text-white/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                <span className="text-[15px] sm:text-base">{t(k)}</span>
              </li>
            ))}
          </ul>
          <Link to={lp('/products')} className="mt-9 inline-flex text-sm font-bold text-brand-light underline underline-offset-4 hover:text-white">
            {t('عرض المزيد')}
          </Link>
        </div>
      </section>

      {/* تواصل معنا */}
      <Contact />
    </div>
  )
}

function ProductCard({ p, tr, badge }) {
  const { t, lp } = useLang()
  const quote = useQuote()
  const [justAdded, setJustAdded] = useState(false)
  const inQuote = quote.has(p.id) || justAdded

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (quote.has(p.id)) return
    quote.add(p.id)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <Link to={lp(`/product/${p.id}`)} className="group relative flex flex-col text-start">
      <div className="relative aspect-square w-full overflow-hidden bg-[#0d0d24]">
        <img src={p.images[p.finishes[0]]} alt={tr(p.title)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && (
          <span className="absolute start-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white" style={{ insetInlineStart: '0.5rem' }}>{badge}</span>
        )}
        {/* إضافة سريعة لعرض السعر — تظهر عند التمرير، دائمة الظهور على اللمس */}
        <button
          type="button"
          onClick={quickAdd}
          aria-label={t(inQuote ? 'في قائمة عرض السعر ✓' : 'أضف إلى عرض السعر')}
          title={t(inQuote ? 'في قائمة عرض السعر ✓' : 'أضف إلى عرض السعر')}
          className={`quick-add absolute end-2 bottom-2 grid h-8 w-8 place-items-center rounded-full opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 ${
            inQuote ? 'bg-brand-strong text-white' : 'bg-white text-[#0f1f3d] hover:bg-brand-strong hover:text-white'
          }`}
          style={{ insetInlineEnd: '0.5rem' }}
        >
          {inQuote ? <Check size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
        </button>
      </div>
      <span className="mt-3 font-cairo text-sm font-bold text-[#0f1f3d] group-hover:text-brand-strong">{tr(p.title)}</span>
      <span className="mt-0.5 text-xs text-[#8894a6]">{tr(p.specs[0][1])}</span>
    </Link>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-black/10 pt-4 first:border-t-0">
      <div className="mb-3 mt-4 text-xs font-bold uppercase tracking-wider text-[#8894a6] first:mt-0">{title}</div>
      {children}
    </div>
  )
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${active ? 'border-brand-strong bg-brand/10 text-brand-strong' : 'border-black/15 text-[#4a5a72] hover:border-brand-strong/50'}`}
    >
      {children}
    </button>
  )
}
