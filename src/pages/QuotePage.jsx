import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { collectionOf, FINISH } from '../productsData.js'
import { useQuote } from '../quote.jsx'
import { useLang } from '../i18n.jsx'

const PHONE = '966566906123'

export default function QuotePage() {
  const { items, remove, clear } = useQuote()
  const { t, tr } = useLang()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // رسالة واتساب تتضمّن المنتجات المختارة
  const waHref = () => {
    const lines = items.map((p, i) => {
      const fin = FINISH[p.finishes[0]]
      return `${i + 1}. ${tr(p.title)}${fin ? ` — ${tr(fin.name)}` : ''}`
    })
    const msg = `${t('مرحباً، أرغب بعرض سعر للمنتجات التالية:')}\n${lines.join('\n')}`
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="min-h-screen bg-ink pt-24 sm:pt-28">
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/40" />
            {t('ديفرا')}
            <span className="h-px w-8 bg-brand-light/40" />
          </span>
          <h1 className="font-cairo text-3xl font-black text-white sm:text-4xl md:text-5xl">{t('اطلب عرض سعر')}</h1>
          {items.length > 0 && (
            <p className="mt-3 text-white/70">{items.length} {t('عناصر')}</p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="font-cairo text-xl font-bold text-white">{t('قائمة عرض السعر فارغة')}</p>
            <p className="mt-2 text-white/65">{t('تصفّح المنتجات وأضف ما يناسبك للاستفسار عنه دفعةً واحدة.')}</p>
            <Link to="/products" className="btn btn-primary mt-7 inline-flex">{t('تصفّح المنتجات')}</Link>
          </div>
        ) : (
          <>
            {/* قائمة المنتجات المختارة */}
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              {items.map((p) => (
                <li key={p.id} className="flex items-center gap-4 p-4">
                  <Link to={`/product/${p.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0d0d24]">
                    <img src={p.images[p.finishes[0]]} alt={tr(p.title)} className="absolute inset-0 h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${p.id}`} className="font-cairo text-base font-bold text-white hover:text-brand-light">{tr(p.title)}</Link>
                    <div className="mt-0.5 text-xs text-brand-light">{tr(collectionOf(p.collection)?.name)}</div>
                    <div className="mt-0.5 text-xs text-white/50">{tr(FINISH[p.finishes[0]]?.name)}</div>
                  </div>
                  <button
                    onClick={() => remove(p.id)}
                    aria-label={t('إزالة')}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <X size={16} strokeWidth={2.25} />
                  </button>
                </li>
              ))}
            </ul>

            {/* إجراءات */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <a href={waHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full max-w-sm">
                {t('أرسل الاستفسار عبر واتساب')}
              </a>
              <div className="flex items-center gap-5 text-sm">
                <Link to="/products" className="font-bold text-brand-light hover:text-white">{t('تصفّح المزيد')}</Link>
                <button onClick={clear} className="text-white/50 hover:text-white/80">{t('تفريغ القائمة')}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
