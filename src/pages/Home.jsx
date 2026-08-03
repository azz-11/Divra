import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import ProductHighlight from '../components/ProductHighlight.jsx'
import Contact from '../components/Contact.jsx'
import { COLLECTIONS, productsIn } from '../productsData.js'

export default function Home({ reduced }) {
  const { hash } = useLocation()

  // التمرير لقسم تواصل عند /#contact
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  return (
    <>
      <Hero reduced={reduced} />

      {/* منتجات مختارة من كل قسم — انتقال سينمائي بين الأقسام */}
      {COLLECTIONS.map((col, i) => {
        const product = productsIn(col.id)[0]
        if (!product) return null
        return (
          <ProductHighlight
            key={col.id}
            product={product}
            collection={col}
            index={i}
            reduced={reduced}
          />
        )
      })}

      <Contact />
    </>
  )
}
