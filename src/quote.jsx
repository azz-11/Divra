import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { productOf } from './productsData.js'

const QuoteContext = createContext(null)
const KEY = 'divra_quote'

// إدخالات على شكل { id, qty }؛ مع دعم ترحيل التخزين القديم (مصفوفة معرّفات)
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || []
    return raw
      .map((e) => (typeof e === 'string' ? { id: e, qty: 1 } : { id: e.id, qty: Math.max(1, e.qty || 1) }))
      .filter((e) => e.id)
  } catch {
    return []
  }
}

export function QuoteProvider({ children }) {
  const [entries, setEntries] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(entries)) } catch {}
  }, [entries])

  const api = useMemo(() => {
    const has = (id) => entries.some((e) => e.id === id)
    const qtyOf = (id) => entries.find((e) => e.id === id)?.qty || 0
    const setQty = (id, n) =>
      setEntries((l) =>
        n <= 0 ? l.filter((e) => e.id !== id) : l.map((e) => (e.id === id ? { ...e, qty: n } : e)),
      )
    return {
      entries,
      items: entries.map((e) => ({ product: productOf(e.id), qty: e.qty })).filter((x) => x.product),
      count: entries.length,
      totalQty: entries.reduce((s, e) => s + e.qty, 0),
      has,
      qtyOf,
      add: (id) => setEntries((l) => (l.some((e) => e.id === id) ? l : [...l, { id, qty: 1 }])),
      remove: (id) => setEntries((l) => l.filter((e) => e.id !== id)),
      setQty,
      inc: (id) => setQty(id, qtyOf(id) + 1),
      dec: (id) => setQty(id, qtyOf(id) - 1),
      clear: () => setEntries([]),
    }
  }, [entries])

  return <QuoteContext.Provider value={api}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider')
  return ctx
}
