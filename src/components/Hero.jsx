import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitWords, splitChars, attachMagnet } from '../lib/motion.js'

export default function Hero({ reduced }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const markRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    const cleaners = []

    const ctx = gsap.context(() => {
      // Scrub the hero video frame-by-frame with scroll position.
      const state = { frame: 0 }

      const setupScrub = () => {
        const duration = video.duration || 8
        gsap.killTweensOf(state)

        gsap.to(state, {
          frame: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: pinRef.current,
            anticipatePin: 1,
          },
          onUpdate: () => {
            if (video.readyState >= 2) {
              video.currentTime = Math.min(state.frame, duration - 0.05)
            }
          },
        })

        // Fade + lift the content as the scene plays
        gsap.to(contentRef.current, {
          y: 90,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '42% top',
            scrub: true,
          },
        })

        ScrollTrigger.refresh()
      }

      if (video.readyState >= 1) setupScrub()
      else video.addEventListener('loadedmetadata', setupScrub, { once: true })

      // Intro choreography: wordmark chars, then headline words, then the rest.
      const tl = gsap.timeline({ delay: 0.35 })

      const markChars = splitChars(markRef.current)
      tl.from(markChars, {
        opacity: 0,
        yPercent: 120,
        rotateX: -60,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power4.out',
      })

      const words = splitWords(titleRef.current)
      tl.from(
        words,
        {
          opacity: 0,
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power4.out',
        },
        '-=0.4',
      )

      tl.from(
        '[data-hero-fade]',
        {
          opacity: 0,
          y: 26,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.5',
      )

      // Magnetic CTAs
      if (!window.matchMedia('(pointer: coarse)').matches) {
        gsap.utils.toArray('[data-magnet]').forEach((el) => {
          cleaners.push(attachMagnet(el, gsap, 0.4))
        })
      }
    }, sectionRef)

    return () => {
      cleaners.forEach((fn) => fn())
      ctx.revert()
    }
  }, [reduced])

  return (
    // Extra height provides the scroll distance the video reads through.
    <section
      id="hero"
      ref={sectionRef}
      className={`relative ${reduced ? 'min-h-screen' : 'h-[240vh]'}`}
    >
      <div
        ref={pinRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Scroll-scrubbed video (no autoplay/loop) */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/products/poster.webp"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic dark + warm gold grade for contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 15%, rgba(201,169,106,0.10) 0%, transparent 45%), linear-gradient(180deg, rgba(10,9,8,.74) 0%, rgba(10,9,8,.42) 40%, rgba(10,9,8,.94) 100%)',
          }}
        />
        {/* subtle vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: 'inset 0 0 220px 60px rgba(10,9,8,0.9)' }}
        />

        {/* Content */}
        <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span data-hero-fade className="eyebrow mb-6 justify-center">
            أدوات صحية فاخرة
          </span>

          <div
            ref={markRef}
            dir="ltr"
            className="font-display mb-3 text-sm font-semibold tracking-[0.5em] text-gold-2"
            aria-hidden="true"
          >
            DIVRA
          </div>

          <h1
            ref={titleRef}
            className="font-cairo text-4xl font-black leading-[1.15] sm:text-6xl md:text-7xl"
          >
            فنّ الماء بلمسة ديفرا
          </h1>

          <p
            data-hero-fade
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-text-dim sm:text-lg"
          >
            صنابير ومخلاطات منحوتة بدقّة تجمع بين الجمال والأداء، لتمنح مطبخك
            وحمّامك حضوراً استثنائياً يليق بذوقك الرفيع.
          </p>

          <div
            data-hero-fade
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#products" className="btn btn-primary" data-magnet>
              استكشف المجموعة
            </a>
            <a href="#about" className="btn btn-ghost" data-magnet>
              تعرّف على ديفرا
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#about"
          className="absolute inset-inline-0 bottom-8 z-10 mx-auto flex w-full flex-col items-center gap-2 text-text-dimmer"
          style={{ insetInline: 0 }}
          aria-label="مرّر للأسفل"
          data-hero-fade
        >
          <span className="text-xs tracking-widest">مرّر لتحريك المشهد</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gold/40 p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-gold-2" />
          </span>
        </a>
      </div>
    </section>
  )
}
