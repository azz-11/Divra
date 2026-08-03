import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FINISH } from '../productsData.js'

export default function ProductRow({ product, index, accent = '#5561e5', reduced }) {
  const rowRef = useRef(null)
  const imgWrapRef = useRef(null)
  const imgRef = useRef(null)
  const [finish, setFinish] = useState(product.finishes[0])
  const reversed = index % 2 === 1

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: rowRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } },
      )
      gsap.fromTo(
        imgWrapRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'none', scrollTrigger: { trigger: rowRef.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    }, rowRef)
    return () => ctx.revert()
  }, [reduced])

  const changeFinish = (key) => {
    if (key === finish) return
    if (reduced) return setFinish(key)
    gsap.to(imgRef.current, {
      opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setFinish(key)
        gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
      },
    })
  }

  return (
    <div id={product.id} ref={rowRef} className="grid scroll-mt-24 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
      {/* الصورة + توهج خلفي */}
      <div className={reversed ? 'lg:order-2' : 'lg:order-1'}>
        <div ref={imgWrapRef} className="relative mx-auto flex aspect-square max-w-md items-center justify-center">
          <span
            className="absolute inset-inline-0 top-1/2 mx-auto h-4/5 w-4/5 -translate-y-1/2 rounded-full blur-2xl"
            style={{ insetInline: 0, background: `radial-gradient(circle, ${accent}55, transparent 65%)` }}
          />
          <span className="absolute inset-inline-0 top-1/2 mx-auto h-3/5 w-3/5 -translate-y-1/2 rounded-full border" style={{ insetInline: 0, borderColor: `${accent}33` }} />
          <img
            ref={imgRef}
            src={product.images[finish]}
            alt={`${product.title} - ${FINISH[finish].name}`}
            className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* النص */}
      <div className={reversed ? 'lg:order-1' : 'lg:order-2'}>
        <h3 className="font-cairo text-2xl font-black sm:text-3xl">{product.title}</h3>
        <p className="mt-3 max-w-md text-text-dim">{product.desc}</p>

        <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
          {product.specs.map(([k, v]) => (
            <div key={k} className="glass rounded-xl2 px-4 py-3">
              <div className="text-xs text-text-dimmer">{k}</div>
              <div className="mt-0.5 font-cairo font-bold text-brand-light">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-text-dim">التشطيب:</span>
          <div className="flex items-center gap-3">
            {product.finishes.map((key) => (
              <button
                key={key}
                onClick={() => changeFinish(key)}
                aria-label={FINISH[key].name}
                title={FINISH[key].name}
                disabled={product.finishes.length === 1}
                className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 disabled:cursor-default ${
                  finish === key ? 'border-brand ring-2 ring-brand/40' : 'border-line'
                }`}
                style={{ background: FINISH[key].swatch }}
              />
            ))}
            {product.finishes.length === 1 && (
              <span className="text-sm text-text-dim">{FINISH[product.finishes[0]].name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
