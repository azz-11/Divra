import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import { COLLECTIONS } from '../productsData.js'
import { useLang } from '../i18n.jsx'

export default function ProductsIndex() {
  const { t, tr } = useLang()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a2e]">
      {/* خلفية فيديو لوب معتمة */}
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
        <source src="/video/story-1.webm" type="video/webm" />
        <source src="/video/story-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,3,40,.82) 0%, rgba(3,3,40,.72) 40%, rgba(3,3,40,.9) 100%)' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32">
        {/* العنوان */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-white/30" />
            {t('من عالم ديفرا')}
            <span className="h-px w-8 bg-white/30" />
          </span>
          <h1 className="font-cairo text-4xl font-black text-white sm:text-5xl md:text-6xl">{t('المنتجات')}</h1>
        </div>

        {/* شبكة الأقسام — بطاقات صور 3:4 (أصغر قليلاً) */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link key={c.id} to={`/collection/${c.id}`} className="group flex flex-col items-center">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_18px_50px_-18px_rgba(0,0,0,.7)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-brand-light/70 group-hover:shadow-[0_26px_60px_-16px_rgba(79,143,240,.55)]">
                <img
                  src={c.cover}
                  alt={tr(c.name)}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* تعتيم متدرّج أسفل + توهّج عند المرور */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                {/* أيقونة سهم */}
                <span className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all group-hover:bg-brand group-hover:text-white" style={{ insetInlineEnd: '0.75rem' }}>
                  <ArrowUpLeft size={16} strokeWidth={2.5} className="ltr:-scale-x-100" />
                </span>
              </div>
              {/* اسم القسم تحت الصورة بالخط الجديد */}
              <span className="mt-4 font-cairo text-lg font-bold text-white sm:text-xl">{tr(c.name)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
