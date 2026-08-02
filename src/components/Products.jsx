import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductRow from './ProductRow.jsx'
import { PRODUCTS } from '../productsData.js'

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'kitchen', label: 'مطبخ' },
  { key: 'bath', label: 'حمّام / بانيو' },
]

export default function Products({ reduced }) {
  const [filter, setFilter] = useState('all')
  const headRef = useRef(null)

  const visible = PRODUCTS.filter(
    (p) => filter === 'all' || p.category === filter,
  )

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
    return () => ctx.revert()
  }, [reduced])

  // إعادة حساب المشغّلات عند تغيّر الفلتر
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [filter])

  return (
    <section id="products" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* رأس القسم */}
        <div ref={headRef} className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-brand-pale">
            المجموعة
          </span>
          <h2 className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl">
            منتجات تُعيد تعريف <span className="text-gradient">الفخامة</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-dim">
            تشكيلة منتقاة من الصنابير والمخلاطات، كل قطعة مصممة لتترك انطباعاً
            لا يُنسى.
          </p>
        </div>

        {/* أزرار الفلترة */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`btn text-sm ${
                filter === f.key ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* صفوف المنتجات */}
        <div className="mt-6 divide-y divide-line">
          {visible.map((product, i) => (
            <ProductRow
              key={product.id}
              product={product}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      {/* شريط Marquee */}
      <div className="mt-14 overflow-hidden border-y border-line py-6">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0">
              {Array.from({ length: 6 }).map((__, j) => (
                <span
                  key={j}
                  className="mx-8 font-cairo text-3xl font-black text-white/10 sm:text-4xl"
                >
                  DIVRA · ديفرا
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
