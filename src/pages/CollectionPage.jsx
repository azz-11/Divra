import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { collectionOf, productsIn, FINISH } from '../productsData.js'
import { useLang } from '../i18n.jsx'

// خامة المنتج من المواصفات (المفتاح العربي «الخامة»)
const materialSpec = (p) => p.specs.find((s) => s[0]?.ar === 'الخامة')?.[1]

export default function CollectionPage() {
  const { id } = useParams()
  const collection = collectionOf(id)
  const { t, tr } = useLang()

  const [fSel, setFSel] = useState(() => new Set())   // التشطيب/اللون
  const [mSel, setMSel] = useState(() => new Set())   // الخامة
  const [tSel, setTSel] = useState(() => new Set())   // النوع (placeholder حتى وسم المنتجات)

  useEffect(() => { window.scrollTo(0, 0); setFSel(new Set()); setMSel(new Set()); setTSel(new Set()) }, [id])

  const products = useMemo(() => (collection ? productsIn(id) : []), [id, collection])

  // خيارات الفلاتر المشتقّة من المنتجات
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

  if (!collection) return <Navigate to="/collection/mixers" replace />

  const accent = collection.accent
  const toggle = (setter) => (key) => setter((s) => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n })
  const clearAll = () => { setFSel(new Set()); setMSel(new Set()); setTSel(new Set()) }
  const hasFilters = fSel.size || mSel.size || tSel.size

  return (
    <div className="bg-surface">
      {/* رأس نصّي — بلا صورة كبيرة */}
      <section className="border-b border-line px-6 pb-10 pt-28 text-center md:pt-32">
        <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-strong">
          <span className="h-px w-8 bg-brand-strong/40" />
          {t('ديفرا')} · {t('المجموعة')}
          <span className="h-px w-8 bg-brand-strong/40" />
        </span>
        <h1 className="font-cairo text-4xl font-black sm:text-5xl md:text-6xl">{tr(collection.name)}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-text-dim">{tr(collection.intro)}</p>
      </section>

      {/* لقطة واقعية 1:1 + المواصفات */}
      <section className="bg-white px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="aspect-square w-full overflow-hidden bg-[#0d0d24]">
            <img src={collection.lifestyle || collection.cover} alt={tr(collection.name)} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
              <span className="h-px w-6 bg-brand-strong/40" />
              {t('المواصفات')}
            </span>
            <h2 className="font-cairo text-2xl font-black leading-snug sm:text-3xl">{tr(collection.name)}</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {collection.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 py-3.5">
                  <span className="font-cairo text-sm font-black text-brand-strong">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] text-text">{tr(f)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* الأنواع */}
      {collection.types?.length > 0 && (
        <section className="px-6 py-12 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-strong">{t('الأنواع')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {collection.types.map((ty) => (
                <a key={ty.id} href="#collection-products" className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink">
                    <img src={ty.image || collection.cover} alt={tr(ty.name)} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
                    <span className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,3,40,.1) 0%, rgba(3,3,40,.55) 100%)' }} />
                    <span className="absolute inset-x-0 bottom-0 p-4 text-center font-cairo text-base font-bold text-white sm:text-lg">{tr(ty.name)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* النتائج + قائمة التصنيف */}
      <section id="collection-products" className="bg-white px-6 pb-20 pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* قائمة التصنيف (بنود) */}
            <aside className="rounded-2xl border border-line p-5 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-text">{t('تصنيف')}</span>
                {hasFilters ? (
                  <button onClick={clearAll} className="text-xs font-bold text-brand-strong hover:underline">{t('مسح الفلاتر')}</button>
                ) : null}
              </div>

              {/* النوع */}
              {collection.types?.length > 0 && (
                <FilterGroup title={t('النوع')}>
                  <div className="flex flex-wrap gap-2">
                    {collection.types.map((ty) => (
                      <Pill key={ty.id} active={tSel.has(ty.id)} onClick={() => toggle(setTSel)(ty.id)}>{tr(ty.name)}</Pill>
                    ))}
                  </div>
                </FilterGroup>
              )}

              {/* اللون / التشطيب */}
              {finishOpts.length > 0 && (
                <FilterGroup title={t('اللون')}>
                  <div className="flex flex-wrap gap-2.5">
                    {finishOpts.map((f) => (
                      <button
                        key={f}
                        onClick={() => toggle(setFSel)(f)}
                        aria-label={tr(FINISH[f]?.name)}
                        title={tr(FINISH[f]?.name)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${fSel.has(f) ? 'border-brand-strong ring-2 ring-brand/30' : 'border-line hover:border-brand-strong/50'}`}
                        style={{ background: FINISH[f]?.swatch }}
                      />
                    ))}
                  </div>
                </FilterGroup>
              )}

              {/* الخامة */}
              {materialOpts.length > 0 && (
                <FilterGroup title={t('الخامة')}>
                  <div className="flex flex-col gap-2">
                    {materialOpts.map((m) => (
                      <label key={m.ar} className="flex cursor-pointer items-center gap-2 text-sm text-text-dim">
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
              <div className="mb-5 flex items-baseline gap-2 border-b border-line pb-3">
                <span className="font-cairo text-lg font-black">{t('النتائج')}</span>
                <span className="text-sm text-text-dimmer">({filtered.length})</span>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-line bg-white/60 p-10 text-center text-text-dim">
                  {t('لا نتائج مطابقة للفلاتر المختارة.')}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} className="group flex flex-col text-start">
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0d0d24]">
                        <img src={p.images[p.finishes[0]]} alt={tr(p.title)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <span className="mt-3 font-cairo text-sm font-bold text-text group-hover:text-brand-strong">{tr(p.title)}</span>
                      <span className="mt-0.5 text-xs text-text-dimmer">{tr(p.specs[0][1])}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* رجوع */}
          <div className="mt-14 text-center">
            <Link to="/products" className="btn btn-ghost">{t('كل الأقسام')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-line pt-4 first:border-t-0">
      <div className="mb-3 mt-4 text-xs font-bold uppercase tracking-wider text-text-dimmer first:mt-0">{title}</div>
      {children}
    </div>
  )
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${active ? 'border-brand-strong bg-brand/10 text-brand-strong' : 'border-line text-text-dim hover:border-brand-strong/50'}`}
    >
      {children}
    </button>
  )
}
