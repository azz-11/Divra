const LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'من نحن', href: '#about' },
  { label: 'المنتجات', href: '#products' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img src="/logo.png" alt="ديفرا Divra" className="h-9 w-auto" />
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-dim transition-colors hover:text-text"
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
