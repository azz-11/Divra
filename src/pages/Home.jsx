import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import CollectionsShowcase from '../components/CollectionsShowcase.jsx'
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
      <CollectionsShowcase reduced={reduced} />
      <Contact />
    </>
  )
}
