// Lightweight motion helpers — no paid GSAP plugins (SplitText avoided).
// Arabic text must be split by WORD, never by character: wrapping individual
// Arabic letters in spans breaks the cursive joining/ligatures. Latin runs can
// be char-split safely.

/**
 * Split an element's text into word spans (RTL-safe). Preserves spaces.
 * Returns the array of `.word` elements for staggered animation.
 * Idempotent: skips if already split.
 */
export function splitWords(el) {
  if (!el || el.dataset.split === 'words') return []
  const text = el.textContent
  el.textContent = ''
  const words = text.split(/(\s+)/) // keep whitespace tokens
  const spans = []
  words.forEach((token) => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token))
      return
    }
    const wrap = document.createElement('span')
    wrap.className = 'word'
    const inner = document.createElement('span')
    inner.className = 'word-inner'
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform, opacity'
    inner.textContent = token
    wrap.appendChild(inner)
    el.appendChild(wrap)
    spans.push(inner)
  })
  el.dataset.split = 'words'
  return spans
}

/**
 * Split Latin text into per-character spans (safe for Latin only).
 */
export function splitChars(el) {
  if (!el || el.dataset.split === 'chars') return []
  const text = el.textContent
  el.textContent = ''
  const spans = []
  for (const ch of text) {
    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = ch === ' ' ? ' ' : ch
    el.appendChild(span)
    spans.push(span)
  }
  el.dataset.split = 'chars'
  return spans
}

/**
 * Magnetic pull toward the pointer. Returns a cleanup function.
 * Skipped automatically on coarse pointers / reduced motion by the caller.
 */
export function attachMagnet(el, gsap, strength = 0.35) {
  if (!el) return () => {}
  const onMove = (e) => {
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
    })
  }
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  return () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
  }
}

/** Ease used across the site — matches the design-system "expo/quint out" feel. */
export const LUXE_EASE = 'power4.out'
export const LUXE_CUBIC = [0.16, 1, 0.3, 1]
