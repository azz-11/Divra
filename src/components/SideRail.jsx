import { useEffect, useState } from 'react'

// Fixed vertical section rail (desktop). Dots track the active section via
// IntersectionObserver and deep-link on click. Hidden on small screens.
export default function SideRail({ sections }) {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [sections])

  return (
    <nav className="rail hidden lg:flex" aria-label="أقسام الصفحة">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`rail-item ${active === s.id ? 'active' : ''}`}
          aria-current={active === s.id ? 'true' : undefined}
        >
          <span className="rail-dot" />
          <span className="rail-label">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
