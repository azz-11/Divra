import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS, collectionOf } from '../productsData.js'

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const t = q.trim()
    if (!t) return []
    return PRODUCTS.filter((p) => {
      const hay = `${p.title} ${p.tagline} ${p.desc} ${collectionOf(p.collection).name}`
      return hay.includes(t)
    })
  }, [q])

  const go = (p) => {
    onClose()
    navigate(`/collection/${p.collection}#${p.id}`)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pt-24">
        <div className="glass flex items-center gap-3 rounded-xl2 px-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-text-dim" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن منتج… (مثال: دش، بانيو، مطبخ)"
            className="w-full bg-transparent py-4 text-lg text-text placeholder:text-text-dimmer outline-none"
          />
          <button onClick={onClose} aria-label="إغلاق" className="text-text-dim hover:text-text">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-3 overflow-y-auto pb-10">
          {q.trim() && results.length === 0 && (
            <p className="text-center text-text-dim">لا توجد نتائج لِـ «{q}»</p>
          )}
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p)}
              className="glass flex w-full items-center gap-4 rounded-xl2 p-3 text-start transition-colors hover:border-brand-light"
            >
              <img src={p.images[p.finishes[0]]} alt="" className="h-16 w-16 flex-shrink-0 object-contain" loading="lazy" />
              <span>
                <span className="block font-cairo font-bold">{p.title}</span>
                <span className="block text-sm text-text-dim">{collectionOf(p.collection).name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
