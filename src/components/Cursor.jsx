import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Custom cyan cursor: instant dot + trailing ring that grows over interactive
// targets. No-op on touch/coarse pointers and when reduced motion is preferred.
export default function Cursor({ reduced }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const dot = dotRef.current
    const ring = ringRef.current
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const hoverables = document.querySelectorAll(
      'a, button, [data-cursor], input, select, textarea',
    )
    const enter = () => ring.classList.add('is-hover')
    const leave = () => ring.classList.remove('is-hover')
    hoverables.forEach((el) => {
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', leave)
    })

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      hoverables.forEach((el) => {
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointerleave', leave)
      })
    }
  }, [reduced])

  if (reduced) return null
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
