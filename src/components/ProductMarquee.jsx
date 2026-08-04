import { useLang } from '../i18n.jsx'

// لقطات المنتجات الحقيقية (بطاقات 3:4)
const SCENES = [1, 2, 3, 4, 5, 6].map((n) => `/scenes/scene-${n}.webp`)

function Card({ src }) {
  return (
    <div className="scene-card relative mx-3 aspect-[3/4] w-52 shrink-0 overflow-hidden rounded-2xl sm:w-64">
      <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/40" />
    </div>
  )
}

export default function ProductMarquee({ reduced }) {
  const { t } = useLang()
  return (
    <section
      className="relative overflow-hidden border-y border-line py-20 md:py-24"
      aria-label={t('المنتجات')}
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #e7f0ff 48%, #ffffff 100%)' }}
    >
      {/* توهّجان ناعمان للعمق */}
      <div className="pointer-events-none absolute -top-24 start-1/4 h-72 w-72 rounded-full blur-3xl" style={{ insetInlineStart: '25%', background: 'rgba(79,143,240,.16)' }} />
      <div className="pointer-events-none absolute -bottom-24 end-1/4 h-72 w-72 rounded-full blur-3xl" style={{ insetInlineEnd: '25%', background: 'rgba(149,195,255,.22)' }} />

      {/* عنوان صغير */}
      <div className="relative z-10 mb-10 text-center">
        <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-strong">
          <span className="h-px w-8 bg-brand/40" />
          {t('من عالم ديفرا')}
          <span className="h-px w-8 bg-brand/40" />
        </span>
      </div>

      {/* الشريط الدوّار — تلاشٍ عند الحواف عبر mask */}
      <div
        className="relative overflow-hidden"
        dir="ltr"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        <div className={reduced ? 'flex justify-center' : 'marquee-track'}>
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0" aria-hidden={rep === 1}>
              {SCENES.map((src, i) => (
                <Card key={`${rep}-${i}`} src={src} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
