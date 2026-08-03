import { useEffect } from 'react'
import About from '../components/About.jsx'

export default function AboutPage({ reduced }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="pt-20">
      <About reduced={reduced} />
    </div>
  )
}
