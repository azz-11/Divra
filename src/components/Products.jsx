import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductRow from './ProductRow.jsx'
import { PRODUCTS } from '../productsData.js'
import { splitWords } from '../lib/motion.js'

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'kitchen', label: 'مطبخ' },
  { key: 'bath', label: 'حمّام / بانيو' },
]

export default function Products({ reduced }) {
  const [filter, setFilter] = useState('all')
  const headRef = useRef(null)
  const titleRef = useRef(null)

  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter)

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
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      })
      gsap.from('[data-head-fade]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      })
    })
    return () => ctx.revert()
  }, [reduced])

  // Recalculate triggers when the filter changes row count
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [filter])

  return (
    <section id="products" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div
        className="glow-blob inset-inline-end-[-10%] top-[30%] h-[440px] w-[440px]"
        style={{ insetInlineEnd: '-8%', background: 'rgba(201,169,106,0.12)' }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section head */}
        <div ref={headRef} className="mx-auto max-w-2xl text-center">
          <span data-head-fade className="eyebrow mb-4 justify-center">
            المنتجات
          </span>
          <h2
            ref={titleRef}
            className="font-cairo text-3xl font-black leading-snug sm:text-4xl md:text-5xl"
          >
            قطع تُعيد تعريف الفخامة
          </h2>
          <p data-head-fade className="mx-auto mt-4 max-w-lg text-text-dim">
            تشكيلة منتقاة من الصنابير والمخلاطات، كل قطعة مصممة لتترك انطباعاً لا
            يُنسى.
          </p>
        </div>

        {/* Filters */}
        <div data-head-fade className="mt-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`btn text-sm ${filter === f.key ? 'btn-primary' : 'btn-ghost'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product rows */}
        <div className="mt-8 divide-y divide-line">
          {visible.map((product, i) => (
            <ProductRow key={product.id} product={product} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}
