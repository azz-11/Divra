import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { collectionOf, FINISH } from '../productsData.js'
import { useQuote } from '../quote.jsx'
import { useLang } from '../i18n.jsx'
import Seo from '../components/Seo.jsx'

const EMAIL = 'y.wazan@almakarem.com.sa'

// تفادي حقن HTML عبر حقول العميل النصية قبل تضمينها في ملخّص البريد
const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// عدد العناصر بصيغة عربية سليمة (مفرد/مثنى/جمع) أو إنجليزية (مفرد/جمع)
function itemsCountLabel(n, lang) {
  if (lang === 'ar') {
    if (n === 1) return 'عنصر واحد'
    if (n === 2) return 'عنصران'
    return `${n} عناصر`
  }
  return n === 1 ? '1 item' : `${n} items`
}

export default function QuotePage() {
  const { items, remove, inc, dec, clear } = useQuote()
  const { t, tr, lang, dir, lp } = useLang()
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null) // 'sent' | 'fallback' | null
  const [form, setForm] = useState({ name: '', phone: '', city: '', email: '', notes: '' })
  const [touched, setTouched] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const isValid = Boolean(form.name.trim() && form.phone.trim() && form.city.trim())

  const customerLines = () => {
    const lines = [
      `${t('الاسم')}: ${form.name}`,
      `${t('الهاتف')}: ${form.phone}`,
      `${t('المدينة')}: ${form.city}`,
    ]
    if (form.email) lines.push(`${t('البريد الإلكتروني')}: ${form.email}`)
    if (form.notes) lines.push(`${t('ملاحظات')}: ${form.notes}`)
    return lines
  }

  const orderLines = () =>
    items.map(({ product: p, qty }, i) => {
      const fin = FINISH[p.finishes[0]]
      return `${i + 1}. ${tr(p.title)}${fin ? ` — ${tr(fin.name)}` : ''} × ${qty}`
    })

  const summaryHtml = () => {
    const customerRows = [
      [t('الاسم'), form.name],
      [t('الهاتف'), form.phone],
      [t('المدينة'), form.city],
      ...(form.email ? [[t('البريد الإلكتروني'), form.email]] : []),
      ...(form.notes ? [[t('ملاحظات'), form.notes]] : []),
    ]
      .map(([k, v]) => `<p style="font-family:sans-serif;font-size:14px;margin:2px 0"><b>${escapeHtml(k)}:</b> ${escapeHtml(v)}</p>`)
      .join('')

    return `<h2 style="font-family:sans-serif">طلب عرض سعر جديد — Divra</h2>${customerRows}<ol style="font-family:sans-serif;font-size:14px">${items
      .map(({ product: p, qty }) => {
        const fin = FINISH[p.finishes[0]]
        return `<li>${tr(p.title)}${fin ? ` — ${tr(fin.name)}` : ''} × <b>${qty}</b></li>`
      })
      .join('')}</ol>`
  }

  // ينشئ PDF ويرسله بالبريد كمرفق عبر الخادم؛ وإن تعذّر يرجع لتنزيله + فتح البريد
  const sendOrder = async () => {
    setTouched(true)
    if (busy || !items.length || !isValid) return
    setBusy(true)
    setStatus(null)
    try {
      const { generateOrderPdf } = await import('../orderPdf.js')
      const { base64, filename } = await generateOrderPdf(items, { tr, lang, customer: form })
      let ok = false
      try {
        const r = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfBase64: base64, filename, summaryHtml: summaryHtml(), subject: 'طلب عرض سعر جديد — Divra' }),
        })
        ok = r.ok
      } catch { ok = false }

      if (ok) {
        setStatus('sent')
      } else {
        // احتياطي: نزّل الملف وافتح تطبيق البريد لإرفاقه يدوياً
        await generateOrderPdf(items, { tr, lang, download: true, customer: form })
        const body = encodeURIComponent(
          `${t('مرحباً، أرغب بعرض سعر للمنتجات التالية:')}\n${orderLines().join('\n')}\n\n${customerLines().join('\n')}\n\n${t('(مرفق ملف الطلب PDF)')}`,
        )
        window.open(`mailto:${EMAIL}?subject=${encodeURIComponent('طلب عرض سعر — Divra')}&body=${body}`, '_blank')
        setStatus('fallback')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink pt-24 sm:pt-28">
      <Seo
        title={{ ar: 'اطلب عرض سعر', en: 'Request a quote' }}
        description={{
          ar: 'أرسل قائمة المنتجات التي تهمّك من ديفرا واحصل على عرض سعر مخصّص لمشروعك.',
          en: 'Send the Divra products you’re interested in and get a tailored quote for your project.',
        }}
        noindex
      />
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/40" />
            {t('ديفرا')}
            <span className="h-px w-8 bg-brand-light/40" />
          </span>
          <h1 className="font-cairo text-3xl font-black text-white sm:text-4xl md:text-5xl">{t('اطلب عرض سعر')}</h1>
          {items.length > 0 && (
            <p className="mt-3 text-white/70">{itemsCountLabel(items.length, lang)}</p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="font-cairo text-xl font-bold text-white">{t('قائمة عرض السعر فارغة')}</p>
            <p className="mt-2 text-white/65">{t('تصفّح المنتجات وأضف ما يناسبك للاستفسار عنه دفعةً واحدة.')}</p>
            <Link to={lp('/products')} className="btn btn-primary mt-7 inline-flex">{t('تصفّح المنتجات')}</Link>
          </div>
        ) : (
          <>
            {/* قائمة المنتجات المختارة */}
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              {items.map(({ product: p, qty }) => (
                <li key={p.id} className="flex items-center gap-4 p-4">
                  <Link to={lp(`/product/${p.id}`)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0d0d24]">
                    <img src={p.images[p.finishes[0]]} alt={tr(p.title)} className="absolute inset-0 h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={lp(`/product/${p.id}`)} className="font-cairo text-base font-bold text-white hover:text-brand-light">{tr(p.title)}</Link>
                    <div className="mt-0.5 text-xs text-brand-light">{tr(collectionOf(p.collection)?.name)}</div>
                    <div className="mt-0.5 text-xs text-white/50">{tr(FINISH[p.finishes[0]]?.name)}</div>
                    {/* عدّاد الكمية — زر الزيادة على اليمين دائماً بصرياً (مطابق للـLTR والـRTL معاً) */}
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-white/15 px-1.5 py-1">
                      {dir === 'rtl' ? (
                        <>
                          <button onClick={() => inc(p.id)} aria-label="+" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="min-w-5 text-center font-cairo text-sm font-bold text-white">{qty}</span>
                          <button onClick={() => dec(p.id)} aria-label="-" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => dec(p.id)} aria-label="-" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="min-w-5 text-center font-cairo text-sm font-bold text-white">{qty}</span>
                          <button onClick={() => inc(p.id)} aria-label="+" className="grid h-6 w-6 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </>
                      )}
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

            {/* معلومات التواصل — مطلوبة لإتمام الطلب */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <h2 className="font-cairo text-lg font-bold text-white">{t('معلومات التواصل')}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-white/60">{t('الاسم')} *</span>
                  <input
                    value={form.name}
                    onChange={setField('name')}
                    className={`w-full rounded-lg border bg-white/[0.06] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-strong ${
                      touched && !form.name.trim() ? 'border-red-400/60' : 'border-white/15'
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-white/60">{t('الهاتف')} *</span>
                  <input
                    type="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={setField('phone')}
                    placeholder={t('مثال: 05xxxxxxxx')}
                    className={`w-full rounded-lg border bg-white/[0.06] px-3.5 py-2.5 text-start text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-strong ${
                      touched && !form.phone.trim() ? 'border-red-400/60' : 'border-white/15'
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-white/60">{t('المدينة')} *</span>
                  <input
                    value={form.city}
                    onChange={setField('city')}
                    className={`w-full rounded-lg border bg-white/[0.06] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-strong ${
                      touched && !form.city.trim() ? 'border-red-400/60' : 'border-white/15'
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-white/60">
                    {t('البريد الإلكتروني')} <span className="font-normal text-white/35">({t('اختياري')})</span>
                  </span>
                  <input
                    type="email"
                    dir="ltr"
                    value={form.email}
                    onChange={setField('email')}
                    className="w-full rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-start text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-strong"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-white/60">
                    {t('ملاحظات')} <span className="font-normal text-white/35">({t('اختياري')})</span>
                  </span>
                  <textarea
                    value={form.notes}
                    onChange={setField('notes')}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-strong"
                  />
                </label>
              </div>
              {touched && !isValid && (
                <p className="mt-3 text-xs font-bold text-red-400">{t('يرجى تعبئة الاسم والهاتف والمدينة لإتمام الطلب.')}</p>
              )}
            </div>

            {/* إجراءات */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <button onClick={sendOrder} disabled={busy} className="btn btn-primary w-full max-w-sm disabled:opacity-60">
                {busy ? t('يتم إنشاء الملف…') : t('أرسل طلب عرض السعر بالبريد')}
              </button>
              {status === 'sent' && (
                <p className="max-w-sm text-center text-sm font-bold text-brand-light">{t('تم إرسال طلبك بنجاح ✓')}</p>
              )}
              {status === 'fallback' && (
                <p className="max-w-sm text-center text-xs text-white/55">{t('نُزّل ملف الطلب PDF وفتح تطبيق البريد — أرفق الملف ثم أرسل.')}</p>
              )}
              {!status && (
                <p className="max-w-sm text-center text-xs text-white/45">{t('يُرسَل طلبك مع ملف PDF مرفق إلى فريق ديفرا.')}</p>
              )}
              <div className="flex items-center gap-5 text-sm">
                <Link to={lp('/products')} className="font-bold text-brand-light hover:text-white">{t('تصفّح المزيد')}</Link>
                <button onClick={clear} className="text-white/50 hover:text-white/80">{t('تفريغ القائمة')}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
