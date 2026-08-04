import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Custom gold cursor (dot + trailing ring) and a top scroll-progress bar.
// Both no-op on touch/coarse pointers and when reduced motion is preferred.
export default function Cursor({ reduced }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const progressRef = useRef(null)

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

    // Grow the ring over interactive targets
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

  useEffect(() => {
    if (reduced) return
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(progressRef.current, { scaleX: self.progress })
      },
    })
    return () => st.kill()
  }, [reduced])

  return (
    <>
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
      {!reduced && (
        <>
          <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
          <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
      )}
    </>
  )
}
