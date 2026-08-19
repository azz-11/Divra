import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang, stripLocale } from '../i18n.jsx'

// نطاق الموقع الرسمي — يُستخدم لبناء روابط canonical وog:url المطلقة
export const SITE_URL = 'https://divra-lilac.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/products/poster.webp`
const SITE_NAME = { ar: 'ديفرا | Divra', en: 'Divra' }
const DEFAULT_TITLE = { ar: 'ديفرا | Divra — أدوات صحية فاخرة', en: 'Divra — Luxury sanitary ware' }
const DEFAULT_DESCRIPTION = {
  ar: 'ديفرا Divra — أدوات صحية فاخرة: صنابير مطبخ، خلاطات حمّام وبانيو بتصميم نحتي راقٍ.',
  en: 'Divra — luxury sanitary ware: kitchen faucets, bathroom and bath mixers with a refined sculptural design.',
}

function resolve(field, lang) {
  if (field == null) return null
  if (typeof field === 'string') return field
  return field[lang] ?? field.ar ?? null
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// روابط alternate/hreflang يمكن أن تتكرر بقيم hreflang مختلفة، فتُميَّز بها لا بـrel وحده
function setAlternateLink(hreflang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// عنوان ووصف وصورة وrobots ورابط canonical/og مخصّصة لكل صفحة
export default function Seo({ title, description, image, noindex = false }) {
  const { lang } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = resolve(title, lang)
    const siteName = resolve(SITE_NAME, lang)
    const fullTitle = pageTitle ? `${pageTitle} | ${siteName}` : resolve(DEFAULT_TITLE, lang)
    document.title = fullTitle

    const desc = resolve(description, lang) || resolve(DEFAULT_DESCRIPTION, lang)
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    const url = `${SITE_URL}${pathname}`
    setLink('canonical', url)

    // روابط hreflang المتبادلة بين النسخة العربية والإنجليزية لكل صفحة
    const basePath = stripLocale(pathname)
    const arUrl = `${SITE_URL}${basePath}`
    const enUrl = basePath === '/' ? `${SITE_URL}/en` : `${SITE_URL}/en${basePath}`
    setAlternateLink('ar', arUrl)
    setAlternateLink('en', enUrl)
    setAlternateLink('x-default', arUrl)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image || DEFAULT_IMAGE)
    setMeta('property', 'og:locale', lang === 'ar' ? 'ar_SA' : 'en_US')
  }, [title, description, image, noindex, lang, pathname])

  return null
}
