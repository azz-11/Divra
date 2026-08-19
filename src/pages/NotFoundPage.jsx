import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import Seo from '../components/Seo.jsx'

export default function NotFoundPage() {
  const { t, lp } = useLang()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 pt-24 pb-32 text-center sm:pt-28">
      <Seo title={{ ar: 'الصفحة غير موجودة', en: 'Page not found' }} noindex />
      <span className="font-cairo text-7xl font-black text-brand-strong sm:text-8xl">404</span>
      <h1 className="mt-4 font-cairo text-2xl font-black text-white sm:text-3xl">{t('الصفحة غير موجودة')}</h1>
      <p className="mx-auto mt-3 max-w-md text-text-dim">{t('الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.')}</p>
      <Link to={lp('/')} className="btn btn-primary mt-8 inline-flex">{t('العودة إلى الرئيسية')}</Link>
    </section>
  )
}
