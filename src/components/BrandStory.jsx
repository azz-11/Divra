import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n.jsx'

const EASE = 'cubic-bezier(0.33,1,0.68,1)'
const FADE = 750 // مدة الانتقال (crossfade)

// شرائح حكاية العلامة — فيديوهات الحكاية
const STORY = [
  {
    video: '/video/story-1',
    tag: { ar: 'حكايتنا', en: 'Our story' },
    title: { ar: 'كل قطرة تبدأ بفكرة', en: 'Every drop begins with an idea' },
    text: {
      ar: 'من شغفٍ بالتفاصيل وُلدت ديفرا، لتحوّل لحظات الماء اليومية إلى تجربة تُلهم.',
      en: 'From a passion for detail, Divra was born — turning everyday moments of water into an experience that inspires.',
    },
  },
  {
    video: '/video/story-2',
    tag: { ar: 'الحِرفة', en: 'Craft' },
    title: { ar: 'نَنحت المعدن كما تُكتب القصيدة', en: 'We sculpt metal the way a poem is written' },
    text: {
      ar: 'خطوطٌ انسيابية ودقّةٌ لا تُهادن، لأن ما تلمسه كل يوم يستحق أن يكون استثنائياً.',
      en: 'Flowing lines and uncompromising precision — because what you touch every day deserves to be exceptional.',
    },
  },
  {
    video: '/video/story-3',
    tag: { ar: 'التصميم', en: 'Design' },
    title: { ar: 'الجمال في أبسط تفصيل', en: 'Beauty in the simplest detail' },
    text: {
      ar: 'نصمّم لِتبقى لا لِتمرّ — حضورٌ هادئ يليق بالمساحات الراقية.',
      en: 'We design to endure, not to pass — a quiet presence worthy of refined spaces.',
    },
  },
  {
    video: '/video/story-4',
    tag: { ar: 'الجودة', en: 'Quality' },
    title: { ar: 'أداءٌ يدوم كما يدوم الانطباع الأول', en: 'Performance that lasts like a first impression' },
    text: {
      ar: 'خاماتٌ مختارة ومعايير عالمية، لتبقى التجربة كاملة عاماً بعد عام.',
      en: 'Selected materials and world-class standards, so the experience stays complete year after year.',
    },
  },
  {
    video: '/video/story-1',
    tag: { ar: 'ابدأ رحلتك', en: 'Begin your journey' },
    title: { ar: 'مساحتك تنتظر لمسة ديفرا', en: 'Your space awaits the Divra touch' },
    text: {
      ar: 'اكتشف المجموعة، ودَع الماء يروي حكايتك.',
      en: 'Explore the collection and let water tell your story.',
    },
    cta: { to: '/collection/mixers', label: { ar: 'اكتشف المجموعة', en: 'Explore the collection' } },
  },
]

const N = STORY.length

function Slide({ video }) {
  return (
    <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
      <source src={`${video}.webm`} type="video/webm" />
      <source src={`${video}.mp4`} type="video/mp4" />
    </video>
  )
}

export default function BrandStory({ reduced }) {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(null) // الشريحة الخارجة أثناء الـ crossfade
  const animating = useRef(false)
  const drag = useRef({ x: 0, on: false })
  const textRef = useRef(null)
  const curVidRef = useRef(null)
  const { tr, dir } = useLang()
  const Prev = dir === 'rtl' ? ArrowRight : ArrowLeft
  const Next = dir === 'rtl' ? ArrowLeft : ArrowRight

  const cur = STORY[active]

  // عند تغيّر الشريحة: crossfade للفيديو + دخول النص
  useEffect(() => {
    // إظهار الفيديو الجديد تدريجياً فوق القديم
    const v = curVidRef.current
    if (v && !reduced) {
      v.style.transition = 'none'
      v.style.opacity = 0
      requestAnimationFrame(() => {
        v.style.transition = `opacity ${FADE}ms ${EASE}`
        v.style.opacity = 1
      })
    }
    // إزالة الشريحة القديمة بعد اكتمال الانتقال
    let t
    if (prev !== null) t = setTimeout(() => setPrev(null), FADE + 60)

    // حركة دخول النص
    const el = textRef.current
    if (el && !reduced) {
      el.style.transition = 'none'
      el.style.opacity = 0
      el.style.transform = 'translateY(26px)'
      requestAnimationFrame(() => {
        el.style.transition = `opacity 700ms ${EASE}, transform 700ms ${EASE}`
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      })
    }
    return () => t && clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const change = (idx) => {
    if (idx === active || animating.current) return
    animating.current = true
    setPrev(active)
    setActive(idx)
    setTimeout(() => (animating.current = false), FADE)
  }
  const go = (step) => change((active + step + N) % N)

  const onDown = (e) => { drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, on: true } }
  const onUp = (e) => {
    if (!drag.current.on) return
    drag.current.on = false
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const dx = end - drag.current.x
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1)
  }

  return (
    <section
      id="story"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a2e]"
      onPointerDown={onDown}
      onPointerUp={onUp}
      style={{ touchAction: 'pan-y' }}
    >
      {/* طبقتا فيديو للـ crossfade */}
      <div className="absolute inset-0">
        {prev !== null && (
          <div key={`p-${prev}`} className="absolute inset-0" style={{ zIndex: 0 }}>
            <Slide video={STORY[prev].video} />
          </div>
        )}
        <div key={`c-${active}`} ref={curVidRef} className="absolute inset-0" style={{ zIndex: 1, opacity: reduced ? 1 : 0 }}>
          <Slide video={cur.video} />
        </div>
      </div>

      {/* تعتيم للتباين */}
      <div className="absolute inset-0" style={{ zIndex: 2, background: 'radial-gradient(120% 100% at 50% 50%, rgba(3,3,40,.35) 0%, rgba(3,3,40,.72) 100%)' }} />

      {/* النص في المنتصف */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <div ref={textRef}>
          <span className="mb-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur">
            {tr(cur.tag)}
          </span>
          <h2 className="font-cairo text-4xl font-black leading-[1.1] text-white sm:text-6xl md:text-7xl" style={{ textWrap: 'balance' }}>
            {tr(cur.title)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">{tr(cur.text)}</p>
          {cur.cta && (
            <Link to={cur.cta.to} className="btn btn-primary mt-9">{tr(cur.cta.label)}</Link>
          )}
        </div>
      </div>

      {/* أزرار التنقّل */}
      <button onClick={() => go(-1)} aria-label={dir === 'rtl' ? 'السابق' : 'Previous'}
        className="absolute start-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-white/50 text-white backdrop-blur transition-all hover:scale-105 hover:border-white hover:bg-white/10 sm:start-8 sm:h-16 sm:w-16">
        <Prev size={26} strokeWidth={2.25} />
      </button>
      <button onClick={() => go(1)} aria-label={dir === 'rtl' ? 'التالي' : 'Next'}
        className="absolute end-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-white/50 text-white backdrop-blur transition-all hover:scale-105 hover:border-white hover:bg-white/10 sm:end-8 sm:h-16 sm:w-16">
        <Next size={26} strokeWidth={2.25} />
      </button>

      {/* مؤشّرات الشرائح */}
      <div className="absolute bottom-8 inset-inline-0 z-20 mx-auto flex justify-center gap-2" style={{ insetInline: 0 }}>
        {STORY.map((_, i) => (
          <button key={i} onClick={() => change(i)} aria-label={`${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'}`} />
        ))}
      </div>
    </section>
  )
}
