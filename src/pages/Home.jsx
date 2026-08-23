import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import DiscoverBreak from '../components/DiscoverBreak.jsx'
import ProductSwitcher from '../components/ProductSwitcher.jsx'
import CollectionDuo from '../components/CollectionDuo.jsx'
import BrandStory from '../components/BrandStory.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({ reduced }) {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  return (
    <>
      <Hero reduced={reduced} />
      {/* فاصل تسويقي */}
      <DiscoverBreak reduced={reduced} />
      {/* المنتج الرسمي (فيديو بلا خيارات) */}
      <ProductSwitcher reduced={reduced} />
      {/* أقسام (بلا تكرار) */}
      <CollectionDuo ids={['mixers', 'jacuzzi', 'basins', 'chairs']} />
      {/* حكاية البراند */}
      <BrandStory reduced={reduced} />
      {/* بقية الأقسام (بلا تكرار) */}
      <CollectionDuo ids={['sprays', 'bath', 'accessories']} />
      {/* التواصل */}
      <Contact />
    </>
  )
}
