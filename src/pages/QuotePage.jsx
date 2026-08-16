import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { collectionOf, FINISH } from '../productsData.js'
import { useQuote } from '../quote.jsx'
import { useLang } from '../i18n.jsx'

const PHONE = '966566906123'

export default function QuotePage() {
  const { items, remove, inc, dec, clear } = useQuote()
  const { t, tr, lang } = useLang()
  const [busy, setBusy] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // نصّ واتساب (يُرفق ملف الطلب PDF يدوياً بعد تنزيله)
  const waUrl = () => {
    const lines = items.map(({ product: p, qty }, i) => {
      const fin = FINISH[p.finishes[0]]
      return `${i + 1}. ${tr(p.title)}${fin ? ` — ${tr(fin.name)}` : ''} × ${qty}`
    })
    const msg = `${t('مرحباً، أرغب بعرض سعر للمنتجات التالية:')}\n${lines.join('\n')}\n\n${t('(مرفق ملف الطلب PDF)')}`
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
  }

  // ينشئ ملف PDF لطلب الشراء ثم يفتح واتساب لإرفاقه
  const sendOrder = async () => {
    if (busy || !items.length) return
    setBusy(true)
    try {
      const { generateOrderPdf } = await import('../orderPdf.js')
      await generateOrderPdf(items, { tr, lang })
      window.open(waUrl(), '_blank', 'noopener,noreferrer')
    } finally {
      setBusy(false)
    }
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
              {items.map(({ product: p, qty }) => (
                <li key={p.id} className="flex items-center gap-4 p-4">
                  <Link to={`/product/${p.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0d0d24]">
                    <img src={p.images[p.finishes[0]]} alt={tr(p.title)} className="absolute inset-0 h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${p.id}`} className="font-cairo text-base font-bold text-white hover:text-brand-light">{tr(p.title)}</Link>
                    <div className="mt-0.5 text-xs text-brand-light">{tr(collectionOf(p.collection)?.name)}</div>
                    <div className="mt-0.5 text-xs text-white/50">{tr(FINISH[p.finishes[0]]?.name)}</div>
                    {/* عدّاد الكمية */}
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-white/15 px-1.5 py-1">
                      <button onClick={() => dec(p.id)} aria-label="-" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="min-w-5 text-center font-cairo text-sm font-bold text-white">{qty}</span>
                      <button onClick={() => inc(p.id)} aria-label="+" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(p.id)}
                    aria-label={t('إزالة')}
                    className="grid h-9 w-9 shrink-0 place-items-center self-start rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <X size={16} strokeWidth={2.25} />
                  </button>
                </li>
              ))}
            </ul>

            {/* إجراءات */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <button onClick={sendOrder} disabled={busy} className="btn btn-primary w-full max-w-sm disabled:opacity-60">
                {busy ? t('يتم إنشاء الملف…') : t('أنشئ طلب الشراء وأرسله عبر واتساب')}
              </button>
              <p className="max-w-sm text-center text-xs text-white/45">{t('سيُنزَّل ملف الطلب PDF ثم يفتح واتساب لإرفاقه.')}</p>
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
