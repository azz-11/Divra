import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import { collectionOf } from '../productsData.js'
import { useLang } from '../i18n.jsx'

// قسمان من المنتجات كصورتين أنيقتين تقودان لصفحتيهما
export default function CollectionDuo({ ids = [] }) {
  const { tr } = useLang()
  const cols = ids.map(collectionOf).filter(Boolean)
  if (!cols.length) return null

  return (
    <section className="w-full bg-white py-14 sm:py-16">
      {/* هوامش جانبية أوسع من الأطراف، وفجوة أصغر بين الصور */}
      <div className="grid w-full grid-cols-1 gap-6 px-12 sm:grid-cols-2 sm:px-24 lg:px-40">
        {cols.map((c, i) => (
          <Link key={i} to={`/collection/${c.id}`} className="group relative block aspect-[4/3] overflow-hidden">
            <img
              src={c.cover}
              alt={tr(c.name)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,3,40,.05) 0%, rgba(3,3,40,.15) 45%, rgba(3,3,40,.72) 100%)' }} />
            {/* الاسم */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 sm:p-7">
              <h3 className="font-cairo text-2xl font-black text-white drop-shadow sm:text-3xl">{tr(c.name)}</h3>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all group-hover:bg-brand group-hover:text-white">
                <ArrowUpLeft size={18} strokeWidth={2.5} className="ltr:-scale-x-100" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
