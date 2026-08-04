import { useLang } from '../i18n.jsx'

// لقطات المنتجات (بطاقات 3:4) — مؤقتة الآن، تُستبدل باللقطات الحقيقية في public/scenes
const SCENES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/scenes/scene-${n}.webp`)

function Card({ src }) {
  return (
    <div
      className="scene-card relative mx-3 aspect-[3/4] w-52 shrink-0 overflow-hidden rounded-2xl sm:w-64"
    >
      <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
      {/* توهّج علوي خفيف */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
    </div>
  )
}

export default function ProductMarquee({ reduced }) {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden bg-surface-2 py-16 md:py-20" aria-label={t('المنتجات')}>
      {/* توهّج خلفي ناعم */}
      <div
        className="pointer-events-none absolute inset-inline-0 top-1/2 mx-auto h-[40vmin] w-[80vmin] -translate-y-1/2 rounded-full blur-3xl"
        style={{ insetInline: 0, background: 'radial-gradient(circle, rgba(79,143,240,.18), transparent 70%)' }}
      />

      <div className="relative overflow-hidden" dir="ltr">
        {/* تلاشٍ عند الحواف */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-2 to-transparent" />

        <div className={reduced ? 'flex' : 'marquee-track'}>
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
