const WORDS = [
  'تصميم نحتي',
  'نحاس مصقول',
  'ضمان 5 سنوات',
  'DIVRA',
  'أسود مطفي',
  'حِرَفية عالية',
  'ديفرا',
]

// Thin luxury band that scrolls the brand vocabulary between hero and about.
export default function Marquee() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      <div className="marquee-track">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="flex shrink-0">
            {WORDS.map((w, j) => (
              <span key={j} className="flex items-center">
                <span className="mx-7 font-cairo text-lg font-bold tracking-wide text-text-dim sm:text-xl">
                  {w}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  )
}
