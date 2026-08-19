import { useEffect } from 'react'
import Seo from '../components/Seo.jsx'
import About from '../components/About.jsx'

export default function AboutPage({ reduced }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="pt-20">
      <Seo
        title={{ ar: 'من نحن', en: 'About us' }}
        description={{
          ar: 'ديفرا — نصنع تفاصيل تدوم: هندسة دقيقة وحرفية عالية في أدوات صحية فاخرة تتحدّى الزمن جمالاً وأداءً.',
          en: 'Divra — we craft details that last: precise engineering and fine craftsmanship in luxury sanitary ware that defies time in beauty and performance.',
        }}
      />
      <About reduced={reduced} />
    </div>
  )
}
