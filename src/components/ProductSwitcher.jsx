import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { productOf } from '../productsData.js'
import { useLang } from '../i18n.jsx'

// المنتج الرسمي للبراند — قسم سينمائي بفيديو لوب بلا خيارات تبديل
const HERO_ID = 'mixer-chrome'
const VIDEO = '/video/switch-1'

export default function ProductSwitcher({ reduced }) {
  const textRef = useRef(null)
  const videoRef = useRef(null)
  const { t, tr } = useLang()
  const product = productOf(HERO_ID)

  useEffect(() => {
    if (videoRef.current) videoRef.current.play?.().catch(() => {})
    if (reduced || !textRef.current) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: textRef.current, start: 'top 80%' } })
    tl.fromTo(textRef.current.children, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
    return () => tl.kill()
  }, [reduced])

  if (!product) return null

  return (
    <section id="switcher" className="relative min-h-screen w-full overflow-hidden">
      {/* فيديو ملء الشاشة — لوب */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-[#0a0a2e] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={`${VIDEO}.webm`} type="video/webm" />
        <source src={`${VIDEO}.mp4`} type="video/mp4" />
      </video>

      {/* تدرّج للتباين على جهة النص */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(270deg, rgba(3,3,40,.15) 0%, rgba(3,3,40,.45) 45%, rgba(3,3,40,.85) 100%)' }}
      />

      {/* المحتوى — عبارة لافتة عن المنتج الرسمي (يمين) */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28">
        <div ref={textRef} className="max-w-xl">
          <span className="mb-4 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/50" />
            {t('المنتج الرسمي')}
          </span>
          <h2 className="font-cairo text-4xl font-black leading-[1.05] text-white sm:text-6xl md:text-7xl" style={{ textShadow: '0 2px 24px rgba(0,0,0,.4)' }}>
            {tr(product.title)}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">{tr(product.tagline)}</p>
          <Link to={`/product/${product.id}`} className="btn btn-primary mt-9 inline-flex">
            {t('اكتشف المنتج')}
          </Link>
        </div>
      </div>
    </section>
  )
}
