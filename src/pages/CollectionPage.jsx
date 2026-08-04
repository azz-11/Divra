import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ProductGridReveal from '../components/ProductGridReveal.jsx'
import { collectionOf, productsIn } from '../productsData.js'
import { useLang } from '../i18n.jsx'

export default function CollectionPage({ reduced }) {
  const { id } = useParams()
  const collection = collectionOf(id)
  const { t, tr } = useLang()

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!collection) return <Navigate to="/collection/mixers" replace />

  const products = productsIn(id)

  return (
    <div>
      {/* هيرو القسم — صورة القسم الأساسية بملء الشاشة */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <img
          src={collection.cover}
          alt={tr(collection.name)}
          className={`absolute inset-0 h-full w-full object-cover ${reduced ? '' : 'kenburns'}`}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(3,3,40,.6) 0%, rgba(3,3,40,.35) 40%, rgba(3,3,40,.85) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 text-center">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-white/30" />
            {t('ديفرا')} · {t('المجموعة')}
            <span className="h-px w-8 bg-white/30" />
          </span>
          <h1 className="font-cairo text-5xl font-black text-white sm:text-6xl md:text-7xl">{tr(collection.name)}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85 sm:text-xl">{tr(collection.intro)}</p>
        </div>
        {/* مؤشّر تمرير */}
        <a href="#collection-body" className="absolute inset-inline-0 bottom-8 z-10 mx-auto flex w-full flex-col items-center gap-2 text-white/70" style={{ insetInline: 0 }} aria-label={t('مرّر للأسفل')}>
          <span className="text-xs">{t('مرّر للأسفل')}</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </a>
      </section>

      {/* وصف فاخر للقسم */}
      <section id="collection-body" className="relative overflow-hidden bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-cairo text-3xl font-black leading-snug sm:text-4xl">
            {t('عن')} <span className="text-gradient">{tr(collection.name)}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-text-dim">{tr(collection.intro)}</p>

          {/* المميزات */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {collection.features.map((f, i) => (
              <div key={i} className="glass rounded-xl2 p-6 text-center">
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand/12 font-cairo text-lg font-black text-brand-strong">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="font-cairo font-bold text-text">{tr(f)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* منتجات القسم */}
      <section className="bg-ink pb-8 pt-4">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-strong">{t('منتجات القسم')}</span>
        </div>
        {products.length > 0 ? (
          <ProductGridReveal products={products} accent={collection.accent} reduced={reduced} />
        ) : (
          <div className="glass mx-auto my-16 max-w-xl rounded-xl2 p-10 text-center">
            <p className="font-cairo text-xl font-bold text-brand-strong">{t('قريباً')}</p>
            <p className="mt-2 text-text-dim">
              {t('منتجات قسم')} «{tr(collection.name)}» {t('في طريقها إليك — تابعنا لأحدث الإضافات.')}
            </p>
          </div>
        )}
      </section>

      {/* رجوع */}
      <div className="bg-ink pb-20 text-center">
        <Link to="/products" className="btn btn-ghost">{t('كل الأقسام')}</Link>
      </div>
    </div>
  )
}
