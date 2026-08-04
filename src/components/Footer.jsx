const LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'البيان', href: '#manifesto' },
  { label: 'المجموعة', href: '#showcase' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2 py-14">
      {/* oversized ghost wordmark */}
      <div
        className="font-display pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center text-[26vw] font-bold leading-none text-outline opacity-40"
        aria-hidden="true"
      >
        DIVRA
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <a href="#hero" className="flex items-center gap-3" aria-label="ديفرا">
          <span className="font-display text-xl font-bold tracking-[0.28em] text-text">
            DIVRA
          </span>
          <span className="h-4 w-px bg-line-strong" />
          <span className="font-cairo text-sm text-sky">ديفرا</span>
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-dim transition-colors hover:text-sky"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-text-dimmer">
          © {new Date().getFullYear()} ديفرا Divra. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  )
}
