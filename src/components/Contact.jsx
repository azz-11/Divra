import SocialIcons from './SocialIcons.jsx'
import { useLang } from '../i18n.jsx'

// أيقونات خطية صغيرة (stroke) بأسلوب أنيق
const INFO = [
  {
    label: 'الهاتف',
    value: '+966 56 690 6123',
    href: 'tel:+966566906123',
    icon: <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1L6.6 10.8z" />,
  },
  {
    label: 'واتساب',
    value: '+966 56 690 6123',
    href: 'https://wa.me/966566906123',
    icon: <path d="M12 2a10 10 0 00-8.6 15.07L2 22l5.05-1.32A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.96 12.54l-.2.32.78 2.86-2.94-.77-.3.18A8.2 8.2 0 1112 3.8z" />,
  },
  {
    label: 'البريد الإلكتروني',
    value: 'hello@divra.com',
    href: 'mailto:hello@divra.com',
    icon: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.4l8 5 8-5V6H4zm16 2.3-7.5 4.7a1 1 0 0 1-1 0L4 8.3V18h16V8.3z" />,
  },
]

export default function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="relative flex min-h-screen items-center overflow-hidden bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-line bg-brand/10 px-4 py-1.5 text-sm text-brand-strong">
          {t('تواصل معنا')}
        </span>
        <h2 className="font-cairo text-4xl font-black leading-snug sm:text-5xl md:text-7xl">
          {t('نحن')} <span className="text-gradient">{t('قريبون')}</span> {t('منك')}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-text-dim md:text-xl">
          {t('تواصل معنا عبر أيّ من القنوات التالية وسنسعد بخدمتك.')}
        </p>

        {/* زر واتساب مباشر — أنيق صغير */}
        <a
          href="https://wa.me/966566906123"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-10 flex min-h-[56px] w-full max-w-sm items-center justify-center gap-2.5 rounded-full px-6 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(120deg,#25D366,#128C7E)' }}
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
            <path d="M12 2a10 10 0 00-8.6 15.07L2 22l5.05-1.32A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.96 12.54l-.2.32.78 2.86-2.94-.77-.3.18A8.2 8.2 0 1112 3.8z" />
          </svg>
          {t('تواصل عبر واتساب')}
        </a>

        {/* قنوات التواصل — صفوف نظيفة بأيقونات خطية صغيرة وفواصل رفيعة */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 rounded-2xl border border-line px-6 py-10 text-center transition-colors hover:bg-brand/5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-strong">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  {item.icon}
                </svg>
              </span>
              <span className="flex flex-col gap-2">
                <span className="text-sm text-text-dimmer">{t(item.label)}</span>
                <span dir="ltr" className="font-cairo text-lg font-bold">{item.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <span className="text-sm text-text-dim">{t('تابعنا على')}</span>
          <SocialIcons gap="gap-3" />
        </div>
      </div>
    </section>
  )
}
