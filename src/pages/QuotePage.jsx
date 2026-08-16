import { useState, useEffect } from 'react'
import { COLLECTIONS } from '../productsData.js'

const PROJECT_SIZES = ['فيلا', 'شقة', 'فندق', 'مقاول', 'أخرى']
const WHATSAPP_NUMBER = '966566906123'

const emptyForm = { name: '', phone: '', category: '', projectSize: '', email: '', notes: '' }

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-text">
        {label} {required && <span className="text-[#ff8a8a]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-bold text-[#ff8a8a]">{error}</p>}
    </div>
  )
}

const inputClass = (hasError) =>
  `w-full rounded-xl2 border ${hasError ? 'border-[#ff8a8a]/60' : 'border-line'} bg-white/5 px-4 py-3 text-text placeholder:text-text-dimmer outline-none transition-colors focus:border-brand-strong`

// المتصفح يرسم قائمة <select> المنسدلة بألوانه الافتراضية (فاتحة) بغضّ النظر عن
// كلاسات Tailwind، فيصير التباين ضعيفاً على الثيم الغامق. color-scheme يخبر
// المتصفح يرسمها بألوان داكنة متّسقة، ونضيف خلفية صريحة على كل <option> لضمان
// التباين في كل المتصفحات.
const selectStyle = { colorScheme: 'dark' }
const optionStyle = { backgroundColor: '#0b0c2a', color: '#f4f4fb' }

export default function QuotePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => {
    let value = e.target.value
    if (field === 'phone') value = value.replace(/[^0-9]/g, '')
    setForm((f) => ({ ...f, [field]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'يرجى إدخال الاسم'
    if (!form.phone.trim()) next.phone = 'يرجى إدخال رقم الجوال'
    else if (form.phone.replace(/[^0-9]/g, '').length < 9) next.phone = 'رقم الجوال غير صحيح'
    if (!form.category) next.category = 'يرجى اختيار نوع المنتج / الفئة'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'صيغة البريد الإلكتروني غير صحيحة'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const categoryName = COLLECTIONS.find((c) => c.id === form.category)?.name?.ar || form.category
    const lines = [
      'طلب عرض سعر جديد من موقع ديفرا:',
      `الاسم: ${form.name.trim()}`,
      `الجوال: ${form.phone.trim()}`,
      `نوع المنتج / الفئة: ${categoryName}`,
    ]
    if (form.projectSize) lines.push(`حجم المشروع: ${form.projectSize}`)
    if (form.email.trim()) lines.push(`البريد الإلكتروني: ${form.email.trim()}`)
    if (form.notes.trim()) lines.push(`ملاحظات: ${form.notes.trim()}`)

    const message = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div dir="rtl" className="relative min-h-screen bg-ink px-6 pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full border border-line bg-brand/10 px-4 py-1.5 text-sm text-brand-strong">
            طلب عرض سعر
          </span>
          <h1 className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl">
            اطلب عرض سعر مخصص
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-text-dim">
            عبّئ البيانات التالية وسنعاود التواصل معك خلال 24 ساعة بعرض سعر يناسب مشروعك.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate className="glass space-y-5 rounded-xl2 p-6 md:p-10">
            <Field label="الاسم" required error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="اكتب اسمك الكامل"
                className={inputClass(errors.name)}
              />
            </Field>

            <Field label="رقم الجوال" required error={errors.phone}>
              <input
                type="tel"
                inputMode="numeric"
                dir="ltr"
                value={form.phone}
                onChange={update('phone')}
                placeholder="05xxxxxxxx"
                className={inputClass(errors.phone) + ' text-end'}
              />
            </Field>

            <Field label="نوع المنتج / الفئة" required error={errors.category}>
              <select value={form.category} onChange={update('category')} className={inputClass(errors.category)} style={selectStyle}>
                <option value="" disabled style={optionStyle}>اختر الفئة المطلوبة</option>
                {COLLECTIONS.map((c) => (
                  <option key={c.id} value={c.id} style={optionStyle}>{c.name.ar}</option>
                ))}
              </select>
            </Field>

            <Field label="حجم المشروع">
              <select value={form.projectSize} onChange={update('projectSize')} className={inputClass(false)} style={selectStyle}>
                <option value="" style={optionStyle}>اختر (اختياري)</option>
                {PROJECT_SIZES.map((s) => (
                  <option key={s} value={s} style={optionStyle}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="البريد الإلكتروني" error={errors.email}>
              <input
                type="email"
                dir="ltr"
                value={form.email}
                onChange={update('email')}
                placeholder="example@email.com"
                className={inputClass(errors.email) + ' text-end'}
              />
            </Field>

            <Field label="ملاحظات">
              <textarea
                value={form.notes}
                onChange={update('notes')}
                rows={4}
                placeholder="أي تفاصيل إضافية تودّ مشاركتها معنا"
                className={inputClass(false) + ' resize-none'}
              />
            </Field>

            <button type="submit" className="btn btn-primary mt-2 w-full">
              إرسال الطلب عبر واتساب
            </button>
          </form>
        ) : (
          <div className="glass rounded-xl2 p-10 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand-strong">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-cairo text-2xl font-black sm:text-3xl">تم استلام طلبك بنجاح!</h2>
            <p className="mx-auto mt-3 max-w-md text-text-dim">
              شكراً لثقتك بديفرا. فريقنا سيراجع طلبك ويتواصل معك خلال 24 ساعة بعرض السعر المناسب لمشروعك.
            </p>
            <button onClick={resetForm} className="btn btn-ghost mt-7">
              إرسال طلب آخر
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
