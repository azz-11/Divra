import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { productOf } from './productsData.js'

const QuoteContext = createContext(null)
const KEY = 'divra_quote'

export function QuoteProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch {}
  }, [ids])

  const api = useMemo(() => {
    const has = (id) => ids.includes(id)
    return {
      ids,
      items: ids.map(productOf).filter(Boolean),
      count: ids.length,
      has,
      add: (id) => setIds((l) => (l.includes(id) ? l : [...l, id])),
      remove: (id) => setIds((l) => l.filter((x) => x !== id)),
      toggle: (id) => setIds((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])),
      clear: () => setIds([]),
    }
  }, [ids])

  return <QuoteContext.Provider value={api}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider')
  return ctx
}
