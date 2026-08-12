import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import ProductSwitcher from '../components/ProductSwitcher.jsx'
import ProductMarquee from '../components/ProductMarquee.jsx'
import BrandStory from '../components/BrandStory.jsx'
import DiscoverBreak from '../components/DiscoverBreak.jsx'
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
      <DiscoverBreak reduced={reduced} />
      <ProductSwitcher reduced={reduced} />
      <ProductMarquee reduced={reduced} />
      <BrandStory reduced={reduced} />
      <Contact />
    </>
  )
}
