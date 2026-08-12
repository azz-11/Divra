import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import { useLang } from '../i18n.jsx'

// فاصل أنيق يقود من الصفحة الرئيسية إلى صفحة اكتشاف المنتجات
export default function DiscoverBreak({ reduced }) {
  const { t } = useLang()
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(160deg, #030435 0%, #0a0a3d 55%, #030328 100%)' }}
    >
      {/* زخرفة ديفرا الخفيفة */}
      <div
        className={`pointer-events-none absolute inset-0 ${reduced ? '' : 'divra-drift'}`}
        style={{
          backgroundImage: 'url(/pattern-wave-light.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '760px auto',
          opacity: 0.06,
        }}
      />
      {/* توهّج ناعم */}
      <span className="pointer-events-none absolute -top-24 start-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(149,195,255,.16), transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* عنوان صغير بين خطّين */}
        <span className="mb-5 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-light">
          <span className="h-px w-10 bg-brand-light/40" />
          {t('المجموعة الكاملة')}
          <span className="h-px w-10 bg-brand-light/40" />
        </span>

        <h2 className="font-cairo text-3xl font-black leading-snug text-white sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>
          {t('اكتشف كل ما يُكمّل حمّامك')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
          {t('من الخلّاطات إلى الجاكوزي — تصفّح مجموعات ديفرا كاملةً في مكانٍ واحد.')}
        </p>

        <Link to="/products" className="btn btn-primary mt-9 inline-flex items-center gap-2">
          {t('تصفّح جميع المنتجات')}
          <ArrowUpLeft size={18} strokeWidth={2.5} className="ltr:-scale-x-100" />
        </Link>
      </div>
    </section>
  )
}
