import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import { useLang } from '../i18n.jsx'

export default function ProductGridReveal({ products, accent = '#2f6fd6' }) {
  const { tr } = useLang()

  return (
    <div id="product-grid" className="mx-auto grid max-w-7xl scroll-mt-24 grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <Link
          key={p.id}
          to={`/product/${p.id}`}
          className="group relative flex flex-col rounded-xl2 border border-white/10 bg-white/[0.06] p-4 text-start transition-all hover:-translate-y-1 hover:border-brand-light hover:shadow-xl"
        >
          <div className="relative mb-3 aspect-square w-full">
            <span className="absolute inset-0 m-auto h-4/5 w-4/5 rounded-full blur-2xl" style={{ background: `radial-gradient(circle, ${accent}22, transparent 65%)` }} />
            <img src={p.images[p.finishes[0]]} alt={tr(p.title)} loading="lazy" className="relative h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105" />
          </div>
          <span className="font-cairo text-sm font-bold text-white sm:text-base">{tr(p.title)}</span>
          <span className="mt-1 text-xs text-brand-light">{tr(p.specs[0][1])}</span>
          <span className="absolute end-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white transition-all group-hover:bg-brand group-hover:text-white" style={{ insetInlineEnd: '0.75rem' }}>
            <ArrowUpLeft size={15} strokeWidth={2.5} className="ltr:-scale-x-100" />
          </span>
        </Link>
      ))}
    </div>
  )
}
