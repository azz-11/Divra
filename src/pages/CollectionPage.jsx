import { useEffect } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import ProductRow from '../components/ProductRow.jsx'
import ProductBackground from '../components/ProductBackground.jsx'
import { COLLECTIONS, collectionOf, productsIn } from '../productsData.js'
import { useLang } from '../i18n.jsx'

export default function CollectionPage({ reduced }) {
  const { id } = useParams()
  const { hash } = useLocation()
  const collection = collectionOf(id)
  const { t, tr } = useLang()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) return setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    }
    window.scrollTo(0, 0)
  }, [id, hash])

  if (!collection) return <Navigate to="/collection/mixers" replace />

  const products = productsIn(id)

  return (
    <div className="pt-20">
      {/* رأس القسم */}
      <header className="relative overflow-hidden py-20 text-center">
        <ProductBackground variant={collection.bg} accent={collection.accent} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mb-4 inline-block rounded-full border border-line bg-brand/10 px-4 py-1.5 text-sm" style={{ color: collection.accent }}>
            {t('المجموعة')}
          </span>
          <h1 className="font-cairo text-4xl font-black sm:text-5xl md:text-6xl">{tr(collection.name)}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-dim">{tr(collection.intro)}</p>
        </div>
      </header>

      {/* أشرطة تنقّل بين الأقسام */}
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.id}
            to={`/collection/${c.id}`}
            className={`btn text-sm ${c.id === id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tr(c.short)}
          </Link>
        ))}
      </div>

      {/* المنتجات */}
      <div className="mx-auto max-w-7xl px-6">
        {products.length > 0 ? (
          <div className="divide-y divide-line">
            {products.map((p, i) => (
              <ProductRow key={p.id} product={p} index={i} accent={collection.accent} reduced={reduced} />
            ))}
          </div>
        ) : (
          <div className="glass mx-auto my-16 max-w-xl rounded-xl2 p-10 text-center">
            <p className="font-cairo text-xl font-bold text-brand-strong">{t('قريباً')}</p>
            <p className="mt-2 text-text-dim">
              {t('منتجات قسم')} «{tr(collection.name)}» {t('في طريقها إليك — تابعنا لأحدث الإضافات.')}
            </p>
          </div>
        )}
      </div>

      {/* رجوع للرئيسية */}
      <div className="pb-24 text-center">
        <Link to="/" className="btn btn-ghost">{t('العودة للرئيسية')}</Link>
      </div>
    </div>
  )
}
