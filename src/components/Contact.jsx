import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { splitWords } from '../lib/motion.js'

const INFO = [
  {
    label: 'البريد الإلكتروني',
    value: 'hello@divra.com',
    icon: (
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.4l8 5 8-5V6H4zm16 2.3-7.5 4.7a1 1 0 0 1-1 0L4 8.3V18h16V8.3z" />
    ),
  },
  {
    label: 'الهاتف',
    value: '+966 55 000 0000',
    icon: (
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1L6.6 10.8z" />
    ),
  },
  {
    label: 'الموقع',
    value: 'الرياض، المملكة العربية السعودية',
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    ),
  },
]

export default function Contact({ reduced }) {
  const [sent, setSent] = useState(false)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const words = splitWords(titleRef.current)
      gsap.from(words, {
        opacity: 0,
        yPercent: 110,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      })
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI only — ready to wire to an API / mail service later
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 5000)
  }

  const field =
    'w-full rounded-xl2 border border-line bg-white/5 px-4 py-3 text-sm text-text placeholder:text-text-dimmer outline-none transition-colors focus:border-sky'

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2">
        {/* Contact info */}
        <div>
          <span data-reveal className="eyebrow mb-4">
            تواصل معنا
          </span>
          <h2
            ref={titleRef}
            className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl"
          >
            لنصمّم مساحتك معاً
          </h2>
          <p data-reveal className="mt-5 max-w-md leading-relaxed text-text-dim">
            فريق ديفرا جاهز لمساعدتك في اختيار القطع المثالية لمشروعك. تواصل معنا
            واحصل على استشارة مجانية.
          </p>

          <div className="mt-9 space-y-5">
            {INFO.map((item) => (
              <div key={item.label} data-reveal className="flex items-center gap-4">
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl2 border border-line bg-brand/12 text-sky">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-text-dimmer">{item.label}</div>
                  <div className="font-cairo font-bold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <form data-reveal onSubmit={handleSubmit} className="glass rounded-xl2 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required className={field} type="text" placeholder="الاسم الكامل" />
            <input required className={field} type="email" placeholder="البريد الإلكتروني" />
            <input className={field} type="tel" placeholder="رقم الجوال" />
            <select required className={field} defaultValue="">
              <option value="" disabled>
                الموضوع
              </option>
              <option>استشارة تصميم</option>
              <option>طلب عرض سعر</option>
              <option>استفسار عام</option>
            </select>
          </div>
          <textarea
            required
            rows="4"
            className={`${field} mt-4 resize-none`}
            placeholder="رسالتك"
          />
          <button type="submit" className="btn btn-primary mt-5 w-full">
            إرسال الرسالة
          </button>

          {sent && (
            <p className="mt-4 rounded-xl2 border border-sky/30 bg-sky/10 px-4 py-3 text-center text-sm text-brand-pale">
              ✓ تم استلام رسالتك، سنعاود التواصل معك قريباً.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
