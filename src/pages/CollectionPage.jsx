import { useEffect } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import ProductRow from '../components/ProductRow.jsx'
import ProductBackground from '../components/ProductBackground.jsx'
import { COLLECTIONS, collectionOf, productsIn } from '../productsData.js'

export default function CollectionPage({ reduced }) {
  const { id } = useParams()
  const { hash } = useLocation()
  const collection = collectionOf(id)

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) return setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    }
    window.scrollTo(0, 0)
  }, [id, hash])

  if (!collection) return <Navigate to="/collection/kitchen" replace />

  const products = productsIn(id)

  return (
    <div className="pt-20">
      {/* رأس القسم */}
      <header className="relative overflow-hidden py-20 text-center">
        <ProductBackground variant={collection.bg} accent={collection.accent} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mb-4 inline-block rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm" style={{ color: collection.accent }}>
            المجموعة
          </span>
          <h1 className="font-cairo text-4xl font-black sm:text-5xl md:text-6xl">{collection.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-dim">{collection.intro}</p>
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
            {c.short}
          </Link>
        ))}
      </div>

      {/* المنتجات */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="divide-y divide-line">
          {products.map((p, i) => (
            <ProductRow key={p.id} product={p} index={i} accent={collection.accent} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* رجوع للرئيسية */}
      <div className="pb-24 text-center">
        <Link to="/" className="btn btn-ghost">العودة للرئيسية</Link>
      </div>
    </div>
  )
}
